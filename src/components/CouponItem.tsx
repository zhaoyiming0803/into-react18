import * as React from "react";
import { CouponForm } from "@/types/index";

interface State {
  a: string;
  b: number;
}

interface Props {
  coupon: CouponForm;
}

// Tips about lifecycle:
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
export default class CouponItem extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    console.log("props:", this.props);
    this.state = {
      a: "1",
      b: 2,
    };
  }

  componentDidCatch(e: Error) {
    console.log("error: ", e);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return true;
  }

  /**
   * The new static getDerivedStateFromProps lifecycle is invoked
   * after a component is instantiated as well as before it is re-rendered.
   *  It can return an object to update state, or null to indicate
   * that the new props do not require any state updates.
   * @param props
   * @param state
   */
  static getDerivedStateFromProps(props: Props, state: State): State | null {
    console.log("state: ", state, "props: ", props);
    return state;
  }

  componentDidMount() {
    // this.setState 在受控模式下是异步
    this.setState({
      a: 10
    })
    this.setState({
      a: 11
    })
    console.log('this.state.a in componentDidMount: ', this.state.a) // 1

    // this.setState 在非受控模式下是同步
    setTimeout(() => {
      this.setState({
        a: 100
      })
      this.setState({
        a: 101
      })
      console.log('this.state.a in setTimeout: ', this.state.a) // 101
    })
  }

  componentWillUnmount() {}

  render() {
    console.log("render/re-render");
    return (
      <React.Fragment>
        <div>{this.props.coupon.couponPrice}</div>
        <div>state.a: {this.state.a}</div>
        <div>state.b: <span className="state-b">{this.state.b}</span></div>
        <button onClick={() => this.onChangeB()} className="change-state">change state.b</button>
      </React.Fragment>
    );
  }

  onChangeB() {
    this.setState((state: State, props: Props) => ({
      b: ++state.b,
    }));
  }
}
