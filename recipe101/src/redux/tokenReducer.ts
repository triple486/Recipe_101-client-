const STORE = "token/STORE" as const;
const DELETE = "token/DELETE" as const;

export const storeToken = (item: string) => {
  return {
    type: STORE,
    payload: item,
  };
};

export const deleteToken = (item: string) => {
  return {
    type: DELETE,
    payload: item,
  };
};
type TokenAction =
  | ReturnType<typeof storeToken>
  | ReturnType<typeof deleteToken>;

// type tokenState = {
//   token: string;
// };

// const initialState: tokenState = {
//   token: "",
// };

const tokenReducer = (
  //  state: tokenState = initialState, // 디폴트 문자열을 확인하기 힘듬
  state = "",
  action: TokenAction
) => {
  switch (action.type) {
    case STORE:
      return action.payload;

    case DELETE:
      return state;

    default:
      return state;
  }
};

export default tokenReducer;
