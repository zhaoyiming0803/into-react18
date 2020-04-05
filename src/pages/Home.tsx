import * as React from "react";
import { useState, Dispatch } from "react";
import { connect, DispatchProp } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/reducer/index";
import { addUser } from "@/action/index";

interface Props {
  userList: User[];
  addUser: (user: User) => void;
}

function Home<T extends Props>(props: T) {
  console.log(props);
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Home</h1>
      {props.userList.map((user: User, index: number) => (
        <div key={index}>{user.name}</div>
      ))}
      <button
        onClick={() => {
          setCount(count + 1);
          props.addUser({
            name: "user" + count,
          });
        }}
      >
        add user
      </button>
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