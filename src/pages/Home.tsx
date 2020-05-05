import * as React from "react";
import { useState, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "@/types/index";
import { RootState } from "@/reducer/index";
import { addUser } from "@/action/index";
import { Button } from "antd-mobile";

interface Props {
  userList: User[];
  addUser: (user: User) => void;
}

function Home<T extends Props>(props: T) {
  console.log(props);
  const [count, setCount] = useState(0);
  const hisgory = useHistory();

  return (
    <div>
      <h1>Home</h1>
      {props.userList.map((user: User, index: number) => (
        <div key={index}>{user.name}</div>
      ))}
      <Button
        onClick={() => {
          setCount(count + 1);
          props.addUser({
            name: "user" + count,
          });
        }}
      >
        add user
      </Button>
      <Button onClick={() => hisgory.push("/coupon?a=1&b=2")}>
        to Coupon page
      </Button>
      <Button onClick={() => hisgory.push("/handleValueByHooks")}>
        to handle value by hooks page
      </Button>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  userList: state.user.userList,
});

interface Action {
  type: string;
  payload: User;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addUser: (user: User) => dispatch(addUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
