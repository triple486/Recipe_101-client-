const UPDATE = "search/UPDATE" as const;
const STATUS = "search/STATUS" as const;
const SUCCESS = "search/SUCCESS" as const;

export const searchRecipe = (item: recipe[]) => {
  return {
    type: UPDATE,
    payload: item,
  };
};

export const isSearch = (item: boolean) => {
  return {
    type: STATUS,
    payload: item,
  };
};

export const isFail = (item: boolean) => {
  return {
    type: SUCCESS,
    payload: item,
  };
};

type SearchAction =
  | ReturnType<typeof searchRecipe>
  | ReturnType<typeof isSearch>
  | ReturnType<typeof isFail>;

interface recipe {
  id?: number;
  food_id?: number;
  food_name: string;
  foodName: string;
  food_img: string;
  imgUrl: string;
  level: string;
  cooking_time: string;
  cookingTime: string;
  createdAt: string;
}

type searchState = {
  isSearch: boolean;
  isFail: boolean;
  search: recipe[];
};

const initialState: searchState = {
  isSearch: false,
  isFail: false,
  search: [],
};

const searchReducer = (
  state: searchState = initialState,
  //  state = { isSearch: false, isFail: false, search: [] },
  action: SearchAction
) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, search: [...action.payload] };

    case STATUS:
      return { ...state, isSearch: action.payload };

    case SUCCESS:
      return { ...state, isFail: action.payload };

    default:
      return state;
  }
};

export default searchReducer;
