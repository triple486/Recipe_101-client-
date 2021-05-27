const LOGIN = "login/UPDATE" as const;
const USERINFO = "userinfo/UPDATE" as const;

export const updateLogin = (item: boolean) => {
  return {
    type: LOGIN,
    payload: item,
  };
};

export const updateUserInfo = (item: object) => {
  return {
    type: USERINFO,
    payload: item,
  };
};
type TokenAction =
  | ReturnType<typeof updateLogin>
  | ReturnType<typeof updateUserInfo>;

// type tokenState = {
//   token: string;
// };

// const initialState: tokenState = {
//   token: "",
// };

const loginReducer = (
  //  state: tokenState = initialState, // 디폴트 문자열을 확인하기 힘듬
  state = { isLogin: false, userInfo: {} },
  action: TokenAction
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: action.payload };

    case USERINFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };

    default:
      return state;
  }
};

export default loginReducer;
