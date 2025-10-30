---
title: 半导体器件原理 Summary as of 1.8
time: 2025-10-30
tags: ['笔记', '集成电路器件原理']
---

Formulas and concepts till 1.8 of "Principle of Semiconductor Devices" course. Mainly formulas though.

---

## Some Important Values

For intrinsic silicon at room temperature:

$$
kT \approx 0.026 \, \text{eV}
$$

$$
E_g \approx 1.1 \, \text{eV}
$$

$$
n_i \approx 1.45 \times 10^{10} \, \text{cm}^{-3} \sim 10^{10} \, \text{cm}^{-3}
$$

$$
V_\text{ON} \approx 0.7 \, \text{V}
$$

## Carrier Concentration

### Fermi-Dirac Distribution

$$
\begin{aligned}
f_e(E) &= \frac{1}{1 + e^{\frac{E - E_F}{kT}}} \\
f_h(E) &= \frac{1}{1 + e^{\frac{E_F - E}{kT}}}
\end{aligned}
$$

### Boltzmann Approximation

$kT \approx 0.026 \, \text{eV}$, when $T = 25 \, {}^\circ \text{C}$

For electrons, when $E - E_F \gg kT$:

$$
f_e(E) \approx e^{-\frac{E - E_F}{kT}}
$$

For holes, when $E_F - E \gg kT$:

$$
f_h(E) \approx e^{-\frac{E_F - E}{kT}}
$$

### Equivalent DoS

$$
N_C, \, N_V \propto T^{\frac{3}{2}}
$$

In intrinsic semiconductor:

$$
n_i = N_C e^{-\frac{E_C - E_F}{kT}}
$$

$$
p_i = N_V e^{-\frac{E_F - E_V}{kT}}
$$

$$
n_i = p_i
$$

$$
n_i^2 = np = N_C N_V e^{-\frac{E_g}{kT}}
$$

## Doping

- N-type: Donor dopants, $n \approx N_D$, $E_C > E_D$
  - $$
    E_C - E_F = kT \ln \frac{N_C}{N_D}
    $$
  - $$
      E_F - E_i = kT \ln \frac{n}{n_i}
    $$

- P-type: Acceptor dopants, $p \approx N_A$, $E_A > E_V$
  - $$
    E_F - E_V = kT \ln \frac{N_V}{N_A}
    $$
  - $$
      E_i - E_F = kT \ln \frac{p}{n_i}
    $$

## PN Junction Formation

### Built-in Potential

$$
\begin{aligned}
q V_\text{bi} &= E_{ip} - E_{in} \\
&= E_{ip} - E_{F} + (E_{F} - E_{in}) \\
&= kT \ln \frac{N_A N_D}{n_i^2} \\
\Rightarrow V_\text{bi} &= \frac{kT}{q} \ln \frac{N_A N_D}{n_i^2}
\end{aligned}
$$

### Depletion Region Width:

$$
N_A x_p = N_D x_n
$$

$$
\begin{aligned}
E_\text{max} &= -\frac{q}{\varepsilon_\text{Si}}N_A x_p \\
&= -\frac{q}{\varepsilon_\text{Si}}N_D x_n
\end{aligned}
$$

$$
V_\text{bi} = \frac{q N_A x_p^2}{2 \varepsilon_\text{Si}} + \frac{q N_D x_n^2}{2 \varepsilon_\text{Si}}
$$

$$
\begin{cases}
x_p = \sqrt{\frac{2\varepsilon_\text{Si} V_\text{bi}}{q} \cdot \frac{N_D}{N_A (N_A + N_D)}} \\
x_n = \sqrt{\frac{2\varepsilon_\text{Si} V_\text{bi}}{q} \cdot \frac{N_A}{N_D (N_A + N_D)}}
\end{cases}
$$

$$
\Rightarrow x_d = \sqrt{\frac{2 \varepsilon_\text{Si} V_\text{bi}}{q} \left(\frac{1}{N_A} + \frac{1}{N_D}\right)}
$$

## Ideal PN Junction Equation

$$
x_d = \sqrt{\frac{2 \varepsilon_\text{Si} (V_\text{bi} - V_A)}{q} \left(\frac{1}{N_A} + \frac{1}{N_D}\right)}
$$

And the heavily doped side contribution can be neglected.

$$
I_D = I_0 \left(e^{\frac{q V_A}{kT}} - 1\right)
$$

$$
I_0 = q \left(D_n \frac{n_{p0}}{L_n} + D_p \frac{p_{n0}}{L_p}\right)
$$

## Carrier Motions

### Minority & Majority Carriers

- For minority carriers, the diffusion current dominates
- For majority carriers, the drift current dominates

### Short Diode

$W_n < L_p$ and $W_p < L_n$, no recombination in the neutral regions.

Minority carrier distribution is a straight line, (diffusion) current is constant across the junction.

$$
J_{n, \text{diff}} = q D_n \frac{n_{p0}}{W_p}\left(e^{\frac{q V_A}{kT}} - 1\right)
$$

$$
J_{p, \text{diff}} = q D_p \frac{p_{n0}}{W_n}\left(e^{\frac{q V_A}{kT}} - 1\right)
$$

### Long Diode

Recombination happen in the neutral regions.

Recombination increases the current.

## Real PN Junction Characteristics

### Non-ideal Effects

- When $V_A$ is small, **recombination** makes current larger than ideal
- When $V_A$ is large, **high-level injection** causes accumulation of majority carriers near the depletion region, driving them against the current flow
  - Always takes place in the lightly doped side

### Turn-on

Depletion region disappears when $V_A$ is increased beyond $V_\text{bi}$, and the diode becomes a resistor.

### Breakdown

Both mechanisms are somehow related to maximum electric field in the depletion region.

$$
\begin{aligned}
|E_\text{max}| &= \sqrt{\frac{2 q V_\text{bi}}{\varepsilon_\text{Si}} \frac{N_A N_D}{N_A + N_D}} \\
\text{(which happens to)} &= 2 \frac{V_\text{bi}}{x_d}
\end{aligned}
$$

### Temperature Effects

- Both sides behave more like intrinsic semiconductor
- $V_\text{bi}$ and $V_\text{ON}$ decreases

## PN Junction Switching and Model

### Capacitance

- Depletion region capacitance (zero bias/reverse bias)
  $$
  \begin{aligned}
  C_j &= \frac{\varepsilon_\text{Si}}{W_d} \\
    & = \frac{\varepsilon_\text{Si}}{\sqrt{\frac{2 \varepsilon_\text{Si} (V_\text{bi} - V_A)}{q} \left(\frac{1}{N_A} + \frac{1}{N_D}\right)}} \\
    &= \frac{C_{j0}}{\sqrt{1 - \frac{V_A}{V_\text{bi}}}} \\
  \end{aligned}
  $$
- Diffusion capacitance (forward bias)

  $$
  \begin{aligned}
  Q_\text{diff} &= \frac{q}{2} \left( L_n n_{p0} + L_p p_{n0} \right) e^{\frac{q V_A}{kT}} \\
  C_\text{diff} &= \frac{\mathrm{d} Q_\text{diff}}{\mathrm{d} V_A} \\
  &= \frac{q}{kT} \cdot \frac{q}{2} \left( L_n n_{p0} + L_p p_{n0} \right) e^{\frac{q V_A}{kT}} \\
  &= \frac{Q_\text{diff}}{V_\text{th}}
  \end{aligned}
  $$

### Large Signal Model

A parallel combination of a current source, a depletion capacitance, and a diffusion capacitance, then series with a resistance.

$$
\begin{aligned}
I_D &= I_0 \left(e^{\frac{q V_A}{kT}} - 1\right) \quad && \text{(Current Source)} \\
C_j &= \frac{C_{j0}}{\sqrt{1 - \frac{V_A}{V_\text{bi}}}} \quad && \text{(Depletion Capacitance)} \\
C_\text{diff} &= \frac{Q_\text{diff}}{V_\text{th}} \quad && \text{(Diffusion Capacitance)} \\
\end{aligned}
$$


### Small Signal Model

$$
\begin{aligned}
g_d (V_b) &= \left. \frac{\mathrm{d} I_D}{\mathrm{d} V_A} \right|_{V_A = V_b} \\
&= \frac{q}{kT} I_0 e^{\frac{q V_b}{kT}} \\
&\approx \frac{q}{kT} I_D (V_b) \quad \text{(if we drop -1 in } I_D \text{)} \\
&= \frac{I_D (V_b)}{V_\text{th}} \\
\end{aligned}
$$