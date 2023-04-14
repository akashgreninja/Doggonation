import { combineReducers } from "redux";
import { postsreducer} from './postreducer'


const reducers=combineReducers({
    allposts:postsreducer
})
export default reducers