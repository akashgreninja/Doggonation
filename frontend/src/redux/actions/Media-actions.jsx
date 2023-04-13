import { ActionTypes } from "../constants/action-types"


export const SetPosts=(posts)=>{
    return {
        type:ActionTypes.SET_PAGE_DATA,
        payload:posts
    }
}

