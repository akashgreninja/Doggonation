import { ActionTypes } from "../constants/action-types";

const initialState = {
  posts: [],
  Userexists: false,
};

export const postsreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PAGE_DATA:
      return { ...state, posts: payload };

    default:
      return state;
  }
};
export const RegisterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_ALREADY_EXISTS:
      return { ...state, Userexists: payload };

    default:
      return state;
  }
};
