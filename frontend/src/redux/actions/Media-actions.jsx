import { ActionTypes } from "../constants/action-types"


export const SetPosts=(posts)=>{
    return {
        type:ActionTypes.SET_PAGE_DATA,
        payload:posts
    }
}

export const SetSearchdata=(result)=>{
    return {
        type:ActionTypes.SET_SEARCH_DATA,
        payload:result
    }
}