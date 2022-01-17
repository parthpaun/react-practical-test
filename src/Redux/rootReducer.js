import { combineReducers } from "redux";
import FormReducer from "./Reducers/QuestionFormReducer";

const rootReducer = combineReducers({
  FormReducer,
});

export default rootReducer;
