import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import ReactAsyncLoader from "@/components/ReactAsyncLoader";

const Home = ReactAsyncLoader(() => import("../pages/Home"));

export default function RouterComponent() {
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
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
