import { combineReducers } from "redux";
import { UserIdReducer, postsreducer} from './postreducer';
import { getsearchreducer } from "./getreducers";


const reducers=combineReducers({
    allposts:postsreducer,
    searchresult:getsearchreducer,
    UserId:UserIdReducer
})
export default reducers