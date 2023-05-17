import React, { createElement } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  return <>App</>
}

// debugger
const root1: Root = createRoot(document.querySelector('#root1'))
// debugger
root1.render(<App />)

setTimeout(() => {
  debugger
  root1.unmount()
})

// const root2: Root = createRoot(document.querySelector('#root2'))
// root2.render(createElement('div', {
//   onClick: () => console.log('Like')
// }, 'Like'))

