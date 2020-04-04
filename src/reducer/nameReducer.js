import { ADD_ARTICLE } from "../action/actionType";

const initialState = {
  articles: [
    {
      title: "test0",
    },
  ],
};

export const nameReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        articles: state.articles.concat(action.payload),
      };
    default:
      return state;
  }
};
