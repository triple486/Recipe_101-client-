import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import modalReducer from "./modalReducer";
import addrecipeReducer from "./addrecipeReducer";
import mypageReducer from "./mypageReducer";
import newReducer from "./newReducer";

const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  searchReducer,
  modalReducer,
  addrecipeReducer,
  mypageReducer,
  newReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
