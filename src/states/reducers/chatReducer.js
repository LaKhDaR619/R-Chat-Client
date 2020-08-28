const initialState = {
  friends: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
