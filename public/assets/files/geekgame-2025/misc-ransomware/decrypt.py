#!/usr/bin/env python3

import os

def recover_keystream(original_file, encrypted_file):
    """Recover keystream from known plaintext-ciphertext pair"""
    with open(original_file, 'rb') as f:
        plaintext = f.read()

    with open(encrypted_file, 'rb') as f:
        ciphertext = f.read()

    # For stream cipher: ciphertext = plaintext XOR keystream
    # Therefore: keystream = plaintext XOR ciphertext
    keystream = bytes([p ^ c for p, c in zip(plaintext, ciphertext)])

    return keystream, len(ciphertext) - len(plaintext)

def decrypt_file(encrypted_file, keystream, header_size, output_file):
    """Decrypt a file using recovered keystream"""
    with open(encrypted_file, 'rb') as f:
        ciphertext = f.read()

    # Remove padding at the end (zeros)
    ciphertext = ciphertext.rstrip(b'\x00')

    # Decrypt using keystream
    plaintext_size = len(ciphertext) - header_size
    plaintext = bytes([c ^ keystream[i % len(keystream)] for i, c in enumerate(ciphertext)])

    # Remove the header
    plaintext = plaintext[:plaintext_size]

    with open(output_file, 'wb') as f:
        f.write(plaintext)

    return plaintext

# Recover keystream from known plaintext
print("[*] Recovering keystream from algo-gzip.py...")
keystream, header_size = recover_keystream(
    'geekgame-4th/official_writeup/algo-gzip/attachment/algo-gzip.py',
    'geekgame-4th/official_writeup/algo-gzip/attachment/algo-gzip.f58A66B51.py'
)

print(f"[+] Keystream length: {len(keystream)} bytes")
print(f"[+] Header size: {header_size} bytes")
print(f"[+] First 50 bytes of keystream (hex): {keystream[:50].hex()}")

# Find all encrypted files
import glob
encrypted_files = glob.glob('**/*.f58A66B51.*', recursive=True)
print(f"\n[*] Found {len(encrypted_files)} encrypted files")

# Decrypt all files
for enc_file in encrypted_files:
    if 'algo-gzip.f58A66B51.py' in enc_file:
        continue  # Skip the known plaintext file

    output_file = enc_file.replace('.f58A66B51.', '.decrypted.')
    print(f"\n[*] Decrypting {enc_file} -> {output_file}")

    try:
        plaintext = decrypt_file(enc_file, keystream, header_size, output_file)
        print(f"[+] Decrypted {len(plaintext)} bytes")

        # Try to display if it's text
        try:
            text = plaintext.decode('utf-8', errors='ignore')
            if 'flag{' in text or 'flag1-2-3' in enc_file:
                print(f"[+] Content preview:\n{text[:500]}")
        except:
            pass
    except Exception as e:
        print(f"[-] Error: {e}")

print("\n[*] Decryption complete!")
