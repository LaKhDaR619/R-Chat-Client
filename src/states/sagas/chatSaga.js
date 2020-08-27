import { put, call } from "redux-saga/effects";

export function* getFriends() {
  const newAction = yield call(async () => {
    try {
      const res = await fetch("/chat");

      const data = await res.json();
      console.log(data);

      if (res.status == 200)
        return { type: "GET_FRIENDS_SUCCESS", payload: { friends: data } };
    } catch (error) {
      console.log(error);
    }

    return { type: "GET_FRIENDS_FAILED" };
  });

  yield put(newAction);
}

export function* joinRoom() {
  const newAction = yield call(async () => {
    try {
      const res = await fetch("/chat/join_room");

      const data = await res.json();
      console.log(data);

      if (res.status == 200)
        return { type: "GET_FRIENDS_SUCCESS", payload: { friends: data } };
    } catch (error) {
      console.log(error);
    }

    return { type: "GET_FRIENDS_FAILED" };
  });

  yield put(newAction);
}
