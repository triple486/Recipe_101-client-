import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  tokenReducer,
  userReducer,
  searchReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
