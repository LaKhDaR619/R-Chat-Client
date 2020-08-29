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
    case "SET_SELECTED_INDEX": {
      return {
        ...state,
        ...action.payload,
      };
    }
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
    case "RECEIVE_MESSAGE": {
      const temp = [...state.friends];
      let selectedIndex = state.selectedIndex;

      const { msg } = action.payload;

      const foundIndex = temp.findIndex(
        (friend) => friend.username === msg.sender
      );

      // sender in friends
      if (foundIndex !== -1) {
        temp[foundIndex].messages.push(msg);
        // if we are in the senders chat we make the message read
        // and change the senders chat to be on top
        if (foundIndex === selectedIndex) {
          selectedIndex = 0;
          temp[foundIndex].unRead = true;

          //fix scrollToTop();
        }
        // else we make it unRead
        else {
          temp[foundIndex].unRead = true;
          if (foundIndex > selectedIndex) selectedIndex++;
        }

        // getting the sender friend from the array
        const friend = temp[foundIndex];
        //delteting the friend from the array
        temp.splice(foundIndex, 1);
        // pushing it again at the beggining
        temp.splice(0, 0, friend);

        return {
          ...state,
          friends: temp,
          selectedIndex,
        };
      }
      // sender isn't in friends (so we add it)
      else {
        temp.splice(0, 0, {
          username: msg.sender,
          messages: [msg],
          unRead: true,
        });
        selectedIndex++;
      }

      return {
        ...state,
        friends: temp,
        selectedIndex,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
