import { combineReducers } from "redux";
import { nameReducer } from "./nameReducer";

const rootReducer = combineReducers({
  nameReducer,
});

export default rootReducer;
