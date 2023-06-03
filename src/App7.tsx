// @ts-nocheck

import React from 'react'

import { createRoot, Root } from 'react-dom/client'

import ReactDOM from 'react-dom'

let workInProgressHook = null

let isMount = true

const fiber = {
  memorizedState: null,
  stateNode: App
}

const Dispatcher = (function () {
  function useState (initialState) {
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
      let update = hook.queue.pending.next

      do {
        const action = update.action
        newState = typeof action === 'function' ? action(newState) : action
        udpate = update.next
      } while (update !== hook.queue.pending.next)

      hook.queue.pending = null
    }

    hook.memorizedState = newState
    // --- udpate end

    return [hook.memorizedState, dispatchSetState.bind(null, hook.queue)]
  }

  function mountState () {
    const hook = {
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

  function dispatchSetState (queue, action) {
    const update = {
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


let timer = null

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
