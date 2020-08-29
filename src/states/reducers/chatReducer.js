const initialState = {
  friends: [],
  selectedIndex: 0,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        ...state,
        ...action.payload,
      };
    case "MESSAGE_CONFIRMATION": {
    }
    default:
      return state;
  }
};

export default chatReducer;
