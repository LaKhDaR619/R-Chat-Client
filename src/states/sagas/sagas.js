import { takeLatest } from "redux-saga/effects";
import {
  checkLogin,
  userLogin,
  userLogout,
  userRegister,
  checkUserName,
} from "./authSaga";

export default function* mySaga() {
  // auth
  yield takeLatest("CHECK_LOGIN", checkLogin);
  yield takeLatest("USER_REGISTER", userRegister);
  yield takeLatest("USER_LOGIN", userLogin);
  yield takeLatest("USER_LOGOUT", userLogout);
  yield takeLatest("CHECK_USERNAME", checkUserName);
}
