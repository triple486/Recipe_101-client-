const IGRS = "input/IGRS" as const;
const DOIGRS = "delete/DOIGRS" as const;
const INFO = "input/INFO" as const;
const STEP = "input/STEP" as const;
const DOSTEP = "delete/DOSTEP" as const;
const FIMG = "input/FIMG" as const;
const SIMG = "input/SIMG" as const;
const DOSIMG = "delete/DOSIMG" as const;
const INIT = "init/INIT" as const;
type Ingredient = {
  name: string;
  type: string;
  cap: string;
};

type Food_info = {
  foodName?: string;
  summary?: string;
  nation?: string;
  type?: string;
  cookingTime?: string;
  calorie?: string;
  qnt?: string;
  level?: string;
  [key: string]: any;
};

type Recipe = {
  cookingNo: number;
  cookingDc: string;
  stepTip: string;
};

type Image = {
  isin?: boolean;
  imgpath?: string | ArrayBuffer | null;
  file?: File;
};

export const setRecipe = (item: Recipe) => {
  return {
    type: STEP,
    payload: item,
  };
};

export const deleteOneRecipe = (item: number) => {
  return {
    type: DOSTEP,
    payload: item,
  };
};

export const setFoodinfo = (item: Food_info) => {
  return {
    type: INFO,
    payload: item,
  };
};

export const setIngredient = (item: Ingredient) => {
  return {
    type: IGRS,
    payload: item,
  };
};

export const deleteOneIngredient = (item: number) => {
  return {
    type: DOIGRS,
    payload: item,
  };
};

export const setFoodImage = (item: Image) => {
  return {
    type: FIMG,
    payload: item,
  };
};

export const setStepImage = (item: any) => {
  return {
    type: SIMG,
    payload: item,
  };
};

export const deleteOneStepImage = (item: number) => {
  return {
    type: DOSIMG,
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
  | ReturnType<typeof setRecipe>
  | ReturnType<typeof setFoodinfo>
  | ReturnType<typeof setIngredient>
  | ReturnType<typeof setFoodImage>
  | ReturnType<typeof setStepImage>
  | ReturnType<typeof deleteOneIngredient>
  | ReturnType<typeof deleteOneRecipe>
  | ReturnType<typeof initial>
  | ReturnType<typeof deleteOneStepImage>;

type addRecipeState = {
  Food_info: Food_info;
  Ingredient: Ingredient[];
  Recipe: Recipe[];
  FoodImage: Image;
  StepImage: Image[];
};

const initialState: addRecipeState = {
  Food_info: {},
  Ingredient: [],
  Recipe: [],
  FoodImage: { isin: false },
  StepImage: [],
};

const searchReducer = (
  state: addRecipeState = initialState,
  // state = { isSearch: false, isFail: false, search: [] },
  action: addrecipeAction
) => {
  switch (action.type) {
    case INFO:
      return { ...state, Food_info: { ...state.Food_info, ...action.payload } };

    case IGRS:
      return { ...state, Ingredient: [...state.Ingredient, action.payload] };

    case STEP:
      return { ...state, Recipe: [...state.Recipe, action.payload] };

    case SIMG:
      return { ...state, StepImage: [...state.StepImage, action.payload] };

    case FIMG:
      return { ...state, FoodImage: action.payload };

    case INIT:
      return initialState;

    case DOSTEP:
      return {
        ...state,
        Recipe: [
          ...state.Recipe.slice(0, action.payload),
          ...state.Recipe.slice(action.payload + 1),
        ],
      };

    case DOIGRS:
      return {
        ...state,
        Ingredient: [
          ...state.Ingredient.slice(0, action.payload),
          ...state.Ingredient.slice(action.payload + 1),
        ],
      };

    case DOSIMG:
      return {
        ...state,
        StepImage: [
          ...state.StepImage.slice(0, action.payload),
          ...state.StepImage.slice(action.payload + 1),
        ],
      };

    default:
      return state;
  }
};

export default searchReducer;
