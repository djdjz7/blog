# 利用自定义Feistel密码漏洞获取easy flag

##### User:

```python
from secrets import token_bytes
from hashlib import sha1
import base64

# THE FATE OF YOUR GRADE HANGS IN THE BALANCE...
# PROFESSOR'S CHALLENGE ECHOES IN YOUR MIND: "BREAK THIS CIPHER, GET 4.0!"


def pad(data_to_pad, block_size):
    # PADDING: BECAUSE EVEN REBELS NEED TO FOLLOW SOME RULES
    padding_len = block_size - len(data_to_pad) % block_size
    padding = bytes([padding_len] * padding_len)
    return data_to_pad + padding


def crypt(data: bytes, key: bytes, mode: str, rounds: int):
    # THE REBEL'S MASTERPIECE: DES CORE MUTILATED WITH SHA1 HEART TRANSPLANT
    # BLOCK SIZE: 4 BYTES (BECAUSE WHO NEEDS STANDARDS ANYWAY?)
    # KEY SIZE: 6 BYTES, 48 BITS (COMPROMISE IS THE NAME OF THE GAME)

    assert len(key) == 6  # THE CHAINS OF CONVENTION
    assert len(data) % 4 == 0  # CONFORMITY IN REBELLION
    assert mode == "e" or mode == "d"  # ENCRYPT OR DECRYPT? THE ETERNAL QUESTION

    res = bytearray()
    keys = [
        key[0:3],  # HALF A KEY FOR TWICE THE FUN
        key[3:6],  # THE OTHER HALF OF THIS DISASTER
    ]

    for i in range(0, len(data), 4):
        part = data[i : i + 4]
        L = part[0:2]  # LEFT HALF: INNOCENT BYSTANDER
        R = part[2:4]  # RIGHT HALF: ABOUT TO GET SHA1-MASHED

        for r in range(rounds):
            if mode == "e":
                round_key = keys[r % 2]  # KEY SCHEDULE: TOO SIMPLE TO FAIL?
            else:
                round_key = keys[
                    (r + 1) % 2
                ]  # DECRYPTION: WALKING BACKWARDS THROUGH CHAOS

            # THE MOMENT OF TRUTH: SHA1 AS FEISTEL FUNCTION
            # THIS IS WHERE THE REBEL'S DREAM MEETS CRYPTOGRAPHIC REALITY
            temp = sha1(R + round_key).digest()  # HASHING OUR WAY TO GLORY (OR RUIN)

            # THE FEISTEL DANCE: SWAP AND MUTATE
            L, R = R, bytes(
                [a ^ b for a, b, in zip(L, temp)]
            )  # XOR: THE BUTTERFLY EFFECT

        enc = R + L  # FINAL SWAP: THE GRAND ILLUSION
        res += enc  # COLLECTING THE PIECES OF OUR BROKEN DREAMS

    return bytes(res)  # BEHOLD: THE MONSTROSITY IN ALL ITS GLORY


def encrypt(data: bytes, key: bytes):
    # ENTER THE DRAGON: 32 ROUNDS OF PSEUDO-SECURITY
    return crypt(data, key, "e", 32)


def decrypt(data: bytes, key: bytes):
    # REVERSE THE CURSE: CAN WE UNDO THIS MADNESS?
    return crypt(data, key, "d", 32)


# THE ARENA: WHERE GRADES ARE WON AND DREAMS DIE
mode = input("easy or hard?")  # CHOOSE YOUR FATE, BRAVE SOUL

if mode == "easy":
    # EASY MODE: THE PROFESSOR'S WARM-UP LAUGH
    key = token_bytes(6)  # RANDOM KEY: THE DICE OF DESTINY
    flag_easy = open("/flag_easy", encoding="utf-8").read().strip()
    plain = pad(base64.b16encode(flag_easy.encode()), 4)
    enc_flag = encrypt(plain, key)  # THE FIRST VICTIM OF OUR CRYPTO-EXPERIMENT
    assert (
        decrypt(enc_flag, key) == plain
    )  # SANITY CHECK: EVEN MAD SCIENTISTS HAVE STANDARDS
    print(enc_flag.hex())  # THE CHALLENGE: CRACK THIS AND CLAIM YOUR REWARD

    # THE TRAINING GROUNDS: PRACTICE MAKES PERFECT (OR BREAKS SPIRITS)
    # HINT: YOU CAN SEND DATA IN BATCH TO SPEED UP IO
    while True:
        plain = bytes.fromhex(input())
        print(encrypt(plain, key).hex())  # THE ORACLE SPEAKS: ENCRYPTION ON DEMAND

elif mode == "hard":
    # HARD MODE: THE PROFESSOR'S FINAL LAUGH
    key = token_bytes(6)  # ANOTHER RANDOM KEY: DOUBLE THE TROUBLE
    flag_hard = open("/flag_hard", encoding="utf-8").read().strip()
    flag_hard_padded = pad(flag_hard.encode(), 4)
    xor_key = token_bytes(len(flag_hard_padded))  # EXTRA LAYER OF CONFUSION
    scrambled = bytes(
        [a ^ b for a, b in zip(flag_hard_padded, xor_key)]
    )  # MIXING THE POT

    # DOUBLE ENCRYPTION: BECAUSE ONE LAYER OF INSANITY WASN'T ENOUGH
    enc_scrambled = encrypt(scrambled, key)  # THE MAZE
    enc_xor_key = encrypt(xor_key, key)  # THE KEY TO THE MAZE (ENCRYPTED, OF COURSE)
    print(enc_scrambled.hex())  # THE FIRST CLUE IN THIS TREASURE HUNT
    print(enc_xor_key.hex())  # THE SECOND CLUE: NOW PUT THEM TOGETHER

    # THE GAUNTLET: 100,000 CHANCES TO PROVE YOUR WORTH
    # HINT: YOU CAN SEND MULTIPLE LINES BEFORE WAITING FOR RESPONSE TO SPEED UP IO
    for i in range(100000):
        plain = bytes.fromhex(input())
        print(encrypt(plain[:4], key).hex())  # THE ORACLE WHISPERS: ONE BLOCK AT A TIME

# THE CLOCK IS TICKING... CAN YOU BREAK THE REBEL'S CIPHER BEFORE YOUR GRADE SHATTERS?
# THE PROFESSOR WATCHES, AMUSED. THE BALL IS IN YOUR COURT.
```

阅读代码，找出漏洞，获取easy flag，使用pwntools连接prob12.geekgame.pku.edu.cn 10012，这将需要一定量的交互，建议批量发送批量接收提高速度。获取easy flag不需要解出key

##### Assistant:

让我分析这个自定义加密算法的漏洞。

## 代码分析

这是一个修改版的Feistel网络加密：

- 块大小：4字节
- 密钥：6字节（分成两个3字节的子密钥）
- 轮数：32轮
- Feistel函数：SHA1(R + round_key)

关键漏洞：

1. **块大小只有4字节（32位）**，非常小
2. **只有2个轮密钥交替使用**
3. **Feistel结构的特性**：可以利用chosen plaintext attack

## 漏洞利用思路

对于Feistel网络，如果我们能控制输入，可以通过以下方式攻击：

1. 每个4字节块独立加密
2. 可以构造特殊的明文来探测密钥
3. **关键发现**：由于块很小（4字节），我们可以暴力枚举所有可能的明文块（2^32种），建立明文-密文映射表

让我编写攻击脚本：

```python
from pwn import *
from hashlib import sha1
import base64

def pad(data_to_pad, block_size):
    padding_len = block_size - len(data_to_pad) % block_size
    padding = bytes([padding_len] * padding_len)
    return data_to_pad + padding

# 连接到服务器
conn = remote('prob12.geekgame.pku.edu.cn', 10012)

# 选择easy模式
conn.sendlineafter(b'easy or hard?', b'easy')

# 获取加密的flag
enc_flag_hex = conn.recvline().strip().decode()
enc_flag = bytes.fromhex(enc_flag_hex)
print(f"Encrypted flag length: {len(enc_flag)} bytes")
print(f"Encrypted flag: {enc_flag_hex}")

# 策略：构建一个查找表
# 由于块大小只有4字节，我们可以尝试一些常见的明文模式

# Easy flag是base64.b16encode(flag.encode())后padding的结果
# b16encode会把每个字节变成2个hex字符
# 例如 'g' (0x67) -> '67' (0x36 0x37)
# flag格式通常是 flag{...}

# 让我们先尝试暴力破解每个块
# 构建一个字典：对于可能的明文块，查询其密文

print("\n[*] Building lookup table for common plaintexts...")

# flag{开头，经过b16encode后是 '666C61677B...'
# 我们需要找到这些字符对应的加密块

# 先测试一些已知的明文模式
test_plaintexts = []

# 生成所有可能的4字节hex编码组合（对应2字节原始数据）
# flag格式: flag{...}
# b16encode: 66 6C 61 67 7B ... 7D
# 可打印ASCII的hex编码都是 30-39, 41-46 (0-9, A-F)

common_bytes = b'0123456789ABCDEFflag{}_!@#$%^&*()[]'
common_hex_chars = []
for c in common_bytes:
    common_hex_chars.append(c)

# 构建可能的4字节明文（hex编码后的2个字符）
print("[*] Generating candidate plaintexts...")
candidates = set()

# flag的hex编码
flag_prefix = b'666C61677B'  # "flag{"的hex编码
for i in range(0, len(flag_prefix), 2):
    candidates.add(flag_prefix[i:i+4])

# 添加更多可能的字符组合
hex_chars = b'0123456789ABCDEF'
for a in hex_chars:
    for b in hex_chars:
        for c in hex_chars:
            for d in hex_chars:
                candidates.add(bytes([a, b, c, d]))

print(f"[*] Total candidates: {len(candidates)}")

# 批量查询以提高速度
batch_size = 1000
candidates_list = list(candidates)
lookup_table = {}

print("[*] Querying encryption oracle...")
for i in range(0, len(candidates_list), batch_size):
    batch = candidates_list[i:i+batch_size]
    # 发送批量查询
    for pt in batch:
        conn.sendline(pt.hex().encode())

    # 接收批量响应
    for pt in batch:
        ct_hex = conn.recvline().strip().decode()
        ct = bytes.fromhex(ct_hex)
        lookup_table[ct] = pt

    if (i // batch_size) % 10 == 0:
        print(f"  Progress: {i}/{len(candidates_list)}")

print(f"[*] Lookup table built with {len(lookup_table)} entries")

# 解密flag
print("\n[*] Decrypting flag...")
decrypted = b''
for i in range(0, len(enc_flag), 4):
    block = enc_flag[i:i+4]
    if block in lookup_table:
        decrypted += lookup_table[block]
        print(f"  Block {i//4}: {block.hex()} -> {lookup_table[block]}")
    else:
        print(f"  Block {i//4}: {block.hex()} -> NOT FOUND")
        decrypted += b'????'

print(f"\n[*] Decrypted (hex encoded): {decrypted}")

# 解码hex
try:
    flag_hex = decrypted.decode()
    flag_bytes = bytes.fromhex(flag_hex)
    # 去除padding
    padding_len = flag_bytes[-1]
    flag = flag_bytes[:-padding_len].decode()
    print(f"\n[+] FLAG: {flag}")
except Exception as e:
    print(f"[-] Error decoding: {e}")
    print(f"    Raw decrypted: {decrypted}")

conn.close()
```

这个脚本的工作原理：

1. **利用小块大小**：4字节块意味着只有2^32种可能，但实际上flag经过b16encode后只包含hex字符(0-9, A-F)
2. **构建查找表**：预先生成所有可能的hex编码字符组合，批量查询加密oracle
3. **反向查找**：用加密的flag块在查找表中查找对应的明文

让我运行这个脚本来获取flag！

##### User:

Traceback (most recent call last):
File "d:\web-ezmcp\slide.py", line 87, in \<module\>
ct = bytes.fromhex(ct_hex)
^^^^^^^^^^^^^^^^^^^^^
ValueError: non-hexadecimal number found in fromhex() arg at position 0
貌似因为向远程发送了non-hexadecimal

##### Assistant:

你说得对，我需要确保发送的都是有效的十六进制字符串。让我修复这个问题：

```python
from pwn import *
from hashlib import sha1
import base64

def pad(data_to_pad, block_size):
    padding_len = block_size - len(data_to_pad) % block_size
    padding = bytes([padding_len] * padding_len)
    return data_to_pad + padding

# 连接到服务器
conn = remote('prob12.geekgame.pku.edu.cn', 10012)

# 选择easy模式
conn.sendlineafter(b'easy or hard?', b'easy')

# 获取加密的flag
enc_flag_hex = conn.recvline().strip().decode()
enc_flag = bytes.fromhex(enc_flag_hex)
print(f"Encrypted flag length: {len(enc_flag)} bytes")
print(f"Encrypted flag: {enc_flag_hex}")

# 策略：构建一个查找表
# flag经过b16encode后只包含hex字符(30-39, 41-46)
# 即 '0'-'9', 'A'-'F'

print("\n[*] Building lookup table for hex-encoded plaintexts...")

# 生成所有可能的4字节hex编码组合
hex_chars = '0123456789ABCDEF'
candidates = []

for a in hex_chars:
    for b in hex_chars:
        for c in hex_chars:
            for d in hex_chars:
                # 这是4个ASCII字符，每个都是hex字符
                plaintext = (a + b + c + d).encode()
                candidates.append(plaintext)

print(f"[*] Total candidates: {len(candidates)} (should be 65536)")

# 批量查询以提高速度
batch_size = 1000
lookup_table = {}

print("[*] Querying encryption oracle...")
for i in range(0, len(candidates), batch_size):
    batch = candidates[i:i+batch_size]

    # 发送批量查询
    for pt in batch:
        # pt已经是4字节的ASCII，需要转换为hex发送
        conn.sendline(pt.hex().encode())

    # 接收批量响应
    for pt in batch:
        try:
            ct_line = conn.recvline().strip()
            ct_hex = ct_line.decode()
            ct = bytes.fromhex(ct_hex)
            lookup_table[ct] = pt
        except Exception as e:
            print(f"[-] Error at candidate {pt}: {e}")
            print(f"    Received: {ct_line}")
            continue

    if (i // batch_size) % 10 == 0:
        print(f"  Progress: {i}/{len(candidates)}")

print(f"[*] Lookup table built with {len(lookup_table)} entries")

# 解密flag
print("\n[*] Decrypting flag...")
decrypted = b''
for i in range(0, len(enc_flag), 4):
    block = enc_flag[i:i+4]
    if block in lookup_table:
        decrypted += lookup_table[block]
        print(f"  Block {i//4}: {block.hex()} -> {lookup_table[block]}")
    else:
        print(f"  Block {i//4}: {block.hex()} -> NOT FOUND")
        decrypted += b'????'

print(f"\n[*] Decrypted (hex encoded): {decrypted}")

# 解码hex
try:
    flag_hex = decrypted.decode()
    print(f"[*] Hex string: {flag_hex}")
    flag_bytes = bytes.fromhex(flag_hex)
    print(f"[*] Raw bytes: {flag_bytes}")
    # 去除padding
    padding_len = flag_bytes[-1]
    if padding_len <= 4 and padding_len > 0:
        flag = flag_bytes[:-padding_len].decode()
    else:
        flag = flag_bytes.decode()
    print(f"\n[+] FLAG: {flag}")
except Exception as e:
    print(f"[-] Error decoding: {e}")
    print(f"    Raw decrypted: {decrypted}")

conn.close()
```

主要修复：

1. **明确候选明文**：生成的是4个hex字符（'0'-'9', 'A'-'F'）组成的字符串
2. **正确的hex转换**：`pt.hex()`将4字节ASCII转换为8字节hex字符串发送
3. **更好的错误处理**：捕获并显示错误信息

不过，这个方法可能还是太慢。让我优化一下，使用更聪明的方法：

```python
from pwn import *

# 连接到服务器
conn = remote('prob12.geekgame.pku.edu.cn', 10012)

# 选择easy模式
conn.sendlineafter(b'easy or hard?', b'easy')

# 获取加密的flag
enc_flag_hex = conn.recvline().strip().decode()
enc_flag = bytes.fromhex(enc_flag_hex)
print(f"[*] Encrypted flag: {enc_flag_hex}")
print(f"[*] Length: {len(enc_flag)} bytes = {len(enc_flag)//4} blocks")

# 更快的方法：只查询我们需要的块
# 先发送大量查询，然后接收
print("\n[*] Generating all possible 4-byte hex-char plaintexts...")

hex_chars = '0123456789ABCDEF'
all_plaintexts = []

for a in hex_chars:
    for b in hex_chars:
        for c in hex_chars:
            for d in hex_chars:
                pt_str = a + b + c + d
                pt_bytes = pt_str.encode()  # 4 bytes ASCII
                all_plaintexts.append(pt_bytes)

print(f"[*] Generated {len(all_plaintexts)} plaintexts")

# 批量发送所有查询
print("[*] Sending all queries...")
for pt in all_plaintexts:
    conn.sendline(pt.hex().encode())

print("[*] Receiving all responses...")
lookup_table = {}
for i, pt in enumerate(all_plaintexts):
    ct_hex = conn.recvline().strip().decode()
    ct = bytes.fromhex(ct_hex)
    lookup_table[ct] = pt

    if i % 10000 == 0:
        print(f"  Progress: {i}/{len(all_plaintexts)}")

print(f"[*] Lookup table complete: {len(lookup_table)} entries")

# 解密flag
print("\n[*] Decrypting flag...")
decrypted = b''
for i in range(0, len(enc_flag), 4):
    block = enc_flag[i:i+4]
    if block in lookup_table:
        pt = lookup_table[block]
        decrypted += pt
        print(f"  Block {i//4}: {pt.decode()}")
    else:
        print(f"  Block {i//4}: NOT FOUND")
        decrypted += b'????'

print(f"\n[*] Decrypted hex string: {decrypted.decode()}")

# 从hex解码
try:
    flag_bytes = bytes.fromhex(decrypted.decode())
    # 去除padding
    padding_len = flag_bytes[-1]
    if 1 <= padding_len <= 4:
        flag = flag_bytes[:-padding_len].decode()
    else:
        flag = flag_bytes.decode()
    print(f"\n[+] FLAG: {flag}")
except Exception as e:
    print(f"[-] Error: {e}")

conn.close()
```

这个版本一次性发送所有65536个查询，然后批量接收，应该会快很多。
