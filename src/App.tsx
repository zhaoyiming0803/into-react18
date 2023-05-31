import React, { createElement, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

interface AppProps {
  a: number
  b: string
}

function App (props: AppProps) {
  const { a, b } = props

  const [title, setTitle] = useState('title')
  
  const [content, setContent] = useState('content')

  const [computedProps] = useState(a + '' + b)

  const setValue = () => {
    const value = Math.random()
    setTitle('title' + value)
    setContent('content' + value)
  }
  
  return <div onClick={setValue}>
    <p>
      <h1>{title}</h1>
      <span>{content}</span>
    </p>
    <section>{computedProps}</section>
  </div>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App a={1} b="2" />)
console.log('root1: ', root1)
// setTimeout(() => {
//   debugger
//   root1.unmount()
// })

// const root2: Root = createRoot(document.querySelector('#root2'))
// root2.render(createElement('div', {
//   onClick: () => console.log('Like')
// }, 'Like'))

