import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/App";
import store from "@/store";

const root = createRoot(document.getElementById("root"))

console.log('root: ', root)

console.log('root.render: ', root.render)
console.log('root.unmount: ', root.unmount)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// root.render(<div>Test App</div>)


// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )
