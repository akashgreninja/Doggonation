import { ActionTypes } from "../constants/action-types";

const initialState = {
  posts: [],
};

export const postsreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PAGE_DATA:
      return { ...state, posts: payload };

    default:
      return state;
  }
};
