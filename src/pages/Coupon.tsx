import * as React from "react";
import { useHistory } from "react-router";

interface Props {}

function Coupon<T extends Props>(props: T) {
  const history = useHistory();
  console.log(history.location);
  return (
    <div>
      <h1>Coupon page</h1>
      <div>{history.location.search}</div>
    </div>
  );
}

export default Coupon;
