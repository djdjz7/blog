---
title: 光学 期中复习
time: 2025-11-03
tags: ['笔记', '光学']
---

😇

---

## 几何光学

### 惠更斯原理

- 波前上的每一点都可以看作一个新扰动源，向周围激发出球面的次波
- 下一时刻的波前是大量次波面的公共切面（包络面）
- 如果传播的波具有频率 $\nu$，并且以速度 $v$ 穿过介质，则次波具有相同的频率和速度
- 缺点：没有干涉的概念

### 费马原理

光线沿光程为平稳值的路径传播

$$
\delta \int_P^Q n(\vec{r}) \mathrm{d} s = 0
$$

### 成像公式

#### 球面折射成像

$$
\frac{n}{s} + \frac{n'}{s'} = \frac{n'-n}{r}
$$

#### 薄透镜

$$
\frac{1}{f} = (n-1) \left( \frac{1}{r_1} - \frac{1}{r_2} \right)
$$

#### 高斯透镜公式

$$
\frac{1}{s} + \frac{1}{s'} = \frac{1}{f}
$$

#### 牛顿公式

$$
x_i x_o = f^2
$$

#### 放大率

$$
\begin{aligned}
M_T &\equiv \frac{y_i}{y_o} = -\frac{s_i}{s_o} = -\frac{x_i}{f} = -\frac{f}{x_o} \\
M_L &\equiv \frac{\mathrm{d} x_i}{\mathrm{d} x_o} = -\frac{f^2}{x_o^2} = - M_T^2
\end{aligned}
$$

#### 密接透镜组

$$
\frac{1}{f} = \frac{1}{f_1} + \frac{1}{f_2}
$$

#### 球面反射镜

$$
\frac{1}{s} + \frac{1}{s'} = -\frac{2}{r}
$$

$$
f = -\frac{r}{2}
$$

:::info 反射镜的符号约定

- 物、像在左侧为正，右侧为负（与透镜相反）
- 球心在右侧为正，左侧为负（与透镜相同）
- 貌似和正常的符号约定是反的，懒得理解
  :::

### 光阑与光瞳

- 孔径光阑：限制到达光的数量
- 视场光阑：限制成像的范围
- 光瞳：视场光阑的像

### 相对孔径与光圈数

$$
\begin{aligned}
\text{Energy} & \propto D^2 \\
\text{Energy} & \propto \frac{1}{\text{Size of image}} \\
\text{Size of image} & \propto y_i^2 \propto f^2 \\
\text{Because} \quad \frac{y_i}{y_o} &= M_T = - \frac{f}{x_o} \\
\text{相对孔径} &= \frac{D}{f} \\
f/\# & \equiv \frac{f}{D}
\end{aligned}
$$

光圈数越小，越多光到达

### 光学仪器

#### 屈光度

$$
D = \frac{1}{f \, \text{(m)}}
$$

#### 散光

视网膜不规则曲率

#### 角度放大率

$$
M = \frac{\omega'}{\omega}
$$

目视仪器放大率：明视距离下有仪器辅助时和裸眼观察时视网膜像的视角之比

#### 数值孔径

$$
\text{NA} = n_i \sin \theta_\text{max}
$$

$$
\text{放大率} = \frac{\mathrm{NA}_\text{image}}{\mathrm{NA}_\text{object}}
$$

#### 景深

对焦平面外，可接受的，有较好对焦效果的距离

#### 色散棱镜

最小偏转角：棱镜内光线平行底面

#### 光纤的数值孔径与光圈

$$
f/\# = \frac{1}{2 \, \text{NA}}
$$

### 齐明点

阿贝正弦条件

$$
n y \sin u = n' y' \sin u'
$$

齐明点：在光轴上已消除球差且满足阿贝正弦条件的共轭点

齐明点附近的傍轴小物可以宽光束严格成像

### 厚透镜

- 主平面：平行于光轴的入射光线与它们的出射光线交点构成的平面
- 主点：主平面与光轴的交点
- 光心：所有出射方向平行于入射方向的光线穿过的同一个点
- 节点：穿过光心的光线发生横向移动而方向不变，入射光线和出射光线的延长线与光轴的交点称为节点。当透镜两侧是同一介质时节点与主点重合
- 基点：两个焦点 + 两个主点 + 两个节点

## 矩阵光学

用 $(n \alpha, y)$ 描述光线

### 折射矩阵

$$
\begin{aligned}
  \mathbf{R} &=
    \begin{bmatrix}
    1 & -D \\
    0 & 1
    \end{bmatrix} \\

  \text{where} \quad D &= \frac{n_t - n_i}{R}
\end{aligned}
$$

### 传输矩阵

$$
\mathbf{T} =
\begin{bmatrix}
1 & 0 \\
\frac{d_{21}}{n} & 1
\end{bmatrix}
$$

### 反射矩阵

$$
\mathbf{M} =
\begin{bmatrix}
-1 & -\frac{2n}{R} \\
0 & 1
\end{bmatrix}
$$

### 透镜

$$
\mathbf{A} =
\begin{bmatrix}
-1 & -\frac{1}{f} \\
0 & 1
\end{bmatrix}
$$

## 光的电磁理论

### 麦克斯韦方程组

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{B} &= \mu \sigma \mathbf{E} + \mu \varepsilon \frac{\partial \mathbf{E}}{\partial t} \\
\\
\mathbf{D} &= \varepsilon \mathbf{E} \\
\mathbf{H} &= \frac{1}{\mu} \mathbf{B} \\
\mathbf{J} &= \sigma \mathbf{E}
\end{aligned}
$$

### 矢量算符

$$
\nabla \equiv \left( \frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z} \right)
$$

拉普拉斯算子

$$
\nabla^2 f \equiv (\nabla \cdot \nabla) f = \left( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} \right) f
$$

作用于矢量函数

$$
\nabla^2 \vec{F} \equiv (\nabla^2 F_x, \nabla^2 F_y, \nabla^2 F_z)
$$

$$
\nabla \times (\nabla \times \vec{F}) = \nabla (\nabla \cdot \vec{F}) - \nabla^2 \vec{F}
$$

### 电磁波方程

$$
v = \frac{1}{\sqrt{\mu \varepsilon}} = \frac{c}{n}
$$

$$
c = \frac{1}{\sqrt{\mu_0 \varepsilon_0}}
$$

$$
c B_0 = E_0
$$

同步振动

### 能量

真空中磁场和电场携带能量相等

坡印亭矢量（能流密度）

$$
\mathbf{S} = \mathbf{E} \times \mathbf{H}
$$

真空中

$$
\mathbf{S} = c^2 \varepsilon_0 (\mathbf{E} \times \mathbf{B})
$$

:::info 能流密度
能流密度：单位面积单位时间内通过的能量

$$
\text{能流密度} = \text{能量密度} \times \text{能量流动速度}
$$

:::

辐照度（光强）：能流密度对时间取平均。对线性、均匀、各向同性的电介质

$$
I = \frac{1}{2} c n \varepsilon_0 E_0^2
$$

### 辐射压强

等于电磁波的能量密度

完全反射

$$
\langle P \rangle_T = 2 \frac{\langle S \rangle_T}{c}
$$

### 光子

$$
\begin{aligned}
E &= h \nu \\
p &= \frac{h \nu}{c} = \frac{h}{\lambda}
\end{aligned}
$$

## 波动光学基础

::: info 为什么只考虑电场
对运动的电荷，只要速度远小于 $c$，磁场对电荷的作用力远小于电场对电荷的作用力
:::

- 波矢 $\vec{k}$
- 波数 $1/\lambda$

### 复振幅

$$
\tilde{U}(P) = A(P) e^{i \varphi(P)}
$$

### 常见波

平面波

$$
\tilde{U}(\vec{r}) = A e^{i \vec{k} \cdot \vec{r}}
$$

球面波

$$
\tilde{U}(r) = \frac{a}{r} e^{i k r}
$$

柱面波

$$
\tilde{U}(r) = \frac{b}{\sqrt{r}} e^{i k r}
$$

### 相速

某个固定相位条件的传播速度/波的轮廓的传播速度

对平面简谐波，等于 $v = \frac{\omega}{k}$

### 相对光强

相同介质

$$
I = \left| \tilde{U}(P) \right|^2 = \tilde{U}(P) \tilde{U}^*(P) = A^2(P)
$$

### 波前函数

复振幅在面上的值

### 傍轴球面波近似

泰勒展开 $r$ 到二阶，分别考虑傍轴和远场

$$
r = \sqrt{(x - x_0)^2 + (y - y_0)^2 + z^2} \approx z + \frac{(x - x_0)^2 + (y - y_0)^2}{2z}
$$

- 傍轴 $z^2 \gg \rho^2$, $z^2 \gg \rho_0^2$
- 远场 $z \gg \frac{\rho^2}{\lambda}$, $z \gg \frac{\rho_0^2}{\lambda}$

一般傍轴距离大于远场距离

## 界面电磁理论

利用电场强度切线分量跨界面连续，证明反射、折射定律

### 菲涅尔公式

$$
\begin{aligned}
r_\perp &= \frac{n_i \cos \theta_i - n_t \cos \theta_t}{n_i \cos \theta_i + n_t \cos \theta_t} = - \frac{\sin (\theta_i - \theta_t)}{\sin (\theta_i + \theta_t)} \\
r_\parallel &= \frac{n_t \cos \theta_i - n_i \cos \theta_t}{n_t \cos \theta_i + n_i \cos \theta_t} = + \frac{\tan(\theta_i - \theta_t)}{\tan(\theta_i + \theta_t)} \\
t_\perp &= \frac{2 n_i \cos \theta_i}{n_i \cos \theta_i + n_t \cos \theta_t} \\
t_\parallel &= \frac{2 n_i \cos \theta_i}{n_t \cos \theta_i + n_i \cos \theta_t}
\end{aligned}
$$

适用条件

- 绝缘介质（电介质）
- 各向同性介质
- 线性介质
- 光学频段，磁导率 $\mu \approx \mu_0$

### 布儒斯特角

$$
\tan \theta_B = \frac{n_2}{n_1}
$$

### 光强反射率/透射率

$$
\begin{aligned}
R &= r^2 \\
T &= \frac{n_t}{n_i} t^2
\end{aligned}
$$

### 光功率反射率/透射率

$$
\begin{aligned}
\mathfrak{R} &= R \\
\mathfrak{T} &= \frac{n_t \cos \theta_t}{n_i \cos \theta_i} t^2 = \frac{\cos \theta_t}{\cos \theta_i} T
\end{aligned}
$$

$$
\mathfrak{R} + \mathfrak{T} = 1
$$

### 半波损

几何光程需要加半个波长

### 隐失波

全反射时，折射光波在界面处产生的指数衰减波

$$
k = \frac{2 \pi}{\lambda} \sqrt{\left(n_i \sin \theta_i \right)^2 - n_t^2}
$$

## 干涉

### 干涉条件

- 频率相同
- 振动方向不正交
- 相位差稳定

### 叠加光强

$$
\begin{aligned}
I &= I_1 + I_2 \quad && \text{非相干叠加} \\
I &= I_1 + I_2 + 2 \sqrt{I_1 I_2} \cos \delta \quad && \text{相干叠加}
\end{aligned}
$$

### 衬比度

$$
\gamma = \frac{I_\text{max} - I_\text{min}}{I_\text{max} + I_\text{min}} = \frac{2 \sqrt{I_1 I_2}}{I_1 + I_2}
$$

改写相干叠加光强公式

$$
I = (I_1 + I_2) \left( 1 + \gamma \cos \delta \right)
$$

### 点光源/平行光束的干涉

求解复振幅，计算相位差

自然光可以分解为 $s$ 光和 $p$ 光，并且有 $I_s = I_p = \frac{1}{2} I_0$

两列**光强相同**，夹角为 $\alpha$ 的平行自然光束干涉，衬比度为

$$
\gamma = \frac{1}{2} \left( 1 + \cos \alpha \right)
$$

### 空间频率

$$
f = \frac{1}{\Delta x}
$$

### 杨氏双缝

$$
\Delta x = \frac{\lambda L}{d}
$$
