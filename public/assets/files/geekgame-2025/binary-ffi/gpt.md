# 反混淆并分析flag校验程序

##### User:

分析这些代码在做什么，如果可以，写出反混淆的代码

```c
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  size_t v3; // rax
  unsigned __int64 v4; // rax
  unsigned int v5; // ebx
  const char *v6; // rdi

  puts("Enter your flag:");
  fflush(stdout);
  if ( fgets(byte_4060, 256, stdin) )
  {
    v3 = strlen(byte_4060);
    if ( v3 && byte_4060[v3 - 1] == 10 )
      byte_4060[v3 - 1] = 0;
    __rdtsc();
    v4 = __rdtsc();
    v5 = sub_1D80(byte_4060, 256LL, HIDWORD(v4), 1LL);
    v6 = "Correct!";
    if ( !(sub_17E0() | v5) )
      v6 = "Incorrect!";
    puts(v6);
  }
  return 0LL;
}

void *sub_1380()
{
  return &unk_4008;
}

__int64 sub_13B0()
{
  return 0LL;
}

void *sub_13F0()
{
  void *result; // rax

  if ( !byte_4020 )
  {
    if ( &__cxa_finalize )
      _cxa_finalize(off_4000);
    result = sub_1380();
    byte_4020 = 1;
  }
  return result;
}

// attributes: thunk
__int64 sub_1430()
{
  return sub_13B0();
}

_BOOL8 __fastcall sub_1440()
{
  __int64 v0; // rbp
  FILE *v1; // rax
  FILE *v2; // r12
  char v3; // al
  const char *v4; // rdi
  _BOOL4 v5; // r13d
  __int64 v7; // [rsp+0h] [rbp-140h] BYREF
  __int16 v8; // [rsp+8h] [rbp-138h]
  char v9; // [rsp+Ah] [rbp-136h] BYREF
  unsigned __int64 v10; // [rsp+110h] [rbp-30h]

  v10 = __readfsqword(0x28u);
  v1 = fopen("/proc/self/status", "r");
  if ( v1 )
  {
    v2 = v1;
    v7 = v0;
    do
    {
      if ( !fgets((char *)&v7, 256, v2) )
      {
        v5 = 0;
        goto LABEL_12;
      }
    }
    while ( (_BYTE)v7 != 84 || v7 != 0x6950726563617254LL || v8 != 14948 );
    v3 = v9;
    v4 = &v9;
    if ( v9 != 32 )
      goto LABEL_9;
    do
    {
      do
        v3 = *++v4;
      while ( v3 == 32 );
LABEL_9:
      ;
    }
    while ( v3 == 9 );
    v5 = strtol(v4, 0LL, 10) != 0;
LABEL_12:
    fclose(v2);
  }
  else
  {
    return 0;
  }
  return v5;
}

int sub_16B0()
{
  int result; // eax
  char *v1; // rdx

  __rdtsc();
  result = mprotect(
             (void *)((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL),
             (size_t)&loc_1550 - ((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
             7);
  if ( !result )
  {
    v1 = (char *)&loc_1550;
    do
    {
      *v1 ^= 66 - (unsigned __int8)&loc_1550 + (_BYTE)v1;
      ++v1;
    }
    while ( v1 != (char *)&loc_1550 + 339 );
    __rdtsc();
    mprotect(
      (void *)((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL),
      (size_t)&loc_1550 - ((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
      5);
    JUMPOUT(0x1550LL);
  }
  return result;
}

// positive sp value has been detected, the output may be wrong!
_BOOL8 sub_17E0()
{
  size_t v0; // rbx
  _BOOL8 result; // rax
  int v2; // r9d
  unsigned __int64 v3; // r8
  unsigned __int8 v4; // dl
  unsigned __int64 v5; // rcx
  int v6; // r10d
  __int64 v7; // rax
  int v8; // edx
  int v9; // r8d
  int v10; // ebx
  __int64 v11; // r11
  __int64 v12; // r9
  _BYTE *v13; // r11
  _BYTE *v14; // rax
  char v15; // r12
  unsigned __int8 v16; // r9
  int v17; // r11d
  char v18; // r12
  char *v19; // r13
  char v20; // cl
  char *v21; // r10
  unsigned __int8 v22; // cl
  __int64 v23; // r13
  __int64 v24; // r10
  int v25; // eax
  unsigned __int64 v26; // rax
  __int64 v27; // rax
  __int64 v28; // rdx
  unsigned __int64 v29; // rax
  int v30; // eax
  int v31; // edx
  int v32; // ebx
  __int64 v33; // rax
  unsigned int v34; // r11d
  int v35; // r12d
  _BYTE *v36; // r9
  __int64 i; // rax
  __int64 v38; // r8
  int v39; // r10d
  int v40; // r13d
  _BYTE *v41; // rax
  _BYTE *v42; // [rsp-880h] [rbp-48B0h]
  unsigned __int8 *v43; // [rsp-878h] [rbp-48A8h]
  unsigned __int64 v44; // [rsp-870h] [rbp-48A0h]
  char v45; // [rsp-865h] [rbp-4895h]
  int v46; // [rsp-864h] [rbp-4894h]
  _DWORD v47[530]; // [rsp-858h] [rbp-4888h] BYREF
  _BYTE v48[16]; // [rsp-10h] [rbp-4040h] BYREF
  __int64 v49; // [rsp+8h] [rbp-4028h] BYREF
  _BYTE v50[11]; // [rsp+1EFh] [rbp-3E41h] BYREF
  _BYTE v51[39]; // [rsp+5F0h] [rbp-3A40h] BYREF
  __int64 v52; // [rsp+9E8h] [rbp-3648h] BYREF
  _QWORD v53[1541]; // [rsp+1008h] [rbp-3028h] BYREF

  while ( &v49 != &v53[-2048] )
    ;
  v53[1534] = __readfsqword(0x28u);
  v0 = strlen(byte_4060);
  result = 0LL;
  if ( v0 == 39 )
  {
    memset(v48, 0, 0x4000uLL);
    qmemcpy(v50, "\nsneaky_key", sizeof(v50));
    qmemcpy(v51, byte_4060, sizeof(v51));
    memset(&v47[2], 0, 0x838uLL);
    __rdtsc();
    v2 = 0;
    v3 = 0LL;
    while ( 1 )
    {
      v4 = *((_BYTE *)&unk_2100 + v3);
      v5 = v3 + 1;
      if ( v4 > 0x21u )
      {
        if ( v4 == 64 )
        {
          v32 = v2 - 3;
          v33 = (unsigned int)v47[v2 + 5];
          if ( (unsigned int)(v33 + 256) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v34 = v47[v2 + 7];
          v35 = v47[v2 + 6];
          if ( v34 + v35 > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v36 = &v48[v33];
          for ( i = 0LL; i != 256; ++i )
            v36[i] = i;
          v38 = 0LL;
          v39 = 0;
          do
          {
            v40 = (unsigned __int8)v36[v38];
            v39 += v40 + *((unsigned __int8 *)&v47[528] + (unsigned int)v38 % v34 + v35);
            v41 = &v36[(unsigned __int8)v39];
            v36[v38++] = *v41;
            *v41 = v40;
          }
          while ( v38 != 256 );
          v3 = v5;
          v2 = v32;
        }
        else
        {
          if ( v4 != 65 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v6 = v2 - 6;
          v7 = (unsigned int)v47[v2 + 4];
          if ( (unsigned int)(v7 + 256) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v8 = v47[v2 + 7];
          v9 = v47[v2 + 5];
          if ( (unsigned int)(v8 + v9) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v10 = v47[v2 + 6];
          if ( (unsigned int)(v8 + v10) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v11 = (unsigned int)v47[v2 + 3];
          if ( (unsigned int)(v11 + 1) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v12 = (unsigned int)v47[v6 + 8];
          if ( (unsigned int)(v12 + 1) > 0x4000 )
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
          v13 = &v48[v11];
          v44 = v5;
          v14 = &v48[v7];
          v15 = *v13;
          v42 = v13;
          v43 = &v48[v12];
          v16 = v48[v12];
          v17 = 0;
          v45 = v15;
          v18 = v15 + 1;
          v46 = v6;
          while ( v8 != v17 )
          {
            v19 = &v14[(unsigned __int8)(v18 + v17)];
            v20 = *v19;
            v16 += *v19;
            v21 = &v14[v16];
            *v19 = *v21;
            *v21 = v20;
            v22 = *v19 + v20;
            v23 = (unsigned int)(v9 + v17);
            v24 = (unsigned int)(v10 + v17++);
            *((_BYTE *)&v47[528] + v24) = *((_BYTE *)&v47[528] + v23) ^ v14[v22];
          }
          *v42 = v8 + v45;
          *v43 = v16;
          v3 = v44;
          v2 = v46;
        }
      }
      else
      {
        if ( !v4 )
          return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
        switch ( v4 )
        {
          case 1u:
            v3 += 2LL;
            v47[v2++ + 8] = *((unsigned __int8 *)&unk_2100 + v5);
            break;
          case 3u:
            v30 = *((unsigned __int8 *)&unk_2100 + v5) | (*((unsigned __int8 *)&unk_2100 + v3 + 3) << 16) | (byte_2102[v3] << 8);
            v31 = byte_2104[v3];
            v3 += 5LL;
            v47[v2++ + 8] = (v31 << 24) | v30;
            break;
          case 4u:
            --v2;
            ++v3;
            break;
          case 5u:
            v47[v2 + 8] = v47[v2 + 7];
            ++v3;
            ++v2;
            break;
          case 0x20u:
            v27 = v2 - 1;
            v28 = v27 + 8;
            v29 = (unsigned int)v47[v27 + 8];
            if ( v29 > 0x3FFF )
              return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
            v47[v28] = *((unsigned __int8 *)&v47[528] + v29);
            ++v3;
            break;
          case 0x21u:
            v25 = v2 - 1;
            v2 -= 2;
            v26 = (unsigned int)v47[v25 + 8];
            if ( v26 > 0x3FFF )
              return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
            *((_BYTE *)&v47[528] + v26) = v47[v2 + 8];
            ++v3;
            break;
          default:
            return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
        }
      }
      if ( v3 > 0x40 )
        return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
    }
  }
  return result;
}

__int64 __fastcall sub_1CA0(const char *a1, __int64 a2)
{
  size_t v4; // r13
  size_t v5; // r8
  __int64 result; // rax
  __int64 v7; // rdi
  unsigned __int64 v8; // rsi
  unsigned __int8 v9; // dl

  v4 = strlen(a1);
  v5 = strlen(byte_4030);
  __rdtsc();
  result = 0LL;
  if ( v4 )
  {
    v7 = 2LL;
    v8 = 0LL;
    while ( 1 )
    {
      v9 = __ROL1__(a1[v8] ^ byte_4030[v8 % v5], (v8 & 3) + 1);
      result = (unsigned __int8)a0123456789abcd[v9 & 0xF];
      *(_BYTE *)(a2 + 2 * v8) = a0123456789abcd[v9 >> 4];
      *(_BYTE *)(a2 + v7 - 1) = result;
      if ( v4 == ++v8 )
        break;
      v7 += 2LL;
      if ( v8 == 511 )
      {
        v7 = 1022LL;
        break;
      }
    }
  }
  else
  {
    v7 = 0LL;
  }
  *(_BYTE *)(a2 + v7) = 0;
  return result;
}

_BOOL8 sub_1D80()
{
  size_t v0; // rdi
  char v1; // cl
  unsigned __int64 i; // rsi
  _BYTE v4[120]; // [rsp+0h] [rbp-8B8h] BYREF
  char s1[1024]; // [rsp+78h] [rbp-840h] BYREF
  char s2[1032]; // [rsp+478h] [rbp-440h] BYREF
  unsigned __int64 v7; // [rsp+888h] [rbp-30h]

  v7 = __readfsqword(0x28u);
  __rdtsc();
  v0 = strlen(byte_4030);
  v1 = -76;
  for ( i = 0LL; ; v1 = byte_21A0[i] )
  {
    v4[i] = __ROL1__(v1 ^ byte_4030[i % v0] ^ 0x3C, (i & 3) + 1) ^ 0xA5;
    if ( ++i == 45 )
      break;
  }
  v4[45] = 0;
  sub_1CA0(v4, s1);
  sub_1CA0(byte_4060, s2);
  return strcmp(s1, s2) == 0;
}

void term_proc()
{
  ;
}__int64 __fastcall main(int a1, char **a2, char **a3)
{
size_t v3; // rax
unsigned __int64 v4; // rax
unsigned int v5; // ebx
const char *v6; // rdi

puts("Enter your flag:");
fflush(stdout);
if ( fgets(byte_4060, 256, stdin) )
{
v3 = strlen(byte_4060);
if ( v3 && byte_4060[v3 - 1] == 10 )
byte_4060[v3 - 1] = 0;
__rdtsc();
v4 = __rdtsc();
v5 = sub_1D80(byte_4060, 256LL, HIDWORD(v4), 1LL);
v6 = "Correct!";
if ( !(sub_17E0() | v5) )
v6 = "Incorrect!";
puts(v6);
}
return 0LL;
}

void *sub_1380()
{
return &unk_4008;
}

__int64 sub_13B0()
{
return 0LL;
}

void *sub_13F0()
{
void *result; // rax

if ( !byte_4020 )
{
if ( &__cxa_finalize )
_cxa_finalize(off_4000);
result = sub_1380();
byte_4020 = 1;
}
return result;
}

// attributes: thunk
__int64 sub_1430()
{
return sub_13B0();
}

_BOOL8 __fastcall sub_1440()
{
__int64 v0; // rbp
FILE *v1; // rax
FILE *v2; // r12
char v3; // al
const char *v4; // rdi
_BOOL4 v5; // r13d
__int64 v7; // [rsp+0h] [rbp-140h] BYREF
__int16 v8; // [rsp+8h] [rbp-138h]
char v9; // [rsp+Ah] [rbp-136h] BYREF
unsigned __int64 v10; // [rsp+110h] [rbp-30h]

v10 = __readfsqword(0x28u);
v1 = fopen("/proc/self/status", "r");
if ( v1 )
{
v2 = v1;
v7 = v0;
do
{
if ( !fgets((char *)&v7, 256, v2) )
{
v5 = 0;
goto LABEL_12;
}
}
while ( (_BYTE)v7 != 84 || v7 != 0x6950726563617254LL || v8 != 14948 );
v3 = v9;
v4 = &v9;
if ( v9 != 32 )
goto LABEL_9;
do
{
do
v3 = *++v4;
while ( v3 == 32 );
LABEL_9:
;
}
while ( v3 == 9 );
v5 = strtol(v4, 0LL, 10) != 0;
LABEL_12:
fclose(v2);
}
else
{
return 0;
}
return v5;
}

int sub_16B0()
{
int result; // eax
char *v1; // rdx

__rdtsc();
result = mprotect(
(void *)((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL),
(size_t)&loc_1550 - ((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
7);
if ( !result )
{
v1 = (char *)&loc_1550;
do
{
*v1 ^= 66 - (unsigned __int8)&loc_1550 + (_BYTE)v1;
++v1;
}
while ( v1 != (char *)&loc_1550 + 339 );
__rdtsc();
mprotect(
(void *)((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL),
(size_t)&loc_1550 - ((unsigned __int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
5);
JUMPOUT(0x1550LL);
}
return result;
}

// positive sp value has been detected, the output may be wrong!
_BOOL8 sub_17E0()
{
size_t v0; // rbx
_BOOL8 result; // rax
int v2; // r9d
unsigned __int64 v3; // r8
unsigned __int8 v4; // dl
unsigned __int64 v5; // rcx
int v6; // r10d
__int64 v7; // rax
int v8; // edx
int v9; // r8d
int v10; // ebx
__int64 v11; // r11
__int64 v12; // r9
_BYTE *v13; // r11
_BYTE *v14; // rax
char v15; // r12
unsigned __int8 v16; // r9
int v17; // r11d
char v18; // r12
char *v19; // r13
char v20; // cl
char *v21; // r10
unsigned __int8 v22; // cl
__int64 v23; // r13
__int64 v24; // r10
int v25; // eax
unsigned __int64 v26; // rax
__int64 v27; // rax
__int64 v28; // rdx
unsigned __int64 v29; // rax
int v30; // eax
int v31; // edx
int v32; // ebx
__int64 v33; // rax
unsigned int v34; // r11d
int v35; // r12d
_BYTE *v36; // r9
__int64 i; // rax
__int64 v38; // r8
int v39; // r10d
int v40; // r13d
_BYTE *v41; // rax
_BYTE *v42; // [rsp-880h] [rbp-48B0h]
unsigned __int8 *v43; // [rsp-878h] [rbp-48A8h]
unsigned __int64 v44; // [rsp-870h] [rbp-48A0h]
char v45; // [rsp-865h] [rbp-4895h]
int v46; // [rsp-864h] [rbp-4894h]
_DWORD v47[530]; // [rsp-858h] [rbp-4888h] BYREF
_BYTE v48[16]; // [rsp-10h] [rbp-4040h] BYREF
__int64 v49; // [rsp+8h] [rbp-4028h] BYREF
_BYTE v50[11]; // [rsp+1EFh] [rbp-3E41h] BYREF
_BYTE v51[39]; // [rsp+5F0h] [rbp-3A40h] BYREF
__int64 v52; // [rsp+9E8h] [rbp-3648h] BYREF
_QWORD v53[1541]; // [rsp+1008h] [rbp-3028h] BYREF

while ( &v49 != &v53[-2048] )
;
v53[1534] = __readfsqword(0x28u);
v0 = strlen(byte_4060);
result = 0LL;
if ( v0 == 39 )
{
memset(v48, 0, 0x4000uLL);
qmemcpy(v50, "\nsneaky_key", sizeof(v50));
qmemcpy(v51, byte_4060, sizeof(v51));
memset(&v47[2], 0, 0x838uLL);
__rdtsc();
v2 = 0;
v3 = 0LL;
while ( 1 )
{
v4 = *((_BYTE *)&unk_2100 + v3);
v5 = v3 + 1;
if ( v4 > 0x21u )
{
if ( v4 == 64 )
{
v32 = v2 - 3;
v33 = (unsigned int)v47[v2 + 5];
if ( (unsigned int)(v33 + 256) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v34 = v47[v2 + 7];
v35 = v47[v2 + 6];
if ( v34 + v35 > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v36 = &v48[v33];
for ( i = 0LL; i != 256; ++i )
v36[i] = i;
v38 = 0LL;
v39 = 0;
do
{
v40 = (unsigned __int8)v36[v38];
v39 += v40 + *((unsigned __int8 *)&v47[528] + (unsigned int)v38 % v34 + v35);
v41 = &v36[(unsigned __int8)v39];
v36[v38++] = *v41;
*v41 = v40;
}
while ( v38 != 256 );
v3 = v5;
v2 = v32;
}
else
{
if ( v4 != 65 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v6 = v2 - 6;
v7 = (unsigned int)v47[v2 + 4];
if ( (unsigned int)(v7 + 256) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v8 = v47[v2 + 7];
v9 = v47[v2 + 5];
if ( (unsigned int)(v8 + v9) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v10 = v47[v2 + 6];
if ( (unsigned int)(v8 + v10) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v11 = (unsigned int)v47[v2 + 3];
if ( (unsigned int)(v11 + 1) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v12 = (unsigned int)v47[v6 + 8];
if ( (unsigned int)(v12 + 1) > 0x4000 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v13 = &v48[v11];
v44 = v5;
v14 = &v48[v7];
v15 = *v13;
v42 = v13;
v43 = &v48[v12];
v16 = v48[v12];
v17 = 0;
v45 = v15;
v18 = v15 + 1;
v46 = v6;
while ( v8 != v17 )
{
v19 = &v14[(unsigned __int8)(v18 + v17)];
v20 = *v19;
v16 += *v19;
v21 = &v14[v16];
*v19 = *v21;
*v21 = v20;
v22 = *v19 + v20;
v23 = (unsigned int)(v9 + v17);
v24 = (unsigned int)(v10 + v17++);
*((_BYTE *)&v47[528] + v24) = *((_BYTE *)&v47[528] + v23) ^ v14[v22];
}
*v42 = v8 + v45;
*v43 = v16;
v3 = v44;
v2 = v46;
}
}
else
{
if ( !v4 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
switch ( v4 )
{
case 1u:
v3 += 2LL;
v47[v2++ + 8] = *((unsigned __int8 *)&unk_2100 + v5);
break;
case 3u:
v30 = *((unsigned __int8 )&unk_2100 + v5) | (((unsigned __int8 *)&unk_2100 + v3 + 3) << 16) | (byte_2102[v3] << 8);
v31 = byte_2104[v3];
v3 += 5LL;
v47[v2++ + 8] = (v31 << 24) | v30;
break;
case 4u:
--v2;
++v3;
break;
case 5u:
v47[v2 + 8] = v47[v2 + 7];
++v3;
++v2;
break;
case 0x20u:
v27 = v2 - 1;
v28 = v27 + 8;
v29 = (unsigned int)v47[v27 + 8];
if ( v29 > 0x3FFF )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
v47[v28] = *((unsigned __int8 *)&v47[528] + v29);
++v3;
break;
case 0x21u:
v25 = v2 - 1;
v2 -= 2;
v26 = (unsigned int)v47[v25 + 8];
if ( v26 > 0x3FFF )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
*((_BYTE *)&v47[528] + v26) = v47[v2 + 8];
++v3;
break;
default:
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
}
}
if ( v3 > 0x40 )
return memcmp(&v52, &unk_2160, 0x27uLL) == 0;
}
}
return result;
}

__int64 __fastcall sub_1CA0(const char *a1, __int64 a2)
{
size_t v4; // r13
size_t v5; // r8
__int64 result; // rax
__int64 v7; // rdi
unsigned __int64 v8; // rsi
unsigned __int8 v9; // dl

v4 = strlen(a1);
v5 = strlen(byte_4030);
__rdtsc();
result = 0LL;
if ( v4 )
{
v7 = 2LL;
v8 = 0LL;
while ( 1 )
{
v9 = ROL1(a1[v8] ^ byte_4030[v8 % v5], (v8 & 3) + 1);
result = (unsigned __int8)a0123456789abcd[v9 & 0xF];
*(_BYTE *)(a2 + 2 * v8) = a0123456789abcd[v9 >> 4];
*(_BYTE *)(a2 + v7 - 1) = result;
if ( v4 == ++v8 )
break;
v7 += 2LL;
if ( v8 == 511 )
{
v7 = 1022LL;
break;
}
}
}
else
{
v7 = 0LL;
}
*(_BYTE *)(a2 + v7) = 0;
return result;
}

_BOOL8 sub_1D80()
{
size_t v0; // rdi
char v1; // cl
unsigned __int64 i; // rsi
_BYTE v4[120]; // [rsp+0h] [rbp-8B8h] BYREF
char s1[1024]; // [rsp+78h] [rbp-840h] BYREF
char s2[1032]; // [rsp+478h] [rbp-440h] BYREF
unsigned __int64 v7; // [rsp+888h] [rbp-30h]

v7 = __readfsqword(0x28u);
__rdtsc();
v0 = strlen(byte_4030);
v1 = -76;
for ( i = 0LL; ; v1 = byte_21A0[i] )
{
v4[i] = ROL1(v1 ^ byte_4030[i % v0] ^ 0x3C, (i & 3) + 1) ^ 0xA5;
if ( ++i == 45 )
break;
}
v4[45] = 0;
sub_1CA0(v4, s1);
sub_1CA0(byte_4060, s2);
return strcmp(s1, s2) == 0;
}

void term_proc()
{
;
}
```

##### Assistant:

下面先做总体分析，然后给出对可重构函数的反混淆/更可读的 C 实现（注意：二进制里有若干常量表（byte_4030、byte_21A0、unk_2100、unk_2160 等），这些常量需要从原始二进制/资源中拷出来并放到源码相应数组中，代码里我用注释提示它们的位置）。

高层行为总结

- main:
  - 提示输入 flag，从 stdin 读一行并去掉换行。
  - 调用两个检查函数：sub_1D80（较短且可逆的校验器）和 sub_17E0（一个复杂的字节码/虚拟机型校验器）。
  - 如果两个检查任意一个返回真，则打印 "Correct!"，否则打印 "Incorrect!"。
- sub_1D80:
  - 生成一个 45 字节的“期望值”序列（通过若干 XOR、旋转和常量混合），把它编码为十六进制字符串（使用自定义的 nibble->字符 表 a0123456789abcd）。同时把输入 flag 也用同样的编码函数编码。
  - 比较两者字符串是否相等，返回比较结果。也就是一个基于密钥表的校验：如果用户输入经相同算法编码后与内置期望编码匹配，就通过。
- sub_1CA0:
  - 将任意字节串编码为“每字节两个字符”的十六进制表示，映射表为 "0123456789abcd"（10->'a' .. 15->'d'）。
  - 在编码前对每个字节做 byte ^ byte_4030[pos%len] 然后左循环移位 1~4 位（(pos&3)+1）。
- sub_1440:
  - 读取 /proc/self/status，找 "TracerPid:" 行，解析数值并返回 (TracerPid != 0)。即典型的反调试/被 ptrace 检测函数。
- sub_17E0:
  - 是一个很长的、像字节码解释器的函数：读入二进制里的某个字节流（unk_2100），用很多栈/寄存器/数组操作执行指令，最终把一个缓冲区 v52 与另一个常量 unk_2160 做 memcmp 判断。它实现复杂且依赖许多二进制内的常量表，因此在没有这些表及完整上下文时无法直接把全部逻辑用几行可读代码完全还原。可以把它视为“第二层、复杂的校验器/虚拟机”，如果需要完整复现必须提取所有相关全局数据并逐条还原指令集语义。

下面给出把上面能清楚还原的函数重写为更可读版本的示例代码（省略/简化了 sub_17E0 的实现 —— 如果需要完整可复现，需要把所有常量表填入并逐条还原解释器逻辑）。

反混淆的示例实现（需填入全局常量表）

```c
#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>

/* 注意：下列数组在原二进制中是常量数据（例如 byte_4030、byte_21A0、unk_2100、unk_2160 等）。
   需要从二进制中提取对应字节并填入这些数组，才能让校验逻辑完全工作。 */
extern const unsigned char byte_4030[]; /* 主密钥表（长度按二进制中真实长度） */
extern const unsigned char byte_21A0[]; /* 用于生成 expected bytes 的表（至少 45 bytes） */

/* 如果需要完整还原 sub_17E0，还需下列等大量表：
   extern const unsigned char unk_2100[];
   extern const unsigned char byte_2102[];
   extern const unsigned char byte_2104[];
   extern const unsigned char unk_2160[];
   等等（名称按 IDA/反编译版本而定）。 */

static inline unsigned char rol(unsigned char v, unsigned int n)
{
    n &= 7;
    return (unsigned char)((v << n) | (v >> (8 - n)));
}

/* 把输入字节串按 sub_1CA0 的逻辑编码为“每字节两个字符”的编码输出到 out（out 必须足够大）。
   返回写入的字符长度（不含末尾 '\0'）。 映射表 a0123456789abcd */
static size_t encode_custom_hex(const unsigned char *in, size_t in_len, char *out, const unsigned char *key, size_t key_len)
{
    const char hexmap[] = "0123456789abcd"; /* 注意原码用的是这个映射 */
    size_t out_pos = 0;
    for (size_t i = 0; i < in_len; ++i) {
        unsigned char x = in[i] ^ key[i % key_len];
        unsigned char r = rol(x, (i & 3) + 1);
        unsigned char hi = (r >> 4) & 0xF;
        unsigned char lo = r & 0xF;
        out[out_pos++] = hexmap[hi];
        out[out_pos++] = hexmap[lo];
        if (out_pos >= 1022) { /* 与原代码中对 511 字节的限制对应 */
            break;
        }
    }
    out[out_pos] = '\0';
    return out_pos;
}

/* sub_1D80 的可读实现：
   - 生成 expected[45]（按照反编译逻辑）
   - encode expected 和 encode user flag
   - strcmp 两个编码 */
bool check_flag_via_simple_transform(const char *user_flag)
{
    const size_t EXPECTED_LEN = 45;
    unsigned char expected[EXPECTED_LEN + 1];
    size_t key_len = strlen((const char *)byte_4030);
    /* 生成 expected 字节序列，按反编译原算法：
       初始 prev = 0xB4（即 -76），随后 prev = byte_21A0[i] */
    unsigned char prev = 0xB4;
    for (size_t i = 0; i < EXPECTED_LEN; ++i) {
        unsigned char k = byte_4030[i % key_len];
        unsigned char v = (unsigned char)(prev ^ k ^ 0x3C);
        unsigned char rotated = rol(v, (i & 3) + 1);
        expected[i] = rotated ^ 0xA5;
        prev = byte_21A0[i]; /* 来源于原二进制的表 */
    }
    expected[EXPECTED_LEN] = 0;

    /* 把 expected 和 user_flag 都用 encode_custom_hex 编码后比较 */
    char enc_expected[1024];
    char enc_user[1024];
    encode_custom_hex(expected, EXPECTED_LEN, enc_expected, byte_4030, key_len);
    encode_custom_hex((const unsigned char *)user_flag, strlen(user_flag), enc_user, byte_4030, key_len);

    return strcmp(enc_expected, enc_user) == 0;
}

/* sub_1440（反调试检测）：读取 /proc/self/status，查找 "TracerPid:" 并解析 */
bool is_being_traced(void)
{
    FILE *f = fopen("/proc/self/status", "r");
    if (!f) return false;
    char line[256];
    bool traced = false;
    while (fgets(line, sizeof(line), f)) {
        if (strncmp(line, "TracerPid:", 10) == 0) {
            /* 跳过 "TracerPid:" 后的空格/制表符，解析整数 */
            char *p = line + 10;
            while (*p == ' ' || *p == '\t') ++p;
            long v = strtol(p, NULL, 10);
            traced = (v != 0);
            break;
        }
    }
    fclose(f);
    return traced;
}

/* sub_17E0 非常复杂（字节码解释器/虚拟机），依赖大量二进制常量表。
   在没有把这些常量一一恢复出来前无法给出简单的“等价”实现。
   这里给出一个占位函数，实际要完整复现需提取并填充所有表，然后逐条实现解释器逻辑。 */
bool complex_vm_check(void)
{
    /* TODO: 需要把 unk_2100 / byte_2102 / byte_2104 / unk_2160 / 等表填入，
       并把反汇编的解释器逐条实现。当前仅返回 false（表示未通过）。 */
    return false;
}

int main(void)
{
    char input[256];
    puts("Enter your flag:");
    fflush(stdout);
    if (!fgets(input, sizeof(input), stdin)) return 0;
    /* 去掉末尾换行 */
    size_t L = strlen(input);
    if (L && input[L-1] == '\n') input[L-1] = '\0';

    bool ok1 = check_flag_via_simple_transform(input);
    bool ok2 = complex_vm_check(); /* 若你复现了 sub_17E0，这里会调用完整实现 */
    bool traced = is_being_traced(); /* 注意：原二进制里的 sub_1440 并未在 main 直接被调用；
                                       这里只作为参考可用来在调试环境判断。 */

    if (ok1 || ok2) {
        puts("Correct!");
    } else {
        puts("Incorrect!");
    }
    return 0;
}
```

补充说明/如何继续

- 要让上面的代码实际工作（即能验证原程序里的 flag），必须把原二进制中的若干全局常量表拷出来并填入对应的数组：
  - byte_4030（用于 encode），byte_21A0（用于构造 expected 的中间 prev 值），以及 sub_17E0/解释器需要的 unk_2100、byte_2102、byte_2104、unk_2160 等表。
- sub_16B0 在原代码中做了 mprotect 并对内存片段做 XOR，似乎是运行时解密代码段/数据段的机制；如果复现或分析该二进制，需注意该动态解密逻辑。
- sub_17E0 是一个完整的 VM/解释器实现，反混淆它能直接得到第二条/更复杂的校验路径；如果你愿意我可以继续帮助把解释器的指令集和数据表逐条还原 —— 但那需要你提供或允许我查看二进制中的相关常量字节表。

如果你把二进制中的常量数组（byte_4030、byte_21A0、unk_2100、unk_2160 等）贴出来，我可以把这些常量填入上面的代码，并进一步还原 sub_17E0 的逻辑，使之成为可运行的验证程序。

##### User:

.bss:0000000000004030 ; char byte_4030[48]
.bss:0000000000004030 byte_4030 db 30h dup(?) ; DATA XREF: sub_1CA0+2↑o
.bss:0000000000004030

##### Assistant:

你贴出的那一行表明 byte_4030 在 .bss 段（48 字节），并未在静态数据区直接给出初始内容：

- .bss:0000000000004030 byte_4030 db 30h dup(?) —— 即 48 字节的未初始化区

这很重要：在之前的反汇编里，byte_4030 被当作“密钥/表”来用（sub_1CA0/sub_1D80）。如果在反汇编里它在 .bss，那么它很可能在运行时由程序的某段初始化/解密代码写入（例如你代码里有个 sub_16B0，做了 mprotect + 异或操作，很像运行时解密器）。因此要把完整的“反混淆可运行版”写出来，必须先获得这些表的实际字节值（byte_4030、byte_21A0、unk_2100、unk_2160 等）。

我下面给出两部分内容：

1. 如何获取这些运行时表（实用步骤 / gdb 命令）
2. 在拿到字节表后，如何把之前给你的反混淆 C 代码填上这些常量并运行（示例）

一、如何在运行时把 byte_4030/其它表导出

- 原因：程序可能在运行期间由 sub_16B0 或其它函数把数据解密写入 .bss，所以静态反汇编不会直接显示这些值，需要运行时读取内存。

建议办法（用 gdb）：

1. 启动程序（假设可执行名为 ./prog）并在合适位置打断点。理想位置：
   - 在调用 sub_1D80 之前（因为 sub_1D80 使用 byte_4030），或者
   - 在执行完可能的解密函数 sub_16B0 之后（如果你能定位它）
2. gdb 示例流程：
   - gdb ./prog
   - break main
   - run
   - step/next 跟到 sub_1D80 被调用之前，或直接 break sub_1D80 / break sub_16B0 等
   - 在断点处打印内存：
     - p &byte_4030 （如果符号可用）
     - x/48bx 0x4030 （若偏移地址，通过 info files 找到基址，或使用 &byte_4030）
     - 或者：dump memory /tmp/key.bin &byte_4030 &byte_4030+47
   - gdb 命令例子（假设符号可用）：
     - (gdb) break sub_1D80
     - (gdb) run
     - (gdb) x/48bx byte_4030
     - (gdb) set $i=0
     - (gdb) while $i<48; x/bx &byte_4030+$i; set $i=$i+1; end
     - 或直接：(gdb) dump binary memory /tmp/byte_4030 &byte_4030 &byte_4030+48
3. 如果符号不可用，用文件偏移或虚拟地址打印：
   - 在 gdb 中 use info proc mappings / info files 得到加载基址，然后计算 &byte_4030 地址。
   - 或在运行时调用 readelf -S / objdump -h 找到 .bss 段基址并加偏移 0x4030（视为虚拟地址的偏移）。

替代方法（脱离 gdb）：

- 动态地让程序打印这些值：如果可以修改源码/重新编译，把在初始化后打印 byte_4030 的输出写入文件。
- 使用 ptrace / ltrace / strace 辅助（但不一定能直接读内存）。
- 也可以用运行时内存转储工具（如 gcore）然后用 objdump/hexdump 在 core dump 中查找。

二、拿到表后如何把反混淆代码填好

- 一旦拿到 byte_4030（例如 48 字节的 hexdump），把它放到 C 源里：
  static const unsigned char byte_4030[48] = {0x12,0x34, ...};
- 同样把 byte_21A0、unk_2100、byte_2102、byte_2104、unk_2160 等表填入源代码。
- 我之前给出的可读实现（encode_custom_hex、check_flag_via_simple_transform、is_being_traced 等）可以直接用，只把 extern const unsigned char byte_4030[] 改为上面填好的数组。
- 如果 sub_17E0（复杂 VM）也要还原，需要把 unk_2100/unk_2160 等全部填好，并且把反汇编里 VM 的实现逻辑逐条翻译回 C —— 这是工作量较大的但可行的任务；我可以基于你提供的常量继续还原。

简短示例（如何把 hexdump 填入）：

- 假设 gdb 得到 byte_4030 内容为：
  30 41 7A ... （假设 48 字节）
- 在代码中：
  static const unsigned char byte*4030[48] = {
  0x30, 0x41, 0x7A, /* ... \_/ 0xNN
  };

三、关于你已给出的信息（.bss 声明）

- 结论：byte_4030 在 .bss，没有静态初值，必须在程序运行时被写入（被初始化或解密）。因此静态反汇编不能直接给出它的真实内容 —— 需要运行时提取。

如果你愿意，我可以接下来帮你：

- 指导你在 gdb 中具体提取 byte_4030（你贴出 gdb 输出，我可以帮你把 bytes 格式化为 C 数组），
- 或者你把从 gdb/xxd 得到的 48 字节的十六进制串贴上来，我帮你把完整的反混淆 C 代码（含表）写好并尽量把 sub_17E0 继续还原。

你想先我给出具体 gdb 命令脚本来导出 byte_4030，还是你已经能导出并把十六进制结果贴上来？

##### User:

int sub_16B0()
{
int result; // eax
char \*v1; // rdx

**rdtsc();
result = mprotect(
(void \*)((unsigned **int64)&loc*1550 & 0xFFFFFFFFFFFFF000LL),
(size_t)&loc_1550 - ((unsigned \*\*int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
7);
if ( !result )
{
v1 = (char *)&loc*1550;
do
{
\_v1 ^= 66 - (unsigned \*\*int8)&loc_1550 + (\_BYTE)v1;
++v1;
}
while ( v1 != (char *)&loc*1550 + 339 );
\_\_rdtsc();
mprotect(
(void *)((unsigned **int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL),
(size_t)&loc_1550 - ((unsigned **int64)&loc_1550 & 0xFFFFFFFFFFFFF000LL) + 339,
5);
JUMPOUT(0x1550LL);
}
return result;
}

##### Assistant:

你贴出的 sub_16B0 是典型的“运行时解密并跳转执行”的代码。下面先用几句话解释它在做什么，再给出更可读（反混淆）的等价实现。

要点总结

- 它把包含 loc_1550 的内存页设为可读可写可执行（mprotect(..., PROT_READ|PROT_WRITE|PROT_EXEC)）。
- 对从 &loc_1550 开始的 339 字节逐字节做异或处理：第 i 个字节（i 从 0 开始）与 (66 + i)（即 0x42 + i）异或。
  - 虽然原代码写的是 66 - (unsigned \_\_int8)&loc_1550 + (\_BYTE)v1，但地址低字节会在表达式里相互抵消，最终得到简单的 (66 + offset) 关系。
- 再把内存页设为只读可执行（PROT_READ|PROT_EXEC）。
- 最后通过 JUMPOUT 跳转到 loc_1550（即执行解密后的代码段）。

也就是说，这是一个自修改/解密代码段的函数：把一段被“加密”的代码解密到可执行段并直接跳过去执行。

反混淆并更可读的实现（示例）

- 下面给出一个清晰、可编译的等价实现（把 JUMPOUT 替换为调用解密后的函数指针或返回成功状态，按需要调整）。注意需要包含 <sys/mman.h> 等头文件。

```c
#include <stdint.h>
#include <stddef.h>
#include <unistd.h>
#include <sys/mman.h>
#include <stdio.h>

/* loc_1550: 这是被加密的代码/数据起始地址（在原程序中为符号 loc_1550） */
extern unsigned char loc_1550;

/* 解密并（可选）跳转执行 */
int decrypt_and_exec_loc1550(void)
{
    const size_t decrypt_size = 339;     /* 原代码处理的字节数 */
    const unsigned char start_key = 66;  /* 0x42 */
    /* 计算页面边界和需要 mprotect 的长度 */
    long page_size = sysconf(_SC_PAGESIZE);
    uintptr_t base = (uintptr_t)&loc_1550;
    uintptr_t page_start = base & ~( (uintptr_t)page_size - 1 );
    size_t protect_len = (size_t)((uintptr_t)&loc_1550 - page_start) + decrypt_size;

    /* 使内存可写可执行 */
    if (mprotect((void*)page_start, protect_len, PROT_READ | PROT_WRITE | PROT_EXEC) != 0) {
        perror("mprotect RWX failed");
        return -1;
    }

    /* 异或解密：data[i] ^= (start_key + i) */
    unsigned char *data = (unsigned char*)&loc_1550;
    for (size_t i = 0; i < decrypt_size; ++i) {
        data[i] ^= (unsigned char)(start_key + i);
    }

    /* 将内存恢复为只读+可执行 */
    if (mprotect((void*)page_start, protect_len, PROT_READ | PROT_EXEC) != 0) {
        perror("mprotect RX failed");
        /* 仍然可以执行，但返回错误 */
        return -1;
    }

    /* 可选：直接跳转到解密后的代码执行（原代码使用 JUMPOUT 到 0x1550） */
    /* 如果希望像原来那样直接转去执行，把下一行取消注释： */
    /* ((void (*)(void)) &loc_1550)(); */

    return 0; /* 成功返回（原函数在成功时不会返回，而是跳转执行） */
}
```

补充说明

- 为什么原来看似依赖地址低字节的表达式会化为简单的 (66 + offset)：
  - 原表达式 key = 66 - (unsigned \_\_int8)&loc_1550 + (\_BYTE)v1，其中 v1 = &loc_1550 + offset。
  - (\_BYTE)v1 等于 (base_low + offset)（模 256），所以 key = 66 - base_low + (base_low + offset) = 66 + offset（模 256）。因此与基址无关，只与 offset 有关。
- decrypt_size = 339 由原代码给出；如果实际二进制中该大小可能不同，按实际值替换。
- 原函数调用 \_\_rdtsc() 两次，可能用于防调试/时间测量或插桩，这里可忽略（不影响解密算法）。
- 原代码最后用 JUMPOUT 跳转到解密位置，真正行为是“解密后立即执行那段代码”。在复现或静态分析时，可选择只解密并返回，或直接调用解密后函数指针来模拟原始流程。

如果你愿意，可以把 loc_1550 所在的内存（或可执行段）和解密后数据贴出来，我可以：

- 帮你用该函数在本地解密并给出解密后的字节表（例如 byte_4030 可能就是在解密后写入 .bss 的），
- 或者把整个运行时初始化流程（比如在 program start 时哪儿调用了 sub_16B0）进一步还原。

##### User:

.text:0000000000001550
.text:0000000000001550 loc_1550: ; CODE XREF: sub_16B0+11A↓j
.text:0000000000001550 ; DATA XREF: sub_16B0+1E↓o
.text:0000000000001550 mov cl, 4Ch ; 'L'
.text:0000000000001552 pop rdx
.text:0000000000001553 mov edi, 0CA001413h
.text:0000000000001558 cmpsb
.text:0000000000001559 push rbx
.text:000000000000155A add al, 7Ch ; '|'
.text:000000000000155C mov es, word ptr [rdi]
.text:000000000000155C ; ---------------------------------------------------------------------------

##### Assistant:

好——你贴出的 loc_1550 是那段“解密后要跳去执行”的代码的起始处。关键结论和下一步建议如下：

1. 关于你贴出的几条反汇编

- 那几条并不能完整说明函数含义，可能是因为你只截了前面几条指令、或者反汇编器在该地址自动断帧/对齐不对导致看起来有些奇怪（如 cmpsb 需要 RSI/ RDI/AL 等寄存器先设定）。总体上可以确定：loc_1550 是一段可执行代码（被 sub_16B0 解密后直接执行），里面会有对全局数据的初始化/拷贝/解密等动作（常见于解密并初始化 .bss 区域的启动例程）。

2. 我需要更多数据来继续反混淆 / 还原为 C
   要把 loc_1550 的行为完全翻译成可读 C，需要获得解密后的完整 339 字节（或 loc_1550..loc_1550+338）的机器码或反汇编文本，然后重构逻辑。建议两种可行方式，你任选其一并把结果贴上来，我来帮你把它翻译成 C：

方法 A — 在程序运行时直接 dump 解密后的内存（推荐）

- 在运行 sub_16B0 使其把那段代码解密并跳过去之前设置断点或在解密后立即暂停，然后把内存块 dump 出来。常用 gdb 命令（假设二进制有符号且 loc_1550 符号可用）：
  1. 在 sub_16B0 前打断点并 run：
     (gdb) break sub_16B0
     (gdb) run

  2. 单步执行到 mprotect / 解密循环执行完（或者直接在 loc_1550 打断点）：
     (gdb) break \*0x1550 # 在解密后入口打断点
     (gdb) continue

  3. 到达 loc_1550 后，把那 339 字节 dump 到文件或直接打印十六进制：
     (gdb) x/339bx 0x1550
     或把内存写文件：
     (gdb) dump binary memory /tmp/loc1550.bin 0x1550 0x1550+339

  4. 把 /tmp/loc1550.bin 上传或把 hexdump (xxd -g 1 /tmp/loc1550.bin) 的输出贴上来，我可以直接对它反汇编并重写成 C。

方法 B — 直接读取解密后写入的全局表（如果 loc_1550 的作用是初始化 .bss）

- 很多此类 loader 会把密钥表（例如 byte_4030、byte_21A0）写入 .bss。可以在解密并跳转后直接 dump 那些全局数组的地址：
  在到达 loc_1550 之后（或在它运行完毕后）：
  (gdb) x/48bx &byte_4030 # 打印 48 字节的 byte_4030
  (gdb) x/45bx &byte_21A0 # 若知道长度
  或：
  (gdb) dump binary memory /tmp/byte_4030 &byte_4030 &byte_4030+48

把这些二进制/十六进制结果贴上来，我会把它们格式化为 C 数组，并把之前给你的解密/编码逻辑与这些常量整合成一个可运行的、可读的验证程序。

3. 如果你暂时不能运行 gdb，我也可以给你一个小脚本

- Python 脚本：把 gdb 的 x/xb 输出或 xxd 输出转成 C 数组，以及把 dump 的 bin 文件变成 hexdump：

示例：把 bin 转 C 数组并打印相应源代码（在能得到 /tmp/loc1550.bin 或 /tmp/byte_4030.bin 后使用）

```python
# usage: python3 make_c_array.py /tmp/byte_4030.bin byte_4030
import sys
b = open(sys.argv[1],"rb").read()
name = sys.argv[2]
print("static const unsigned char %s[%d] = {" % (name, len(b)))
for i in range(0,len(b),16):
    line = b[i:i+16]
    print("  " + ", ".join("0x%02x" % x for x in line) + ("," if i+16 < len(b) else ""))
print("};")
```

4. 我能马上做的事（你把数据贴上来即可）

- 如果你把 loc_1550 的 339 字节二进制 / hexdump / 更完整的反汇编贴上来，我会：
  - 反汇编并注释每条指令；
  - 还原出该代码在做什么（例如是否写入 byte_4030、是否执行某个 VM 解码、是否解密表等）；
  - 把它净化成容易阅读的 C 实现（包含把它怎么初始化全局表的代码放在合适位置）；
  - 把所有需要的常量数组直接嵌入，生成一个完整的“去混淆”版本。

总结（简短）

- loc_1550 是 sub_16B0 解密后跳去执行的段。你现在需要把解密后的完整字节或被初始化的全局表 dump 出来。
- 推荐在 gdb 中在 0x1550 处断点并用 dump binary memory 导出 339 字节或直接 dump byte_4030 / byte_21A0。
- 把 dump 的二进制或 hexdump 发过来，我会把该段完整反汇编并翻译成可读 C 代码，填好所有常量并给出最终可运行的反混淆实现。

##### User:

.text:0000000000001550
.text:0000000000001550 loc_1550: ; CODE XREF: sub_16B0+11A↓j
.text:0000000000001550 ; DATA XREF: sub_16B0+1E↓o
.text:0000000000001550 mov cl, 4Ch ; 'L'
.text:0000000000001552 pop rdx
.text:0000000000001553 mov edi, 0CA001413h
.text:0000000000001558 cmpsb
.text:0000000000001559 push rbx
.text:000000000000155A add al, 7Ch ; '|'
.text:000000000000155C mov es, word ptr [rdi]
.text:000000000000155C ; ---------------------------------------------------------------------------
.text:000000000000155E dw 9861h
.text:0000000000001560 dq 601096A91D94AC1Ah, 6180DC6F52412E9Bh, 696867E27A6B7517h
.text:0000000000001578 dq 0B18F27AE5C246B6Ah, 797833697ABC8C3Ah, 81AAE04BF034A94Bh
.text:0000000000001590 dq 89888FA2C143CB82h, 919CA08300C48B8Ah, 99989796158B9C92h
.text:00000000000015A8 dq 0E960AED67815D3CFh, 0A9A8A74EA0D06327h, 4133BEAA1BA3F6AAh
.text:00000000000015C0 dq 9DFC3CFEA3B03B97h, 0C0023CF66DBDF3B2h, 334B8FCEE1804A8Ah
.text:00000000000015D8 dq 0D1FAACCB0B01BEDFh, 0D9D8D016129CD3D2h, 0E1E0DFDD1C1B93DAh
.text:00000000000015F0 dq 0FC2920AE244BECAAh, 0E58527D7A5ECEBEAh, 0F9F8F772EAFBDD94h
.text:0000000000001608 dq 184E0F1D39AFBFAh, 41C8364E05040302h, 0D0EF47CEF244C23Bh
.text:0000000000001620 dq 9A29180F60D52A5Ah, 21A400110F691BFAh, 0E9196F7625242322h
.text:0000000000001638 dq 79652F3122748925h, 0F9BD7FF6047CD6BBh, 1C403F3E3DD43E4Eh
.text:0000000000001650 dq 3C88C2B9BAB9A8AAh, 51504F498D8B037Dh, 115857565695941Ah
.text:0000000000001668 dq 61759E99159DF455h, 0F7912AE5C2C6362h, 71706F6EE9736444h
.text:0000000000001680 dq 0E994FE3E90FD3B72h, 1143222565B8F832h, 89B44741CD7BB2CAh
.text:0000000000001698 dq 0FC7870BF88838B8Ah, 1D8798B8F36B6C68h, 0A1BF909E9D9C9B9Ah
.text:00000000000016B0

##### Assistant:

好——总结并给出可执行的“反混淆 / 解密”方案和工具代码。

要点回顾（基于你给出的 sub_16B0 与 loc_1550）

- sub_16B0 把以 loc_1550 为起点的 339 字节内存页临时设为 RWX，然后对这 339 字节按字节做异或：data[i] ^= (0x42 + i)（i 从 0 开始）。完成后把页权限恢复为 RX，并通过 JUMPOUT 跳转到 loc_1550 执行解密后的代码。
- 你贴出的 loc_1550 区段内容显示了 loc_1550 的静态二进制数据（反汇编器把这段原始二进制按 dq 列出来）。这段数据就是被 sub_16B0 解密前或解密后的一种表示；不管哪一种，我们都可以把它当作原始字节流并按 sub_16B0 的规则做异或来还原另一侧（也就是把“加密态”→“解密态”或反之还原回来）。
- 因此我们可以：从可执行文件中提取 loc_1550 起始的 339 字节（虚拟地址 0x1550），对每个字节用 key = (0x42 + offset) 做异或，得到解密后的字节流，然后对该字节流做反汇编或按需解析表格，进而还原出 byte_4030、byte_21A0、unk_2100 等被 runtime 写入 .bss 的表。

下面给出两部分内容：

1. 一个 Python 工具：自动从 ELF 文件读取 0x1550 起的 339 字节（用 pwntools/ELF 自动把虚地址转成文件偏移），对每字节异或 (0x42 + i)，把解密结果写文件并做十六进制输出与 capstone 反汇编；
2. 一个 C 等价实现（更可读的解密函数），如果你想在本地复现解密并调用解密后的代码片段可以用它。

一、Python 自动化脚本（推荐）

- 依赖：pip install pwntools capstone
- 用法：python3 decrypt_loc1550.py /path/to/binary
- 脚本会：
  - 用 ELF 解析虚拟地址 0x1550 对应文件偏移并读取 339 字节；
  - 对 bytes[i] 异或 (0x42 + i)；
  - 将解密后输出为 /tmp/loc1550_decrypted.bin，并打印 hexdump 与反汇编（若能识别为有效代码）。

脚本如下：

```python
#!/usr/bin/env python3
# decrypt_loc1550.py
# Requires: pwntools, capstone
# pip install pwntools capstone

import sys
from pwn import ELF
from capstone import Cs, CS_ARCH_X86, CS_MODE_64

VA = 0x1550
SIZE = 339
KEY0 = 0x42

def hexdump(b):
    for i in range(0, len(b), 16):
        chunk = b[i:i+16]
        print("%04x: %s" % (i, " ".join("%02x" % x for x in chunk)))

def disasm_bytes(b, base=VA):
    md = Cs(CS_ARCH_X86, CS_MODE_64)
    md.detail = False
    for insn in md.disasm(b, base):
        print("0x%x:\t%s\t%s" % (insn.address, insn.mnemonic, insn.op_str))

def main(argv):
    if len(argv) < 2:
        print("Usage: %s <binary>" % argv[0]); return
    path = argv[1]
    elf = ELF(path)
    # find file offset for VA
    try:
        off = elf.address_to_offset(VA)
    except Exception as e:
        print("address_to_offset failed: %s" % e)
        # fallback: try manual segment mapping
        off = None
        for seg in elf.segments:
            va0 = seg.header.p_vaddr
            va1 = va0 + seg.header.p_memsz
            if VA >= va0 and VA < va1:
                off = seg.header.p_offset + (VA - va0)
                break
        if off is None:
            print("Cannot find file offset for VA 0x%x" % VA)
            return

    with open(path, "rb") as f:
        f.seek(off)
        enc = f.read(SIZE)
    if len(enc) < SIZE:
        print("Warning: read only %d bytes (expected %d)" % (len(enc), SIZE))

    print("Encrypted bytes (first 128 bytes):")
    hexdump(enc[:128])

    # decrypt
    plain = bytearray(len(enc))
    for i, b in enumerate(enc):
        key = (KEY0 + i) & 0xFF
        plain[i] = b ^ key

    outpath = "/tmp/loc1550_decrypted.bin"
    with open(outpath, "wb") as f:
        f.write(plain)
    print("\nDecrypted bytes (first 128 bytes):")
    hexdump(plain[:128])

    print("\nAttempting disassembly of decrypted bytes:")
    disasm_bytes(bytes(plain), VA)

    print("\nDecrypted binary written to: %s" % outpath)
    # also print C array snippet
    print("\nC array (decrypted):")
    print("static const unsigned char loc1550_dec[%d] = {" % len(plain))
    for i in range(0, len(plain), 16):
        line = plain[i:i+16]
        print("    " + ", ".join("0x%02x" % x for x in line) + ",")
    print("};")

if __name__ == '__main__':
    main(sys.argv)
```

说明：

- 如果你不能直接把 ELF 路径给脚本运行，也可以用 gdb 在进程内 dump 出 339 字节（如前面所说：dump binary memory /tmp/loc1550.bin 0x1550 0x1550+339），然后把该文件传给脚本并直接对其做异或：把脚本改成读取该文件即可（绕过 ELF offset 计算）。
- 脚本会生成解密后的二进制并尝试用 capstone 反汇编，方便你理解解密后代码做了什么（比如是否把全局表写入 .bss，或是否把某些常量拷贝出去）。

二、C 中更可读的解密实现（等价 sub_16B0）
如果你想在程序内部复现 sub_16B0 的行为（把内存段解密成可执行并跳到它），下面是“可读版本”。注意：真实程序中 sub_16B0 在成功时并不返回，而是 JUMPOUT 到 loc_1550；下面示例做了显式函数指针调用作为替代：

```c
#include <stdio.h>
#include <sys/mman.h>
#include <unistd.h>
#include <stdint.h>

extern unsigned char loc_1550; /* 符号由链接器/反汇编提供 */

int decrypt_loc1550_and_call(void)
{
    const size_t decrypt_size = 339;
    const unsigned char base_key = 0x42;
    long page_size = sysconf(_SC_PAGESIZE);
    uintptr_t base = (uintptr_t)&loc_1550;
    uintptr_t page_start = base & ~( (uintptr_t)page_size - 1 );
    size_t protect_len = (size_t)((uintptr_t)&loc_1550 - page_start) + decrypt_size;

    if (mprotect((void*)page_start, protect_len, PROT_READ | PROT_WRITE | PROT_EXEC) != 0) {
        perror("mprotect RWX");
        return -1;
    }

    unsigned char *p = (unsigned char*)&loc_1550;
    for (size_t i = 0; i < decrypt_size; ++i) {
        p[i] ^= (unsigned char)(base_key + i);
    }

    if (mprotect((void*)page_start, protect_len, PROT_READ | PROT_EXEC) != 0) {
        perror("mprotect RX");
        /* We still can try to call it */
    }

    /* 如果你想像原程序那样直接跳过去执行（但注意安全），可以转换为函数指针调用 */
    void (*f)(void) = (void(*)(void)) &loc_1550;
    f();

    return 0;
}
```

三、下一步建议（我可以帮你做的事情）

- 你可以：
  - 把可执行文件（或 gdb dump 的 /tmp/loc1550.bin）发过来，我帮你运行上面的解密并把解密后的反汇编（带注释）贴回来；或者
  - 直接用上面的 Python 脚本在你的机器上运行并把输出（尤其是解密后的第几百个字节的 hexdump 与反汇编片段）贴上来；我会基于反汇编把解密后逻辑翻译成 C，尤其查找初始化 .bss（byte_4030 等）的代码并给出最终的常量数组。
- 一旦得到解密后的 code/data，我会继续：
  - 找到 byte_4030、byte_21A0、unk_2100、unk_2160 等如何被填充并把这些表导出为 C 数组；
  - 把 sub_17E0（复杂 VM）以及 sub_1D80 校验链还原为可读 C（如果你需要，我会把 VM 指令逐条重写成 C），从而得到一个完整的“去混淆”用户验证程序。

如果现在就把可执行文件或者用 gdb dump 出来的 loc1550.bin 发上来（或把你运行脚本的输出粘贴上来），我会直接把解密结果反汇编并给出清晰的 C 还原代码。

##### User:

0x1550: endbr64
0x1554: push rbp
0x1555: push rbx
0x1556: sub rsp, 0x18
0x155a: xor rax, rax
0x155d: xor rcx, rcx
0x1560: inc rax
0x1563: inc rcx
0x1566: cmp rcx, rax
0x1569: jne 0x1588
0x156b: rdtsc
0x156d: and eax, 0
0x1570: jne 0x1588
0x1572: nop dword ptr [rax + rax]
0x157a: xor rax, rax
0x157d: inc rax
0x1580: dec rax
0x1583: nop dword ptr [rax + rax]
0x1588: xor edx, edx
0x158a: lea rsi, [rip + 0x2a9f]
0x1591: mov qword ptr [rsp + 8], 0
0x159a: lea rcx, [rip + 0xc2f]
0x15a1: nop dword ptr [rax]
0x15a8: push rbp
0x15a9: mov rbp, rsp
0x15ac: xor rax, rax
0x15af: test rax, rax
0x15b2: je 0x15b9
0x15b4: call 0x15b9
0x15b9: pop rbp
0x15ba: movzx eax, byte ptr [rcx + rdx]
0x15be: xor eax, 0x25
0x15c1: mov byte ptr [rsi + rdx], al
0x15c4: mov rax, qword ptr [rsp + 8]
0x15c9: add rax, rdx
0x15cc: add rdx, 1
0x15d0: mov qword ptr [rsp + 8], rax
0x15d5: cmp rdx, 0x15
0x15d9: jne 0x15a8
0x15db: mov byte ptr [rip + 0x2a63], 0
0x15e2: mov rax, 7
0x15e9: mov rcx, 3
0x15f0: imul rax, rcx
0x15f4: mov rcx, 0x15
0x15fb: cmp rax, rcx
0x15fe: jne 0x1614
0x1600: nop word ptr cs:[rax + rax]
0x160a: nop word ptr cs:[rax + rax]
0x1614: xor rax, rax
0x1617: xor rcx, rcx
0x161a: inc rax
0x161d: inc rcx
0x1620: cmp rcx, rax
0x1623: jne 0x163e
0x1625: rdtsc
0x1627: and eax, 0
0x162a: jne 0x163e
0x162c: nop dword ptr [rax + rax]
0x1634: push rax
0x1635: xor rax, rax
0x1638: cpuid
0x163a: pop rax
0x163b: nop dword ptr [rax]
0x163e: push rbp
0x163f: mov rbp, rsp
0x1642: xor rax, rax
0x1645: test rax, rax
0x1648: je 0x164f
0x164a: call 0x164f
0x164f: pop rbp
0x1650: call 0x1440
0x1655: test eax, eax
0x1657: jne 0x1690
0x1659: mov rax, 7
0x1660: mov rcx, 3
0x1667: imul rax, rcx
0x166b: mov rcx, 0x15
0x1672: cmp rax, rcx
0x1675: jne 0x1688
0x1677: nop word ptr cs:[rax + rax]
0x1681: mov rbp, rsp
0x1684: mov rsp, rbp
0x1687: nop
0x1688: add rsp, 0x18
0x168c: pop rbx
0x168d: pop rbp
0x168e: ret
0x168f: nop
0x1690: xor rdi, rdi
0x1693: mov rax, 0x3c
0x169a: syscall
0x169c: xor edi, edi
0x169e: call 0x1110

##### Assistant:

很好——你贴出的 0x1550 解密后反汇编已经很清楚。下面先用几句话总结它的关键行为，然后给出对应的“反混淆”C 实现，便于理解和在源码里复现。

关键行为（高层）

- loc_1550 是 sub_16B0 解密后实际要执行的代码入口；解密后的代码会初始化若干全局字节数组并做反调试检查。
- 主要的实际动作是：
  1. 从某处只读/只读数据段拷贝若干字节到 .bss 的地址 0x4030（即程序里的 byte_4030），拷贝时对每字节做 XOR 0x25。
     - 拷贝长度为 0x15（21）字节，目标起始地址正好是 byte_4030（LEA 结果 = 0x4030）。
  2. 将全局某字节置 0（指令 mov byte ptr [rip+0x2a63], 0），该地址计算结果为 0x403D（即在 byte_4030 之内，偏移 0xD = 13），因此相当于在 byte_4030[13] = 0。
  3. 调用 sub_1440（你之前反编译为读取 /proc/self/status 的函数，检测 TracerPid），如果被跟踪（ptrace），则调用 exit(0)（通过 syscall）。
- 其它大量 rdtsc/cpuid/nop/arith 指令是典型的反调试/反分析填充（时间测量、无害检查或对齐 NOP），并不改变上面的核心逻辑。

因此，我们可以把 loc_1550 的核心用更易读的 C 代码表达出来。下面给出该逻辑的反混淆实现（注：需要把“源数据”填为二进制中相应的字节序列——这些就是你在 .text 段看到的那些 dq/dw 常量按小端展开得到的字节）：

反混淆的 C（等价逻辑）

```c
#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>
#include <unistd.h>
#include <sys/mman.h>

/* 这两个在原程序中是全局符号，.bss 起始地址在你的二进制中是 0x4030 */
extern unsigned char byte_4030[48]; /* 在你的反汇编里定义为 .bss:0000000000004030 */
extern unsigned char some_flag_at_403D; /* 位置 0x403D 即 byte_4030 + 0xD */

/* sub_1440 的可读实现（你之前反编译出的函数）*/
bool is_traced(void); /* 实现为读取 /proc/self/status 的 TracerPid 判断 */

/* 源数据：把在 .text 段看到的那些 dq/dw 常量按小端字节顺序展开成字节数组并填入这里。
   你可以用前面给出的 python 脚本或 gdb dump 把实际字节提取出来并替换下面的 placeholder。 */
static const unsigned char embedded_src[] = {
    /* TODO: 用从二进制中提取、对应 rcx 指向位置的字节填充此数组 */
    /* 例如：0x61,0x98,0x1a,0xac,0x94,... (按小端展开 dq/dw) */
};

/* 把 embedded_src 的前 21 字节异或 0x25 拷贝到 byte_4030 */
void loc_1550_init_globals(void)
{
    size_t copy_len = 0x15; /* 21 bytes */
    unsigned char *dst = byte_4030;
    const unsigned char *src = embedded_src;

    for (size_t i = 0; i < copy_len; ++i) {
        dst[i] = src[i] ^ 0x25;
    }

    /* 在原汇编里紧接着有 mov byte ptr [rip + ...], 0，其地址算出是 0x403D：
       所以把 byte_4030[0xD] 设为 0（等同于在 .bss 写入终止符或标志）。 */
    dst[0xD] = 0;
}

/* 解密后直接执行的逻辑（去除了反分析填充，只保留实际效果） */
void loc_1550_equivalent(void)
{
    /* 初始化全局表 */
    loc_1550_init_globals();

    /* 将一个全局字节置 0（上面已做为 dst[0xD] = 0）——保留以示意 */

    /* 调用反调试检测，若被跟踪则 exit(0) */
    if (is_traced()) {
        _exit(0); /* 原汇编通过 syscall 做 exit(0) */
    }

    /* 否则继续（原代码有很多 nop/校验/对齐逻辑，这里省略） */
}
```

如何把 embedded_src 填好（实践步骤）

- 你在前面贴出的 .text 段（0x155E 开始的 dw/dq 列表）其实就是这些要被拷贝/解码的数据的来源。把这些 dq/dw 按小端字节顺序展成字节流（从 0x155E 开始顺序地把每个 8 字节 dq 展开为低字节先）就可以得到 embedded_src 的内容。
- 推荐的、可重复的提取方法：
  - 在 gdb 里在 loc_1550 执行点或解密后断点，然后：
    (gdb) x/64bx 0x155E # 打印从该地址开始的字节（具体长度按你看到的 dq/data 长度）
    或直接：
    (gdb) dump binary memory /tmp/loc_data 0x155E 0x16B0
  - 用 xxd 或 python 把二进制转成 C 数组（之前我给了脚本示例）。
- 一旦把 embedded_src[0..20] 填入，上面的 loc_1550_equivalent 就能在源码层面重现原汇编的初始化效果。

补充说明（重要）

- 你之前看到的 sub_16B0 做的是把 loc_1550 段异或解密（key = 0x42 + offset）然后跳转执行；我们已经处理了解密后代码的语义（即 loc_1550_equivalent）。
- loc_1550 的其余大量 rdtsc/cpuid/nop/乘法比较等，属于反调试/防分析填充或对齐噪音，不改变拷贝/写入/ptrace 检测这三项关键行为，因此在反混淆后的 C 中可以省略或保留为注释说明。
- 根据反汇编，byte_4030 在 .bss（未初始化），所以程序在运行时由该代码初始化它——这就是为什么在静态反汇编看不到 byte_4030 的具体内容：它被 runtime 写入（由 loc_1550/解密器负责）。

如果你愿意，我可以：

- 帮你把你之前列出的 dq/dw 序列按小端展开成 embedded_src 的具体字节数组（你已经贴出了那段 dq 列表，我可以直接把它展开成 C 数组并替你填好），
- 或者把整段解密后机器码做更详细的逐条注释（把那些看起来像“杂项”指令也说明它们的目的）。

你希望我现在把你前面给出的那组 dq/dw 常量按小端展开，并直接给出 embedded_src 的字节数组吗？

##### User:

请写一个脚本完成提取

##### Assistant:

下面给你一个 Python 脚本，用来从你贴的那段汇编（含 dq / dd / dw 等指令的文本）中提取常量，把每个常量按小端展开为字节流，并生成 C 的字节数组。脚本还能可选地对提取出的字节做二次处理，例如：按 sub_16B0 的规则对 loc_1550 做异或解密（key = 0x42 + offset）或按 loc_1550 中拷贝到 byte_4030 时的逻辑对前若干字节再异或 0x25，以得到最终写入 byte_4030 的内容。

保存为 extract_embedded.py 并用 Python3 运行。

使用示例：

- 从 asm.txt（包含你贴的 .text 段的汇编/数据行）提取为 C 数组：
  python3 extract_embedded.py asm.txt -o embedded.c -n embedded_src
- 提取并把前 21 字节再 xor 0x25（得到 byte_4030 的值）：
  python3 extract_embedded.py asm.txt -o byte_4030.c -n byte_4030 --take 21 --xor-byte 0x25
- 如果想把 dq/dd/dw 都解析出来并输出十六进制：
  python3 extract_embedded.py asm.txt --dump-hex

脚本如下：

```python
#!/usr/bin/env python3
"""
extract_embedded.py

从包含 dq/dd/dw 数据行的汇编文本中提取常量，按小端展开为字节流，
并输出为 C 字节数组（格式化输出）。可选对提取的字节应用异或处理或
按偏移用 key = (0x42 + i) 解密（用于 sub_16B0 解密场景）。

用法示例见脚本顶部说明。
"""
import sys
import argparse
import re
from pathlib import Path

# 解析单个常量 token（如 "601096A91D94AC1Ah" 或 "0xFF" 或 "9861h" 或 "1234"）
def parse_token(tok):
    tok = tok.strip()
    if not tok:
        return None
    # remove potential trailing comments or parentheses
    tok = tok.split(';',1)[0].split('//',1)[0].strip()
    # regex for MASM style hex (ending with h) or 0x style or decimal
    m = re.match(r'^(?P<h>[0-9A-Fa-f]+)h$', tok)
    if m:
        return int(m.group('h'), 16)
    m = re.match(r'^0x(?P<h2>[0-9A-Fa-f]+)$', tok, re.IGNORECASE)
    if m:
        return int(m.group('h2'), 16)
    m = re.match(r'^(?P<d>\d+)$', tok)
    if m:
        return int(m.group('d'), 10)
    # fallback: find first hex substring
    m = re.search(r'([0-9A-Fa-f]+)h', tok)
    if m:
        return int(m.group(1), 16)
    m = re.search(r'0x([0-9A-Fa-f]+)', tok, re.IGNORECASE)
    if m:
        return int(m.group(1), 16)
    m = re.search(r'([0-9A-Fa-f]{2,})', tok)
    if m:
        return int(m.group(1), 16)
    return None

def process_file(path):
    data = bytearray()
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            # match start of line directive like "dq", "dd", "dw"
            m = re.match(r'^(?:\.\w+:)?\s*(dq|dd|dw)\s+(.*)$', line, re.IGNORECASE)
            if not m:
                # also support lines that list only dq/dd values separated by commas
                # try to find tokens even if directive is absent
                continue
            directive = m.group(1).lower()
            rest = m.group(2).strip()
            # split by commas
            tokens = [t.strip() for t in rest.split(',') if t.strip()]
            size = None
            if directive == 'dq':
                size = 8
            elif directive == 'dd':
                size = 4
            elif directive == 'dw':
                size = 2
            else:
                continue
            for tok in tokens:
                val = parse_token(tok)
                if val is None:
                    continue
                try:
                    b = int(val).to_bytes(size, byteorder='little', signed=False)
                except OverflowError:
                    # value too big for size, try to trim to low bytes
                    mask = (1 << (size*8)) - 1
                    b = (int(val) & mask).to_bytes(size, byteorder='little', signed=False)
                data.extend(b)
    return data

def format_c_array(name, data, perline=16):
    lines = []
    lines.append(f"static const unsigned char {name}[{len(data)}] = {{")
    for i in range(0, len(data), perline):
        chunk = data[i:i+perline]
        line = "    " + ", ".join(f"0x{b:02x}" for b in chunk) + ("," if i+perline < len(data) else "")
        lines.append(line)
    lines.append("};")
    return "\n".join(lines)

def hexdump(data, width=16):
    for i in range(0, len(data), width):
        chunk = data[i:i+width]
        print(f"{i:04x}: " + " ".join(f"{b:02x}" for b in chunk))

def main():
    ap = argparse.ArgumentParser(description="从汇编 dq/dd/dw 文本中提取小端字节流并生成 C 数组")
    ap.add_argument("infile", help="输入文本文件（包含 dq/dd/dw 行）")
    ap.add_argument("-o", "--out", help="输出 C 文件（默认 stdout）", default=None)
    ap.add_argument("-n", "--name", help="生成的 C 数组名", default="embedded_src")
    ap.add_argument("--take", type=int, help="只取前 N 字节（可选）", default=0)
    ap.add_argument("--xor-byte", type=lambda x:int(x,0), help="对结果每字节再 xor 一个字节值（如 0x25）", default=None)
    ap.add_argument("--decrypt-loc1550", action='store_true',
                    help="按 sub_16B0 的规则解密（对每个字节 xor (0x42 + offset)），用于解密 loc_1550 段")
    ap.add_argument("--dump-hex", action='store_true', help="把结果做 hexdump 输出到 stdout")
    args = ap.parse_args()

    infile = Path(args.infile)
    if not infile.exists():
        print("输入文件不存在：", infile)
        sys.exit(1)

    data = process_file(infile)

    if args.take and args.take > 0:
        data = data[:args.take]

    if args.decrypt_loc1550 := args.decrypt_loc1550:
        # apply key = 0x42 + i
        dec = bytearray(len(data))
        for i, b in enumerate(data):
            dec[i] = b ^ ((0x42 + i) & 0xFF)
        data = dec

    if args.xor_byte is not None:
        key = args.xor_byte & 0xFF
        for i in range(len(data)):
            data[i] ^= key

    if args.dump_hex:
        hexdump(data)

    ctext = format_c_array(args.name, data)

    if args.out:
        with open(args.out, 'w') as fo:
            fo.write(ctext)
        print(f"Wrote {len(data)} bytes to {args.out} as C array '{args.name}'")
    else:
        print(ctext)

if __name__ == '__main__':
    main()
```

说明与注意事项

- 脚本假定输入是你那种汇编文本（每行形如 "dq 601096A91D94AC1Ah, 6180DC6F52412E9Bh, ..." 或 "dw 9861h" 等）。脚本会分别把 dq → 8 字节、dd → 4 字节、dw → 2 字节按小端展开并按出现顺序拼接成字节流。
- parse_token() 支持 MASM/IDR 风格的十六进制（例如 9861h）和 0x.. 风格及十进制。会尽量从杂乱 token 中提取第一个十六进制数。
- --decrypt-loc1550 用于把 loc_1550 段（如果是被 sub_16B0 加密后的原始 bytes）按 key = (0x42 + offset) 逐字节异或还原成解密后的内容。注意：你在前面已经给出解密后的反汇编；如果你是直接用刚才给出的 dq/dw 段（也可能已经是解密后的内容），就不必再用此选项。
- --xor-byte 常用于 loc_1550 解密后那段代码将 src[i] ^ 0x25 拷贝到 byte_4030 的场景。比如你想直接得到 byte_4030 的最终 21 字节值，可以先提取整段数据，再用 "--take 21 --xor-byte 0x25"。
- 输出的 C 数组格式为 static const unsigned char name[len] = {...};，每行 16 字节，方便直接拷入你之前的反混淆 C 源中。

如果你把你完整的汇编段（如你之前贴出的从 0x155E 起的 dw/dq 列表）保存为 asm.txt 后运行上面的脚本，我可以替你把输出的 C 数组结果（或你运行脚本的输出结果）直接嵌入到反混淆的源码里，继续把 sub_1D80/sub_17E0 等逻辑复原。需要我帮你把你那段 dq/dw 文本直接转换成 C 数组的话，把原始文本贴上来或确认你已经保存为文件，我可以直接用脚本帮你处理并贴出数组。

##### User:

.rodata:00000000000021A0 ; \_BYTE byte_21A0[69]
.rodata:00000000000021A0 byte_21A0 db 0B4h, 20h, 95h, 44h, 0Ch, 4Eh, 37h, 7, 84h, 2 dup(0FBh)
.rodata:00000000000021A0 ; DATA XREF: sub_1D80+89↑o
.rodata:00000000000021AB db 72h, 84h, 1Ah, 0D0h, 0A3h, 1Ah, 5Ch, 42h, 91h, 38h
.rodata:00000000000021B5 db 0E8h, 4Bh, 61h, 15h, 1Ah, 0, 51h, 38h, 0C2h, 79h, 1Fh
.rodata:00000000000021C0 db 6Ch, 0D1h, 0F1h, 22h, 71h, 0DEh, 0CBh, 0D3h, 2Fh, 3Ch
.rodata:00000000000021CA db 8Bh, 9Fh, 61h, 3 dup(0), 4Ch, 4Bh, 14h, 71h, 7Ah, 64h
.rodata:00000000000021D6 db 2 dup(57h), 65h, 5Ch, 7Ah, 14h, 76h, 7Ah, 56h, 15h
.rodata:00000000000021E0 db 7Ah, 60h, 65h, 56h, 5Ch
.rodata:00000000000021E0 \_rodata ends
.rodata:00000000000021E0

##### Assistant:

好的。我先把你给出的 .rodata 中 byte_21A0 的内容按 C 数组格式化出来（直接可拷入之前的反混淆代码），并说明下一步如何把 loc_1550/`.text` 中的 dq/dd/dw 常量按你需要的方式提取成字节流并得到 byte_4030 等表。

1. byte_21A0 的 C 数组（根据你贴的 .rodata 原样转换）

```c
/* 来源：.rodata:00000000000021A0  共 69 字节 */
static const unsigned char byte_21A0[69] = {
    0xb4, 0x20, 0x95, 0x44, 0x0c, 0x4e, 0x37, 0x07, 0x84, 0xfb, 0xfb,
    0x72, 0x84, 0x1a, 0xd0, 0xa3, 0x1a, 0x5c, 0x42, 0x91, 0x38,
    0xe8, 0x4b, 0x61, 0x15, 0x1a, 0x00, 0x51, 0x38, 0xc2, 0x79, 0x1f,
    0x6c, 0xd1, 0xf1, 0x22, 0x71, 0xde, 0xcb, 0xd3, 0x2f, 0x3c,
    0x8b, 0x9f, 0x61, 0x00, 0x00, 0x00, 0x4c, 0x4b, 0x14, 0x71, 0x7a, 0x64,
    0x57, 0x57, 0x65, 0x5c, 0x7a, 0x14, 0x76, 0x7a, 0x56, 0x15,
    0x7a, 0x60, 0x65, 0x56, 0x5c
};
```

（我按你提供的行顺序把所有 db/dup 展开并按顺序列出来，共 69 字节，索引 0..68）

2. 下一步：如何得到 embedded_src / byte_4030 等

- 根据 loc_1550 的反汇编，初始化逻辑是：
  - lea rcx, [rip + imm] -> rcx 指向某处数据源；
  - lea rsi, [rip + imm] -> rsi 指向 0x4030（byte_4030）；
  - 循环 0..0x14（21 字节）： al = byte [rcx + rdx] ^ 0x25; byte [rsi + rdx] = al;
  - 因此 byte_4030[0..20] = embedded_src[0..20] ^ 0x25。
- embedded_src 的原始字节在可执行文件中静态存放（可能在 rodata 或 .text 的数据段），你需要把那段数据提取出来并按小端展开（如果它在 .text 中以 dq/dd/dw 指令形式列出，需要把这些常量按小端拆成字节）。

我之前给了两个工具脚本：

- decrypt_loc1550.py —— 把二进制中 0x1550 开始的 339 字节按 sub_16B0 的 key (0x42 + offset) 解密（如果你愿意也可直接用 gdb dump 已解密内存）。
- extract_embedded.py —— 从包含 dq/dd/dw 的汇编文本里解析出常量并按小端展开为字节流，并能对结果做两种可选处理：
  - --decrypt-loc1550：按 key=(0x42+offset) 对字节流逐字节异或（用于先解密 loc_1550 段的情况）；
  - --take N --xor-byte 0x25：取前 N 字节再对每字节 xor 0x25（用于直接得到 byte_4030 的最终值）。

推荐步骤（最稳妥）
A) 如果你能在本地运行脚本：

1. 把你在消息里给出的 .text 那段包含 dq/dd/dw 的文本保存为 asm.txt（就是你之前贴的 .text:0000155E 开头那段）。
2. 运行：
   python3 extract_embedded.py asm.txt -o embedded.c -n embedded_src
   这会把汇编里 dq/dd/dw 的常量按小端顺序拼成 embedded_src 的字节数组（整段）。
3. 然后得到 byte_4030（程序最终写入 .bss 的内容）：
   python3 extract_embedded.py asm.txt -o byte_4030.c -n byte_4030 --take 21 --xor-byte 0x25
   （这里直接从 parsed embedded 数据取前 21 字节，再对每字节 xor 0x25，得到最终写入 byte_4030 的 21 字节）
4. 把得到的 embedded.c / byte_4030.c 拷入你之前的反混淆 C 代码（用作常量表）。

B) 如果你更愿意从可执行文件直接提取（推荐当 loc_1550 是“加密态”时）：

1. 运行 decrypt_loc1550.py（我之前给的脚本）：
   python3 decrypt_loc1550.py ./prog
   它会读取 ELF，把 VA=0x1550 对应的文件偏移处读取 339 字节并对每字节 xor (0x42 + offset)，得到解密后的 bytes 存为 /tmp/loc1550_decrypted.bin，并尝试反汇编结果。
2. 在解密后的二进制里找到 embedded_src 的起始（你可以用脚本或手动查看反汇编结果中 lea rcx 所指的地址，或者在 decrypt_loc1550.py 的反汇编中直接查找），然后把相应区域（长度至少 21）导出来并对前 21 字节 xor 0x25 得到 byte_4030。
3. 或者直接把 /tmp/loc1550_decrypted.bin 当作输入给 extract_embedded.py（修改脚本让它支持从 raw bin 解析），或者用简单 Python 把 offset 开始 21 字节取出并 xor 0x25。

3) 我可以帮你做的具体事情（你选其一回复我）

- 你把包含 dq/dd/dw 的那块原始文本贴上来（整段），我直接用脚本把 embedded_src 和 byte_4030 算出来并把 C 数组贴回来；或者
- 你把可执行文件（或用 gdb dump 出来的 /tmp/loc1550.bin）发上来或把 hexdump 贴上，我帮你做 decrypt_loc1550.py 的运行并把解密后数据、反汇编、以及最终的 byte_4030/embedded_src 数组直接给你；或者
- 你希望我现在直接把你之前贴出的 .text 中 dq 列表按小端展开并算出 byte_4030（如果那段 dq 就是 embedded_src），我也可以直接在这里完成（只要确认你要我用你之前贴出的 dq 区域作为源）。

如果你要我现在直接把那个在 .text 中的 dq 列表按小端展开并生成 byte_4030，请确认“使用你之前给出的 .text 那段 dq/dq 列表作为源（我就用它）”，我会把展开后的 embedded_src 全字节流和对前 21 字节 xor 0x25 后的 byte_4030 字节数组直接贴给你。

##### User:

我现在已知byte_4030和byte_21A0 如何还原得到flag

##### Assistant:

思路总结（简短）

- 在 sub_1D80 中，程序先构造一个 45 字节的“期望值”序列 expected[0..44]，算法只依赖两个全局表：byte_4030 和 byte_21A0（你已知）。
- 然后把 expected 用 sub_1CA0 编码成“每字节两字符”的表示，并把用户输入也用同样编码后 strcmp。由于编码对每个字节是可逆的一一映射（在给定 byte_4030 的情况下），编码相等当且仅当原始字节逐字相等。因此正确的 flag 就是 expected 的那 45 字节（作为原始字节串）。
- 所以任务就是按 sub_1D80 的规则重构 expected，然后把它以可读格式（ASCII/hex）输出即可。

下面给出一个 Python 脚本，按反编译里的精确运算重构 expected，并打印出 hex 与尽可能的 ASCII 表示（如果是可打印字符则直接显示，否则显示 \xHH）。你只需把已知的 byte_4030 和 byte_21A0 数组填入脚本并运行即可。

脚本（直接可运行）：

```python
#!/usr/bin/env python3
# reconstruct_flag.py
# 填入你已知的 byte_4030 和 byte_21A0 数组（十六进制字节列表）

from typing import List

def rol1(v: int, n: int) -> int:
    n &= 7
    return ((v << n) | (v >> (8 - n))) & 0xFF

def ror1(v: int, n: int) -> int:
    n &= 7
    return ((v >> n) | ((v << (8 - n)) & 0xFF)) & 0xFF

def build_expected(byte_4030: List[int], byte_21A0: List[int]) -> bytes:
    keylen = len(byte_4030)
    if len(byte_21A0) < 45:
        raise ValueError("byte_21A0 must have at least 45 bytes")
    expected = bytearray(45)
    prev = 0xB4  # 初始 prev 值（来自反编译）
    for i in range(45):
        k = byte_4030[i % keylen]
        v = prev ^ k ^ 0x3C
        rotated = rol1(v, (i & 3) + 1)
        out = rotated ^ 0xA5
        expected[i] = out
        prev = byte_21A0[i]
    return bytes(expected)

def pretty_bytes(b: bytes) -> str:
    # 尝试以可打印字符显示，否则用 \xHH
    out = []
    for c in b:
        if 32 <= c <= 126:
            out.append(chr(c))
        else:
            out.append("\\x%02x" % c)
    return "".join(out)

if __name__ == "__main__":
    # TODO: 用你实际的 byte_4030 和 byte_21A0 填充下面两行
    byte_4030 = [
        # 示例占位，请用实际值替换，例如: 0x12,0x34,...
    ]
    byte_21A0 = [
        # 例如你贴出的 69 字节：0xb4,0x20,0x95,0x44,...
    ]

    if not byte_4030 or not byte_21A0:
        print("请在脚本中填入 byte_4030 与 byte_21A0 数组后再运行")
        raise SystemExit(1)

    expected = build_expected(byte_4030, byte_21A0)
    print("Expected (45 bytes) hex:")
    print(" ".join(f"{c:02x}" for c in expected))
    print("Expected as possible ASCII:")
    print(pretty_bytes(expected))
```

如何使用

1. 把你已知的 byte_4030（比如 48 字节）按 0xNN 列表填入脚本中的 byte_4030。
2. 把你已知的 byte_21A0（你之前贴出那 69 字节）填入 byte_21A0 列表。
3. 运行脚本： python3 reconstruct_flag.py
4. 输出的 expected 即为正确的 flag（如果是可见 ASCII，会直接以字符串形式显示；否则也会有 hex 表示）。

可选验证（若你愿意）

- 我可以再给一个验证函数，把 expected 用反编译的 sub_1CA0 编码并跟用同样算法对 expected 编码的结果比对，或你可以把脚本扩展为把 expected 再编码回去计算 s1，然后用 sub_1CA0 对你输入的 flag 编码来验证一致性。

如果你把 byte_4030 与 byte_21A0 的具体十六进制字节列表贴上来，我现在可以直接替你跑脚本并把恢复到的 flag 字符串贴回给你。

##### User:

检查前面的过程，你确定给出的就是flag吗

##### Assistant:

短答：是的——按 sub_1D80 的逻辑重建出来的 45 字节序列就是程序期望的“原始 flag”字节串。下面把原因、要注意的边界情况和验证步骤都说清楚，方便你确认并实际验证。

为什么重建出的 expected 就是 flag（逻辑证明）

- sub_1D80 的核心步骤：
  1. 用 byte_21A0 和 byte_4030 构造 expected[45]（你已有两个表，算法在之前给出的脚本中实现）。
  2. sub_1CA0 把 expected（长度 45）编码成一串 ASCII 字符（每字节输出两个字符，映射为 "0123456789abcd"），记为 s1。
  3. sub_1CA0 用同样算法把用户输入的 byte_4060 编码成 s2。
  4. sub_1D80 返回 strcmp(s1, s2) == 0 的结果（即 s1 与 s2 完全相等）。
- 因为 sub_1CA0 对每个输入字节做的是确定性的一一映射（对给定位置和给定 byte_4030 的情况下，输入 byte -> 两个字符 输出是可逆且确定的），所以 s1 == s2 当且仅当用户输入的原始字节序列和 expected 完全相同（包括长度）。
- 在 main 中，程序最终的判断条件是：如果 sub_1D80 或 sub_17E0 任一为真，则输出 "Correct!"。因此通过 sub_1D80 就足够了。

需要注意的边界/实际操作问题

- 长度必须一致：expected 的长度是 45 字节，用户输入必须恰好为 45 个字节（fgets 会读到换行并去掉，所以上交互时要确保没有多余的换行被算入）。
- 字节可打印性：如果 expected 含有 '\0' 或其他不可见字节，直接在交互式终端用键盘输入会很难做到（终端无法输入 NUL 字节）。大多数这种题目会保证 expected 是可打印 ASCII，但如果不是，你需要通过管道/文件传入 raw bytes。
- 子检查 sub_17E0（虚拟机）是额外的一条校验路径，并不影响 sub_1D80 的结论；你若只想通过验证，满足 sub_1D80 足够。

如何验证重建是正确的（可重复操作）

1. 用之前给你的 reconstruct_flag.py（或我给的 Python 脚本）把 expected 生成出来。脚本输出两种形式：十六进制和尽可能的 ASCII（printable）。
2. 自检：把 expected 再用 sub_1CA0 的实现编码一次，比较是否与脚本里生成的 s1 一致（脚本里也可加上这一步做双重确认）。
3. 在可执行程序上验证：
   - 如果 expected 由可打印字符组成，可以直接：
     printf '%s' "THE_45_BYTE_FLAG" | ./prog
     或者：
     echo -n "THE_45_BYTE_FLAG" | ./prog
     程序应输出 Correct!
   - 如果 expected 含非打印字符或 NUL，使用 Python/二进制文件传入，例如：
     python3 -c 'import sys; sys.stdout.buffer.write(bytes.fromhex("...45-bytes-hex..."))' | ./prog
     或者把 expected 写入一个文件并用 ./prog < flag.bin
4. 额外可选：你也可以把脚本生成的 encoded s1（sub_1CA0 的输出）与程序内部对输入的编码输出比较——如果你 modify 程序或在调试器中 dump s2，可直接比对。

总结与结论

- 从逻辑上看：sub_1D80 构造的 expected（45 字节）就是需要输入的“flag”（程序以原始字节串为输入，不是 hex 编码的字符串）。所以你用脚本计算出的 expected 就是 flag（前提是你把 byte_4030 与 byte_21A0 填入脚本是正确的）。
- 如果你把 byte_4030 和 byte_21A0 的确切字节贴上来，我可以直接运行脚本并把最终的 45 字节以可打印字符串和 hex 格式返回给你；并给出用于在程序上验证的具体命令行（适当处理非打印字节）。

要不要现在把你实际的 byte_4030 内容贴上（或让我直接替你运行并返回最终的 45 字节）？

##### User:

static const unsigned char byte_4030[21] = {
0x44, 0xbd, 0x3f, 0x89, 0xb1, 0x38, 0x8c, 0xb3, 0x35, 0x45, 0xbe, 0x0b, 0x64, 0x77, 0x4a, 0xf9,
0xa5, 0x44, 0x32, 0x50, 0x4e
};
