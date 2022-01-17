import { GET_FORM_LIST } from "../Constant/QuestionFormConstant";

const getFormListSuccess = (payload) => {
  return { type: GET_FORM_LIST, payload };
};

const getFormList = (payload, callback) => (dispatch, getState) => {
  // dispatch(checkCartStatusStart());
  console.log("called")
  const formList = localStorage.getItem("formList")
    ? JSON.parse(localStorage.getItem("formList"))
    : [];
  console.log(`getState`, getState);
  dispatch(getFormListSuccess(formList));
};

export { getFormList };
