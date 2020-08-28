import { put, call } from "redux-saga/effects";

export function* setRead({ payload }) {
  let { friends, index } = payload;

  const newAction = yield call(() => {
    try {
      // trying a methode send and not check if it is success (like facebook)
      fetch("/chat/messageRead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendName: friends[index].username }),
      });
    } catch (error) {
      console.log(error);
    }

    // just changing it locally
    friends[index].unRead = false;
    return { type: "SET_FRIENDS", payload: { friends } };
  });

  yield put(newAction);
}
