import { put, call } from "redux-saga/effects";

// check if the user is logged in
export function* checkLogin() {
  yield put({ type: "SET_AUTH_LOADING" });

  const newAction = yield call(async () => {
    try {
      const res = await fetch("/auth/check/loggedin");

      const data = await res.json();

      return { type: "CHECK_LOGIN_ASYNC", payload: data };
    } catch (error) {
      console.log(error);
    }

    return { type: "CHECK_LOGIN_ASYNC" };
  });

  yield put(newAction);
}

// login the user
export function* userLogin({ payload }) {
  const { username, password, history } = payload;

  yield put({ type: "SET_AUTH_LOADING" });

  const newAction = yield call(async () => {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(res);

      switch (res.status) {
        case 200: {
          history.push("/chat");
          const user = await res.json();
          return { type: "USER_LOGIN_SUCCESS", payload: { user } };
        }
        case 400: {
          const info = await res.json();
          let errorMessages = {};
          if (info.index == 0) errorMessages.username = info.message;
          else errorMessages.password = info.message;

          return {
            type: "USER_LOGIN_FAILED",
            payload: { errorMessages },
          };
        }
        case 500: {
          return {
            type: "USER_LOGIN_FAILED",
            payload: {
              errorMessages: {
                other: "There is a problem with the Server",
              },
            },
          };
        }
      }
    } catch (err) {
      console.log(err);
    }

    return {
      type: "USER_LOGIN_FAILED",
      payload: {
        errorMessages: {
          other: "Something went Wrong",
        },
      },
    };
  });

  yield put(newAction);
}

// register the user
export function* userRegister({ payload }) {
  yield put({ type: "SET_AUTH_LOADING" });

  const newAction = yield call(async () => {
    const { username, password, history } = payload;

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      switch (res.status) {
        case 200: {
          history.push("/login");
          return {
            type: "USER_REGISTER_SUCCESS",
          };
        }
        case 400: {
          const data = await res.json();
          let errorMessages = {};
          if (data.index == 0) errorMessages.username = data.message;
          else errorMessages.password = data.message;
          return {
            type: "USER_REGISTER_FAILED",
            payload: { errorMessages },
          };
        }
        case 409: {
          const errorMessage = await res.json();
          return {
            type: "USER_REGISTER_FAILED",
            payload: { errorMessages: { username: errorMessage } },
          };
        }
        case 500: {
          return {
            type: "USER_REGISTER_FAILED",
            payload: {
              errorMessages: { other: "There is a problem with the Server" },
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }

    return {
      type: "USER_REGISTER_FAILED",
      payload: {
        errorMessages: { other: "Something went Wrong" },
      },
    };
  });

  yield put(newAction);
}

// logout the user
export function* userLogout({ history }) {
  yield put({ type: "USER_LOADING" });
  const result = yield call(async () => {
    const data = { user: {}, errorMessage: "" };
    try {
      const res = await fetch("/auth/logout");

      if (res.status === 200) {
        history.push("/");
        data.loggedIn = false;
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      data.loggedIn = false;
    }
    return data;
  });

  yield put({ type: "USER_LOGOUT_ASYNC", ...result });
}

// check if the username is available
export function* checkUserName({ payload }) {
  const newAction = yield call(async () => {
    try {
      const { username } = payload;

      const res = await fetch("/auth/check/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      switch (res.status) {
        case 200: {
          const userAvailable = await res.json();
          let errorMessages = {};
          if (!userAvailable)
            errorMessages = { username: `User ${username} Already exists` };
          else errorMessages = { username: "", other: "" };
          return {
            type: "CHECK_USERNAME_SUCCESS",
            payload: {
              errorMessages,
            },
          };
        }
        case 500: {
          return {
            type: "CHECK_USERNAME_FAILED",
            payload: {
              errorMessage: { other: "There is a problem with the Server" },
            },
          };
        }
        default: {
          return {
            type: "CHECK_USERNAME_FAILED",
            payload: { errorMessages: { other: "Something went Wrong" } },
          };
        }
      }
    } catch (error) {
      console.log(error);
    }

    return {
      type: "CHECK_USERNAME_FAILED",
      payload: { errorMessages: { other: "Something went Wrong" } },
    };
  });

  yield put(newAction);
}
