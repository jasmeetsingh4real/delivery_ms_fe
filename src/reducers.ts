import { combineReducers } from "redux";
import staffReducer from "./slices/staffSlice";
const rootReducer = combineReducers({
  staff: staffReducer,
});

export default rootReducer;
