import { ActionTypes } from "../constants/action-types";

const initialState = {
  result: [],
};

export const getsearchreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SEARCH_DATA:
      return { ...state, result: payload };

    default:
      return state;
  }
};
