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
      clearTimeout(timer)
      timer = null
    }, 2000)
    return () => {
      clearTimeout(timer)
      timer = null
    }
  })

  console.log('app.tsx re-render')

  return <ThemeContext.Provider value={theme}>
    <RouterComponent></RouterComponent>
  </ThemeContext.Provider>
}
