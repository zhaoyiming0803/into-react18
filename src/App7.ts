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
    let hook = null

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

      do {
        const action = update.action
        newState = typeof action === 'function' ? action(newState) : action
        update = update.next as Update
      } while (update !== hook.queue.pending.next)

      hook.queue.pending = null
    }

    hook.memorizedState = newState
    // --- udpate end

    return [hook.memorizedState, dispatchSetState.bind(null, hook.queue)]
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
      update.next = queue.pending.next
      queue.pending.next = update
    }

    queue.pending = update

    isMount = false
    workInProgressHook = fiber.memorizedState
    
    render()
  }

  return {
    useState
  }
})()


function App () {
  const [count, setCount] = Dispatcher.useState<number>(100)

  const [random, setRandom] = Dispatcher.useState<number>(200)

  console.log('count: ', count, 'random: ', random)

  const update = () => {
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
    window.app = fiber.stateNode()
  })
}

render()
