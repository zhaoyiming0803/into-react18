# Into React18

React 的核心可以用 UI = fn(state) 来表示：

``` javascript
const state = reconcile(state)
const UI = commit(state)
```

fn 可以分为如下一个部分：

- Scheduler（调度器）：排序优先级，让优先级高的任务先进行 reconcile
- Reconciler（协调器）：找出哪些节点发生了改变，并打上不同的 Flags / Tag
- Renderer（渲染器）：将 Reconciler 中打好标签的节点渲染到视图上

