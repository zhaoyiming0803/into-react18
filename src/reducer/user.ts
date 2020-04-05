import { ADD_USER } from "../action/actionType";
import { User } from "@/types/user";

interface State {
  userList: User[];
}

const initialState: State = {
  userList: [
    {
      name: "zhangsan",
    },
  ],
};

interface Action {
  type: string;
  payload: User;
}

export const user = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userList: state.userList.concat(action.payload),
      };
    default:
      return state;
  }
};
