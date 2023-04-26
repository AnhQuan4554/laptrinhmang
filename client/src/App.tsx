import React, { useEffect } from "react";
import "./App.css";
import Register from "./component/register/index";
import Sigin from "./component/signin/index";
import { Routes, Route } from "react-router-dom";
import PostChildren from "./component/pageChildren/PostChildren";
import Post_manager from "./component/Home/Post_manager";
import Overview from "./component/Home/Overview";
import Location from "./component/Home/Location";
import Reward from "./component/Home/Reward";
import Payment from "./component/Home/Payment";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "./component/signin/setAuth";
import axios from "axios";
import {
  getDataLocation,
  getDataPayment,
  getDataPost,
  getDataReward,
} from "./store/reducer";
import { RootState } from "./store/store";

function App() {
  const index = useSelector((state: RootState) => state.indexPage.index);
  const stateJwt = useSelector(
    (state: RootState) => state.intialJWTReducer.stateJWT
  );
  const dispath = useDispatch();
  const renderDataPay = async () => {
    if (localStorage["jwt"]) {
      //nếu có jwt thì sẽ đưa nó lên header server
      await setAuthToken(localStorage["jwt"]);
    }
    try {
      const res = await axios.get("http://localhost:5000/payment");
      const { data } = res.data;
      data && dispath(getDataPayment(data));
    } catch (err) {
      console.log(err);
    }
  };
  const renderDataLocation = async () => {
    if (localStorage["jwt"]) {
      await setAuthToken(localStorage["jwt"]);
    }
    try {
      const res = await axios.get("http://localhost:5000/location");
      const { data } = res.data;
      console.log(data);
      res.data && dispath(getDataLocation(data));
    } catch (err) {
      console.log(err);
    }
  };
  const renderDataPost = async () => {
    if (localStorage["jwt"]) {
      await setAuthToken(localStorage["jwt"]);
    }
    try {
      const res = await axios.get("http://localhost:5000/post");
      const { data } = res.data;
      res.data && dispath(getDataPost(data));
    } catch (err) {
      console.log(err);
    }
  };
  const renderDataReward = async () => {
    if (localStorage["jwt"]) {
      await setAuthToken(localStorage["jwt"]);
    }
    try {
      const res = await axios.get("http://localhost:5000/reward");
      const { data } = res.data;
      res.data && dispath(getDataReward(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    renderDataPay();
    renderDataLocation();
    renderDataPost();
    renderDataReward();
    console.log("update");
  }, [stateJwt]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Sigin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postChildren" element={<PostChildren />} />
        <Route path="/post_manager" element={<Post_manager />} />
        <Route path="/location" element={<Location />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
