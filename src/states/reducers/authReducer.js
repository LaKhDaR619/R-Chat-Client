// to save time
const emptyInputs = { username: "", password: "" };
const emptyError = { username: "", password: "", other: "" };

const initialState = {
  loggedIn: false,
  user: {},
  isLoading: true,
  inputFields: emptyInputs,
  errorMessages: emptyError,
};

const loginReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "CHECK_LOGIN_ASYNC":
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        errorMessages: emptyError,
        ...action.payload,
      };
    case "USER_LOGIN_FAILED":
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        user: {},
        ...action.payload,
      };
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        errorMessages: emptyError,
        isLoading: false,
        loggedIn: false,
        user: {},
      };
    case "USER_REGISTER_FAILED":
      return {
        ...state,
        isLoading: false,
        loggedIn: false,
        user: {},
        ...action.payload,
      };
    case "CHECK_USERNAME_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "CHECK_USERNAME_FAILED":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_INPUT_FIELDS":
      return {
        ...state,
        inputFields: action.payload,
      };
    case "RESET_IE": {
      return {
        ...state,
        inputFields: emptyInputs,
        errorMessages: emptyError,
      };
    }

    case "USER_LOGOUT_ASYNC":
      return {
        ...state,
        isLoading: false,
        loggedIn: action.loggedIn,
        user: action.user,
        errorMessages: emptyError,
      };
    case "SET_AUTH_LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default loginReducer;
