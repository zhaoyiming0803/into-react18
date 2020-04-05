import * as React from "react";

interface State {
  component: null | typeof React.Component;
}

export default function ReactAsyncLoader(importComponent: Function) {
  class AsyncComponent<P> extends React.Component {
    state: State;

    constructor(props: P) {
      super(props);
      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component,
      });
    }

    render() {
      const C: typeof React.Component = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
