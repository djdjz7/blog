---
title: 数据结构与算法 B Cheatsheet
time: 2025-06-04
tags: ['笔记']
---

## 线性结构

### Shunting Yard

```python
PRECEDENCE = {"+": 0, "-": 0, "*": 1, "/": 1}

def transform(tokens: list[str]):
    result = []
    stack = []
    for t in tokens:
        if t not in "+-*/()":
            result.append(t)
            continue
        if t == '(':
            stack.append(t)
            continue
        if t == ')':
            while stack[-1] != '(':
                result.append(stack.pop())
            stack.pop()
            continue
        while stack and stack[-1] != '(' and PRECEDENCE[stack[-1]] >= PRECEDENCE[t]:
            result.append(stack.pop())
        stack.append(t)
    while stack:
        result.append(stack.pop())
    return result
```

## 树

### 堆

向下调整时注意选择较小的子节点（小顶堆）

## 图

### 最小生成树

#### Prim - 稠密图

初始化 $U$ 集，加入任一节点

循环 $V-1$ 次，每次选择距离 $U$ 中点距离最近的点 $S$ 且 $S \notin U$，将 $S$ 加入 $U$

```python
import heapq

class Vertex:
    def __init__(self, ident):
        self.ident = ident
        self.connected = False
        self.to = [] # [(dist, nbr)]
    def __lt__(self, other):
        return False
    def __repr__(self):
        return f"VERT_{self.ident}"

def prim(verts: list[Vertex]):
    n = len(verts)
    verts[0].connected = True
    pq = verts[0].to.copy()
    total_dist = 0
    heapq.heapify(pq)
    for _ in range(n - 1):
        while pq and pq[0][1].connected:
            heapq.heappop(pq)
        dist, pt = heapq.heappop(pq)
        pt.connected = True
        total_dist += dist
        for ndist, nbr in pt.to:
            if not nbr.connected:
                heapq.heappush(pq, (ndist, nbr))
    return total_dist
```

或者使用邻接矩阵

```python
import heapq

def prim(adj_matrix: list[list[int]]):
    n = len(adj_matrix)
    connected = [False] * n
    connected[0] = True
    pq = [(adj_matrix[0][i], i) for i in range(1, n)]
    total_dist = 0
    heapq.heapify(pq)
    for _ in range(n - 1):
        while pq and connected[pq[0][1]]:
            heapq.heappop(pq)
        dist, pt = heapq.heappop(pq)
        connected[pt] = True
        total_dist += dist
        for i in range(n):
            if connected[i]:
                continue
            heapq.heappush(pq, (adj_matrix[pt][i], i))
    return total_dist
```

#### Kruskal - 稀疏图

将边排序，选择最短边，若两结点未被连接，则连接两点

使用并查集实现

```python
def kruskal(edges: list[tuple[int, int, int]], vert_cnt: int):
    rep = [i for i in range(vert_cnt)]
    def find_root_rep(i):
        if rep[i] == i:
            return i
        rep[i] = find_root_rep(rep[i])
        return rep[i]
    edges.sort()
    total_dist = 0
    for dist, u, v in edges:
        ur = find_root_rep(u)
        vr = find_root_rep(v)
        if ur == vr:
            continue
        total_dist += dist
        rep[ur] = vr
    return total_dist
```

### 最短路

#### Bellman-Ford

至多循环 $n - 1$ 次，每次遍历每条边 `(u, v, delta_dist)`，用 `dist[u] + delta_dist` 尝试更新 `dist[v]`，若第 $n$ 次循环仍能更新，说明存在负权环

朴素实现

```python
def bellman_ford(edges: list[tuple[int, int, int]], vert_cnt: int, src: int, dst: int):
    INF = float("inf")
    dist = [INF] * vert_cnt
    dist[src] = 0
    for _ in range(vert_cnt):
        relaxed = False
        for u, v, delta_dist in edges:
            if dist[u] + delta_dist < dist[v]:
                dist[v] = dist[u] + delta_dist
                relaxed = True
        if not relaxed:
            return dist[dst]
    return None  # negative loop
```

SPFA

```python
from collections import deque

def spfa(edges: list[tuple[int, int, int]], vert_cnt: int, src: int, dst: int):
    graph = [[] for _ in range(vert_cnt)]
    for u, v, w in edges:
        graph[u].append((v, w))
    dist = [float('inf')] * vert_cnt
    dist[src] = 0
    in_queue = [False] * vert_cnt
    count = [0] * vert_cnt

    queue = deque([src])
    in_queue[src] = True

    while queue:
        u = queue.popleft()
        in_queue[u] = False
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    count[v] += 1
                    if count[v] >= vert_cnt:
                        return None  # negative loop
    return dist[dst]
```

#### Dijkstra

将点分为已确定最短路径的点集 $S$ 和未确定最短路径的点集 $U$，从 $U$ 中找出路径长度最短的点 $V$ 加入 $S$，并对 $V$ 的所有出边作松弛操作

稠密图的朴素实现

```python
INF = float("inf")


class Vert:
    def __init__(self):
        self.determined = False
        self.to: list[tuple[Vert, int]] = []
        self.dist = INF


def dijkstra(verts: list[Vert], src: Vert, dst: Vert):
    src.determined = True
    src.dist = 0
    while True:
        min_dist = INF
        min_vert = None
        for v in verts:
            if not v.determined and v.dist < min_dist:
                min_dist = v.dist
                min_vert = v
        if not min_vert:
            return None  # no path found
        if min_vert == dst:
            return min_vert.dist
        min_vert.determined = True
        for nbr, dist in min_vert.to:
            nbr.dist = min(nbr.dist, min_vert.dist + dist)
```

稀疏图的堆优化

```python
import heapq

INF = float("inf")


class Vert:
    def __init__(self):
        self.to: list[tuple[Vert, int]] = []
        self.dist = INF


def dijkstra(verts: list[Vert], src: Vert, dst: Vert):
    src.dist = 0
    pq = [(0, src)]
    while pq:
        dist, v = heapq.heappop(pq)
        if dist > v.dist:  # skip out-dated values
            continue
        if v == dst:
            return dist
        for nbr, w in v.to:
            if dist + w < nbr.dist:
                nbr.dist = dist + w
                heapq.heappush(pq, (nbr.dist, nbr))
    return None  # no path found
```

#### 全源最短路 Floyd

初始化 `dp[0]` 为邻接矩阵

```python
for k in range(1, n + 1):
    for x in range(1, n + 1):
        for y in range(1, n + 1):
            dp[k][x][y] = min(dp[k - 1][x][y], dp[k - 1][x][k] + dp[k - 1][k][y])
```

第一维无作用

```python
for k in range(1, n + 1):
    for x in range(1, n + 1):
        for y in range(1, n + 1):
            dp[x][y] = min(dp[x][y], dp[x][k] + dp[k][y])
```

### 强连通分量 SCC

#### Kosaraju / 2 DFS

进行 DFS，记录回溯时刻的时间，对图反向，从回溯时刻晚的点开始再做 DFS，第二次能访问到的节点属于同一个强连通分量

:::info 证明的直观

- 从任一节点出发，第一次不能到达的节点不属于同一个 SCC
- 原图中的 SCC 在反向图中仍然是 SCC，从其中任一节点出发在第二次 DFS 中可以访问到 SCC 中所有节点
- 为什么第二次 DFS 不会跨越不同的 SCC？
  - 假设有两个 SCC $A, B$ 如此连接 $A \to B$
  - 第一次 DFS 中，只有从 $A$ 中点出发才能到达 $B$，记起点为 $a$
  - $a$ 最早开始，最晚回溯，第二次 DFS 时，仍然会从 $a$ 开始
  - 此时，图已经反向 $A \leftarrow B$，从 $a$ 出发已经不能访问到 $B$
  - 再从 $B$ 中节点出发时，$A$ 中所有节点已经遍历完毕，不能再次访问

:::

构建缩点图后，遍历所有边 $u \to v$，若 $u, v$ 不属于同一个 SCC，则可在两个 SCC 之间建立一条边

#### Torjan[^1]

[^1]: 代码摘自 [OI Wiki](https://oi-wiki.org/graph/scc/#%E5%88%86%E9%87%8F%E6%A0%87%E5%8F%B7%E5%92%8C%E6%8B%93%E6%89%91%E5%BA%8F%E7%9A%84%E5%85%B3%E7%B3%BB)

看不懂

```
TARJAN_SEARCH(int u)
    vis[u]=true
    low[u]=dfn[u]=++dfncnt
    push u to the stack
    for each (u,v) then do
        if v hasn't been searched then
            TARJAN_SEARCH(v) // 搜索
            low[u]=min(low[u],low[v]) // 回溯
        else if v has been in the stack then
            low[u]=min(low[u],dfn[v])
```

```cpp
int dfn[N], low[N], dfncnt, s[N], in_stack[N], tp;
int scc[N], sc;  // 结点 i 所在 SCC 的编号
int sz[N];       // 强连通 i 的大小

void tarjan(int u) {
  low[u] = dfn[u] = ++dfncnt, s[++tp] = u, in_stack[u] = 1;
  for (int i = h[u]; i; i = e[i].nex) {
    const int &v = e[i].t;
    if (!dfn[v]) {
      tarjan(v);
      low[u] = min(low[u], low[v]);
    } else if (in_stack[v]) {
      low[u] = min(low[u], dfn[v]);
    }
  }
  if (dfn[u] == low[u]) {
    ++sc;
    do {
      scc[s[tp]] = sc;
      sz[sc]++;
      in_stack[s[tp]] = 0;
    } while (s[tp--] != u);
  }
}
```

## 通用算法

### 欧拉筛

```python
def euler_sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    primes = []

    for i in range(2, n + 1):
        if is_prime[i]:
            primes.append(i)

        j = 0
        while j < len(primes) and i * primes[j] <= n:
            is_prime[i * primes[j]] = False
            if i % primes[j] == 0:
                break
            j += 1

    return primes
```
