import * as React from "react";

interface State {
  component: null | typeof React.Component;
}

export default function ReactAsyncLoader(importComponent: Function) {
  class AsyncComponent<P> extends React.Component {
    public state: State;

    constructor(props: P) {
      super(props);
      this.state = {
        component: null,
      };
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component,
      });
    }

    public render() {
      const C: typeof React.Component = this.state.component;
      // tslint:disable-next-line: strict-boolean-expressions
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
