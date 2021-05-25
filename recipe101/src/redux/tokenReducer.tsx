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

type tokenState = {
  token: string;
};

const initialState: tokenState = {
  token: "",
};

const tokenReducer = (
  state: tokenState = initialState,
  Action: TokenAction
) => {
  switch (Action.type) {
    case STORE:
      return Action.payload;

    case DELETE:
      return Action.payload;

    default:
      return state;
  }
};

export default tokenReducer;
