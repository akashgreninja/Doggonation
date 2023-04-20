import { combineReducers } from "redux";
import { postsreducer} from './postreducer';
import { getsearchreducer } from "./getreducers";


const reducers=combineReducers({
    allposts:postsreducer,
    searchresult:getsearchreducer
})
export default reducers