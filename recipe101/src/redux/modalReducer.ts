const STATUS = "Modal/STATUS" as const;

export const isOn = (item: boolean) => {
  return {
    type: STATUS,
    payload: item,
  };
};

type ModalAction = ReturnType<typeof isOn>;

// type modalState = {
//   modal: boolean;
// };

// const initialState: modalState = {
//   modal: false,
// };

const modalReducer = (state = false, action: ModalAction) => {
  switch (action.type) {
    case STATUS:
      return action.payload;

    default:
      return state;
  }
};

export default modalReducer;
