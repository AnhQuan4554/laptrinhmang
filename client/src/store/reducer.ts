import { createReducer, createAction } from "@reduxjs/toolkit";
//Khai báo các state trong toàn bộ ứng dụng
const intialState = {
  index: 0,
};
const intialStateDetail: any = {
  dataPost: [],
  dataLocation: [],
  dataReward: [],
  dataPayment: [],
};
const idItemDelete = {
  idItemDelete: "",
};
const intialUser = {
  userID: "",
};
const intialJWT = {
  stateJWT: "",
};
//////////
// Khai báo các action
export const changeIndexPage = createAction<number>(
  "indexPage/changeIndexPage"
);
export const changeIntialJWT = createAction<string>(
  "intialJWT/changeIntialJWT"
);

export const addDataPost = createAction<any>("dataPost/addDataPost");
export const getDataPost = createAction<[]>("dataPost/getDataPost");
export const getDataLocation = createAction<[]>("dataLocation/getDataLocation");
export const getDataReward = createAction<[]>("dataReward/getDataReward");
export const getDataPayment = createAction<[]>("dataPayment/getDataPayment");
export const deleteIdItem = createAction<any>("deleteItem");
export const getUserID = createAction("user/getUserID");

// Tạo reducer
const intialJWTReducer = createReducer(intialJWT, (builder) => {
  builder.addCase(changeIntialJWT, (state, action) => {
    state.stateJWT = action.payload;
  });
});
const deleteItemReducer = createReducer(idItemDelete, (builder) => {
  builder.addCase(deleteIdItem, (state, action) => {
    state.idItemDelete = action.payload;
  });
});
const indexPageReducer = createReducer(intialState, (builder) => {
  builder.addCase(changeIndexPage, (state, action) => {
    state.index = action.payload as number;
  });
});
const dataPostReducer = createReducer(intialStateDetail, (builder) => {
  builder.addCase(addDataPost, (state, action) => {
    state.dataPost.push(action.payload);
  });
  builder.addCase(getDataPost, (state, action) => {
    state.dataPost = action.payload;
  });
  builder.addCase(getDataLocation, (state, action) => {
    state.dataLocation = action.payload;
  });
  builder.addCase(getDataReward, (state, action) => {
    state.dataReward = action.payload;
  });
  builder.addCase(getDataPayment, (state, action) => {
    state.dataPayment = action.payload;
  });
});
const userReducer = createReducer(intialUser, (builder) => {
  builder.addCase(getUserID, (state, action) => {
    state.userID = action.payload as any;
  });
});
export {
  indexPageReducer,
  dataPostReducer,
  userReducer,
  intialJWTReducer,
  deleteItemReducer,
};
