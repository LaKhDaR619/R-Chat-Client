const initialState = {
  friends: [],
  selectedIndex: 0,
  friendError: "",
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

      let messageFound = false;

      for (let i = temp[friendIndex].messages.length - 1; i >= 0; i--) {
        // this condition means that we arrived at the messages  from the server
        if (temp[friendIndex].messages[i]._id !== undefined) break;

        if (temp[friendIndex].messages[i].message === msg.message) {
          temp[friendIndex].messages[i].pending = false;
          messageFound = true;
          break;
        }
      }

      if (!messageFound) temp[friendIndex].messages.push(msg);

      return {
        ...state,
        friends: temp,
      };
    }
    case "RECEIVE_MESSAGE": {
      const temp = [...state.friends];
      let selectedIndex = state.selectedIndex;

      const { msg, scrollToTop } = action.payload;

      const foundIndex = temp.findIndex(
        (friend) => friend.username === msg.sender
      );

      // sender in friends
      if (foundIndex !== -1) {
        temp[foundIndex].messages.push(msg);

        temp[foundIndex].unRead = true;
        // if we are in the senders chat we make him on top
        if (foundIndex === selectedIndex) {
          selectedIndex = 0;
          scrollToTop();
        }
        // else we make it unRead
        else {
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
    case "SOMEONE_TYPING": {
      const { typing, typer } = action.payload;
      const temp = [...state.friends];

      const friendIndex = temp.findIndex((friend) => friend.username === typer);

      if (friendIndex !== -1) {
        temp[friendIndex].typing = typing;
      }

      return {
        ...state,
        friends: temp,
      };
    }
    case "ADD_FRIEND_SUCCESS": {
      alert(`${action.payload.friends[0].username} added to friend list`);
      return {
        ...state,
        ...action.payload,
        friendError: "",
      };
    }
    case "ADD_FRIEND_FAILED": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
