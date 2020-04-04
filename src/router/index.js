import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
// import Loadable from "react-loadable";
import ReactAsyncLoader from "@/components/ReactAsyncLoader";

// function Loading() {
//   return <div>Loading</div>;
// }

// const Home = Loadable({
//   loader: () => import("@/pages/Home"),
//   loading: Loading,
// });

// const About = Loadable({
//   loader: () => import("@/pages/About"),
//   loading: Loading,
// });

// const Dashboard = Loadable({
//   loader: () => import("@/pages/Dashboard"),
//   loading: Loading,
// });

const Home = ReactAsyncLoader(() => import("@/pages/Home"));
const About = ReactAsyncLoader(() => import("@/pages/About"));
const Dashboard = ReactAsyncLoader(() => import("@/pages/Dashboard"));

export default function BasicExample() {
  return (
    <Router basename="/pure-react-project-with-webpack">
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
