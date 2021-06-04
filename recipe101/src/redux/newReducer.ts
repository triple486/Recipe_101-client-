const GET = "test/GET" as const;
const ISLOAD = "test/ISLOAD" as const;
const PUSH = "test/PUSH" as const;
const INIT = "test/INIT" as const;

interface food_info {
  id: number;
  userName: string;
  foodName: string;
  summary: string;
  nation: string;
  type: string;
  cookingTime: string;
  calorie: string;
  qnt: string;
  level: string;
  imgUrl: string;
  store: number;
  score: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface Ingredient {
  name: string;
  type: string;
  cap: string;
}
interface Recipe {
  cookingNo: number;
  cookingDc: string;
  stepImage: string;
  stepTip: string;
}
interface Commentf {
  id: number;
  userName: string;
  comment: string;
  createdAt: string;
  score: number;
}

export const getdata = (item: newRecipeState) => {
  return {
    type: GET,
    payload: item,
  };
};

export const pushcomment = (item: Commentf) => {
  return {
    type: PUSH,
    payload: item,
  };
};

export const isLoad = (item: boolean) => {
  return {
    type: ISLOAD,
    payload: item,
  };
};

export const initial = (item?: any) => {
  return {
    type: INIT,
    payload: item,
  };
};

type addrecipeAction =
  | ReturnType<typeof getdata>
  | ReturnType<typeof isLoad>
  | ReturnType<typeof pushcomment>
  | ReturnType<typeof initial>;

type newRecipeState = {
  food_info: food_info;
  Ingredients: Ingredient[];
  Recipes: Recipe[];
  Comment: Commentf[];
  isLoad: boolean;
};

let dfood_info = {
  id: 0,
  userName: "",
  foodName: "",
  summary: "",
  nation: "",
  type: "",
  cookingTime: "",
  calorie: "",
  qnt: "",
  level: "",
  imgUrl: "",
  store: 0,
  score: 0,
  createdAt: "",
  updatedAt: "",
};

const initialState: newRecipeState = {
  food_info: dfood_info,
  Ingredients: [],
  Recipes: [],
  Comment: [],
  isLoad: false,
};

const searchReducer = (
  state: newRecipeState = initialState,
  // state = { isSearch: false, isFail: false, search: [] },
  action: addrecipeAction
) => {
  switch (action.type) {
    case GET:
      return { ...state, ...action.payload };

    case PUSH:
      return { ...state, Comment: [...state.Comment, action.payload] };

    case ISLOAD:
      return { ...state, isLOAD: action.payload };

    case INIT:
      return initialState;

    default:
      return state;
  }
};

export default searchReducer;
