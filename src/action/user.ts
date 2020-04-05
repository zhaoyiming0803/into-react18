import { ADD_USER } from "./actionType";
import { User } from "@/types/user";

export const addUser = (payload: User) => {
  return {
    type: ADD_USER,
    payload,
  };
};
