import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import modalReducer from "./modalReducer";
import addrecipeReducer from "./addrecipeReducer";
const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  searchReducer,
  modalReducer,
  addrecipeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
