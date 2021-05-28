const LOGIN = "login/UPDATE" as const;
const USERINFO = "userinfo/UPDATE" as const;

export const updateLogin = (item: boolean) => {
  return {
    type: LOGIN,
    payload: item,
  };
};
type userinfoState = {
  username: string;
  phone: string;
  email: string;
  userimage: string;
};

export const updateUserInfo = (item: userinfoState) => {
  return {
    type: USERINFO,
    payload: item,
  };
};
type UserAction =
  | ReturnType<typeof updateLogin>
  | ReturnType<typeof updateUserInfo>;

type UserState = {
  isLogin: boolean;
  userInfo: userinfoState;
};

const initialState: UserState = {
  isLogin: false,
  userInfo: { userimage: "", username: "", phone: "", email: "" },
};

const loginReducer = (
  state: UserState = initialState, // 디폴트 문자열을 확인하기 힘듬
  // state = { isLogin: false, userInfo: {} },
  action: UserAction
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
