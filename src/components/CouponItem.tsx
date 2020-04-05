import * as React from "react";
import { CouponForm } from "@/types/index";

interface State {
  a: string;
  b: number;
}

interface Props {
  coupon: CouponForm;
}

export default class CouponItem extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    console.log("props:", this.props);
  }

  componentDidCatch(e: Error) {
    console.log("error: ", e);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return true;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div>1</div>;
  }
}
