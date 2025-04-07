---
title: 0 在哪里？
time: 2025-04-07
tags: Rust
---

## `&mut 0` 在哪？

```rs
let p = &mut 0;
```

对于这样的一段代码，`0` 存放在哪里？

首先：

```rs
let a = 0;
```

这样一段代码的 `0` 存放在哪里？

考虑这样一段代码：

```rs
fn main() {
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    let parse_result_1 = input.trim().parse::<i32>();
    let mut input = String::new();
    std::io::stdin().read_line(&mut input).unwrap();
    let parse_result_2 = input.trim().parse::<i32>();
    let stack_guaranteed_1 = parse_result_1.unwrap();
    let where_is_this = 0;
    let stack_guaranteed_2 = parse_result_2.unwrap();
    println!("{:p}", &stack_guaranteed_1);
    println!("{:p}", &where_is_this);
    println!("{:p}", &stack_guaranteed_2);
}
```

我们通过解析输入字符串的方式，绕过编译器可能做出的优化，确保了两个 `stack_guaranteed` 变量一定存储在栈上。

这段代码的执行结果是：

```plaintext
0x16d3adb24
0x16d3adb28 (+4 = sizeof stack_guaranteed_1: i32)
0x16d3adb2c (+4 = sizeof where_is_this: i32)
```

一个未知位置的变量被夹在了两个栈中变量中间，那我们可以认为这个未知位置的变量存放在栈上。

回到开始的问题，考虑这样的一段代码：

```rs
fn main() {
    let stack_var_1 = 0;
    let where_this_points_to = &mut 0;
    let stack_var_2 = 0;
    println!("{:p}", &stack_var_1);
    println!("{:p}", &where_this_points_to);
    println!("{:p}", &stack_var_2);
}
```

运行结果：

```plaintext
0x16b981bfc
0x16b981c00 (+4 = sizeof stack_var_1: i32)
0x16b981c0c (+12 = sizeof (0: i32 + where_this_points_to: usize(size of a pointer)))
```

可以发现，`&mut 0` 指向的位置在两个栈变量之间，可以认为这个 `0` 仍然在栈上。

事实上，无论是 `` `dev` profile [unoptimized + debuginfo] `` 还是 `` `release` profile [optimized] ``，以上事实均成立，也就是说，`&mut 0` 中的 `0` 存放在栈上。

## 其他区域的内存地址大概在哪？

考虑这样的一段代码：

```rs
static STATIC_VALUE: i32 = 0;

fn main() {
    let heap_value = Box::new(0);
    let stack_value = 0;
    println!("{:p}", &STATIC_VALUE);
    println!("{:p}", heap_value);
    println!("{:p}", &stack_value);
}
```

其运行结果为：

```plaintext
0x104f86e60
0x12d605f50
0x16aeb1bfc
```

三者之间存在着很大的差异，也一定程度上验证了上述结论。
