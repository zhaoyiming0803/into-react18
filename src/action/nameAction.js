import { ADD_ARTICLE } from "./actionType";

export const addArticle = (payload) => {
  return {
    type: ADD_ARTICLE,
    payload,
  };
};
