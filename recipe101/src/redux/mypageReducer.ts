const LOAD = "data/Load" as const;
const STORES = "data/STORES" as const;
const RECIPES = "data/RECIPES" as const;
const COMMENTS = "data/COMMENTS" as const;
const INIT = "data/INIT" as const;

export const isLoad = (item: boolean) => {
  return {
    type: LOAD,
    payload: item,
  };
};

export const LoadStores = (item: store[]) => {
  return {
    type: STORES,
    payload: item,
  };
};

export const LoadRecipes = (item: recipe[]) => {
  return {
    type: RECIPES,
    payload: item,
  };
};

export const LoadComments = (item: comment[]) => {
  return {
    type: COMMENTS,
    payload: item,
  };
};
export const Init = (item?: any) => {
  return {
    type: INIT,
    payload: item,
  };
};

type DataAction =
  | ReturnType<typeof Init>
  | ReturnType<typeof isLoad>
  | ReturnType<typeof LoadComments>
  | ReturnType<typeof LoadRecipes>
  | ReturnType<typeof LoadStores>;

interface recipe {
  id: number;
  foodName: string;
  imgUrl: string;
  level: string;
  cookingTime: string;
}

interface comment {
  id: number;
  foodName: string;
  comment: string;
  createdAt: string;
  score: number;
}

interface store {
  id: number;
  foodName: string;
  imgUrl: string;
  level: string;
  cookingTime: string;
}

interface dataState {
  isLoad?: boolean;
  stores?: store[];
  recipes?: recipe[];
  comments?: comment[];
}

const initialState: dataState = {
  isLoad: false,
  stores: [],
  recipes: [],
  comments: [],
};

const dataReducer = (
  state: dataState = initialState, // 디폴트 문자열을 확인하기 힘듬
  // state = { isLogin: false, userInfo: {} },
  action: DataAction
) => {
  switch (action.type) {
    case LOAD:
      return { ...state, isLoad: true };

    case RECIPES:
      return { ...state, recipes: [...action.payload] };

    case STORES:
      return { ...state, stores: [...action.payload] };

    case COMMENTS:
      return { ...state, comments: [...action.payload] };

    case INIT:
      return initialState;

    default:
      return state;
  }
};

export default dataReducer;
