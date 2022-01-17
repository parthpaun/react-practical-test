import { GET_FORM_LIST } from "../Constant/QuestionFormConstant";

const initialState = {
  formList: [],
};

const FormReducer = (state = initialState, action) => {
  console.log(`action`, action)
  switch (action.type) {
    case GET_FORM_LIST:
      return {
        ...state,
        formList: action.payload,
      };
    default:
      return state;
  }
};

export default FormReducer;
