import React, { useEffect, useState } from "react";
import RouterComponent from "./router/index";

import { ThemeContext } from '@/context/ThemeContext'


// export default class App extends React.Component {
//   render() {
//     return <RouterComponent />;
//   }
// }

export default function App () {
  const [theme, setTheme] = useState({
    dark: {
      background: 'dark',
      size: 10
    },
    white: {
      background: 'white',
      size: 20
    }
  })

  // useEffect 如果不加依赖项为空数组，每次 setTimeout 后执行 setTheme，导致组件会会多次重新渲染
  // 其所属子组件也会多次重新渲染
  useEffect(() => {
    let timer = setTimeout(() => {
      setTheme({
        dark: {
          background: 'red',
          size: 10
        },
        white: {
          background: 'red',
          size: 20
        }
      })
    }, 2000)
    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [])

  console.log('app.tsx re-render')

  return <ThemeContext.Provider value={theme}>
    <RouterComponent></RouterComponent>
  </ThemeContext.Provider>
}
