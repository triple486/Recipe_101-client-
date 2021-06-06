const LOGIN = "login/UPDATE" as const;
const USERINFO = "userinfo/UPDATE" as const;
const INIT = "initial/INIT" as const;
const RECIPE = "select/RECIPE" as const;
const KAKAO = "kakao/KAKAO" as const;

export const updateLogin = (item: boolean) => {
  return {
    type: LOGIN,
    payload: item,
  };
};
type userinfoState = {
  userName?: string;
  phone?: string;
  email?: string;
  userImage?: string;
  comment?: number;
  createdAt?: string;
  updatedAt?: string;
  foodInfo?: number;
  follow?: number;
  userStore?: number;
};

export const updateUserInfo = (item: userinfoState) => {
  return {
    type: USERINFO,
    payload: item,
  };
};

export const selectRecipe = (item?: number) => {
  return {
    type: RECIPE,
    payload: item,
  };
};

export const iskakao = (item: boolean) => {
  return {
    type: KAKAO,
    payload: item,
  };
};

export const init = (item?: any) => {
  return {
    type: INIT,
    payload: item,
  };
};

type UserAction =
  | ReturnType<typeof updateLogin>
  | ReturnType<typeof init>
  | ReturnType<typeof selectRecipe>
  | ReturnType<typeof iskakao>
  | ReturnType<typeof updateUserInfo>;

type UserState = {
  isLogin: boolean;
  userInfo: userinfoState;
  selectRecipeId?: number;
  isKakao: boolean;
};

const initialState: UserState = {
  isLogin: false,
  userInfo: { userImage: "", userName: "", phone: "", email: "" },
  selectRecipeId: undefined,
  isKakao: false,
};

const loginReducer = (
  state: UserState = initialState, // 디폴트 문자열을 확인하기 힘듬
  // state = { isLogin: false, userInfo: {} },
  action: UserAction
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: action.payload };

    case KAKAO:
      return { ...state, isKakao: action.payload };

    case USERINFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };

    case RECIPE:
      return { ...state, selectRecipeId: action.payload };

    case INIT:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
