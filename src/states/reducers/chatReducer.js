const initialState = {
  friends: [],
};

const chatReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_FRIENDS_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "GET_FRIENDS_FAILED":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default chatReducer;
