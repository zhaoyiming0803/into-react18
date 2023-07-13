type Action = (key: any) => void

interface Fiber {
  memorizedState: Hook | null
  stateNode: () => { update: () => void }
}

interface Hook {
  queue: Queue
  memorizedState: any
  next?: Hook
}

interface Update {
  action: Action
  next?: Update
}

interface Queue {
  pending?: Update
}


let workInProgressHook: Hook | null = null

let isMount = true

const fiber: Fiber = {
  memorizedState: null,
  stateNode: App
}

const Dispatcher = (function () {
  function useState<T>(initialState: T) {
    let hook: Hook = null

    if (isMount) {
      hook = mountState()
      hook.memorizedState = initialState
    } else {
      hook = updateState()
    }

    let newState = hook.memorizedState

    // --- udpate start
    if (hook.queue.pending) {
      let update: Update = hook.queue.pending.next

      // 这就是执行多次 hook 的 dispatcher，只会取最后一次 set 的值的原因
      do {
        const action = update.action
        newState = typeof action === 'function' ? action(newState) : action
        update = update.next as Update
      } while (update !== hook.queue.pending.next)

      hook.queue.pending = null
    }

    hook.memorizedState = newState
    // --- udpate end

    // return [hook.memorizedState, dispatchSetState.bind(null, hook.queue)]
    return [hook.memorizedState, (action: Action) => dispatchSetState(hook.queue, action)]
  }

  function mountState () {
    const hook: Hook = {
      queue: {
        pending: null
      },
      memorizedState: null,
      next: null
    }

    if (!fiber.memorizedState) {
      fiber.memorizedState = hook
    } else {
      workInProgressHook.next = hook
    }

    workInProgressHook = hook

    return workInProgressHook
  }

  function updateState () {
    let currentHook = workInProgressHook
    workInProgressHook = workInProgressHook.next
    return currentHook
  }

  function dispatchSetState (queue: Queue, action: Action) {
    const update: Update = {
      action,
      next: null
    }

    if (queue.pending === null) {
      update.next = update
    } else {
      // 多次执行 hook 的 dispatcher，即多次重复赋值，如：
      // setStatus(0)
      // setStatus(1)
      // setStatus(2)
      update.next = queue.pending.next
      queue.pending.next = update
    }

    queue.pending = update
    
    render()
  }

  return {
    useState
  }
})()


function App () {
  debugger
  const [count, setCount] = Dispatcher.useState<number>(100)

  const [random, setRandom] = Dispatcher.useState<number>(200)

  console.log('count: ', count, 'random: ', random)

  const update = () => {
    debugger
    setCount(count + 1)
    setRandom(Math.random())
  }

  return {
    update
  }
}


let timer: NodeJS.Timeout = null

function render () {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  // batchedUpdate
  timer = setTimeout(() => {
    // debugger
    window.app = fiber.stateNode()
    isMount = false
    workInProgressHook = fiber.memorizedState
    console.log('workInProgressHook: ', workInProgressHook)
  })
}

render()
