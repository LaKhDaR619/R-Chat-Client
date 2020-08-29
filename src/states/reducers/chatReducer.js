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
      const temp = [...state.friends];
      const { msg } = action.payload;

      const friendIndex = temp.findIndex(
        (friend) => friend.username === msg.receiver
      );

      const messageIndex = temp[friendIndex].messages.findIndex(
        (message) => message.pending && message.message === msg.message
      );

      // removing pending
      temp[friendIndex].messages[messageIndex].pending = false;

      return {
        ...state,
        friends: temp,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
