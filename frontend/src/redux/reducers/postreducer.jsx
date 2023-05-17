import { ActionTypes } from "../constants/action-types";

const initialState = {
  // posts: [],
  // Userexists: false,
  Userinfo: [],
};

export const postsreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PAGE_DATA:
      return { ...state, posts: payload };

    default:
      return state;
  }
};

export const UserIdReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_INFO:
      return { ...state, Userinfo: payload };

    default:
      return {...state,Userinfo:localStorage.getItem("token")};
  }
};
