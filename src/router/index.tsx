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
const Coupon = ReactAsyncLoader(() => import("../pages/Coupon"));
const SetTimeoutDemo = ReactAsyncLoader(() =>
  import("../pages/SetTimeoutDemo")
);
const HandleValueByHooks = ReactAsyncLoader(() =>
  import("../pages/HandleValueByHooks")
);
const TestAuthingGuard = ReactAsyncLoader(() => import('../pages/TestAuthingGuard'))

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
        <Route exact path="/coupon">
          <Coupon />
        </Route>
        <Route exact path="/setTimeoutDemo">
          <SetTimeoutDemo />
        </Route>
        <Route exact path="/handleValueByHooks">
          <HandleValueByHooks></HandleValueByHooks>
        </Route>
        <Route exact path="/test-authing-guard">
          <TestAuthingGuard></TestAuthingGuard>
        </Route>
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
