import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import modalReducer from "./modalReducer";
const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  searchReducer,
  modalReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
