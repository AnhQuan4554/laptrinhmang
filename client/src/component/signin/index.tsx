import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Button,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import imgRegister from "../../img/imgRegister.png";
import imgLogo from "../../img/logoRegister.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeIntialJWT, getUserID } from "../../store/reducer";
const S_Register = styled(Box)({
  width: `100%`,
  display: "flex",
  alignItems: `center`,
  height: `100vh`,
});

const S_tittle = styled(Typography)({
  fontWeight: `700`,
  fontSize: `32px`,
  lineHeight: `38px`,
  color: `#2BA84A`,
  textAlign: `center`,
  marginBottom: `20px`,
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    marginTop: `10px`,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "343px",
    color: "#B1B5C4",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
const S_wrapInput = styled(Box)({
  marginTop: `10px`,
  textAlign: "center",
});
const S_buttonNext = styled(Button)({
  padding: `16px 80px`,
  gap: `8px`,
  width: `376px`,
  height: `56px`,
  background: `#777E91`,
  borderRadius: `4px`,
  marginTop: `50px`,
  fontWeight: `600`,
  fontSize: `16px`,
  color: `#fff`,
  "&:hover": {
    background: `#777E91`,
  },
});

const Signin: React.FC = () => {
  const dispath = useDispatch();
  interface stateForm {
    email: String;
    password: String;
  }
  const [userForm, setUserForm] = useState<stateForm>({
    email: "",
    password: "",
  });
  const takeInforUser = (e: any) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userForm.email || !userForm.password) {
      alert("khong duoc bo trong");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/user/signin",
        userForm
      );
      res.data.user
        ? navigate("/overview")
        : toast("🦄 Tên đăng nhập hoawc mk  sai", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      //đưa token lên local
      if (res.data.accessToken) {
        window.localStorage.setItem(
          "jwt",
          JSON.stringify(res.data.accessToken)
        );

        window.localStorage.setItem(
          "email",
          JSON.stringify(res.data.user.email)
        );
        // thay doi bien jwt de du lieu duoc cap nhat
        dispath(changeIntialJWT(res.data.accessToken));
      }

      console.log(res, res.data.accessToken);

      // store
    } catch (error) {
      console.log(error, "deo co du lieu");
    }
  };
  return (
    <S_Register style={{ overflow: `hidden` }}>
      <img style={{ height: `100%`, width: `65%` }} src={imgRegister} alt="" />
      <form
        style={{
          width: `35%`,
          display: `flex`,
          flexDirection: "column",
          padding: `50px`,
          alignItems: `center`,
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <S_tittle variant="h1">Welcome to StartNow</S_tittle>
        <img src={imgLogo} style={{ width: `343px`, height: "242px" }} alt="" />
        <S_wrapInput>
          <FormControl style={{ marginTop: `40px` }} variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              <Typography
                style={{
                  fontSize: `30px`,
                  fontWeight: `700`,
                  color: `#353945`,
                }}
              >
                Email
              </Typography>
            </InputLabel>
            <BootstrapInput
              name="email"
              onChange={(e) => takeInforUser(e)}
              defaultValue=""
              placeholder="Enter your Email"
              id="bootstrap-input"
            />
          </FormControl>
          <FormControl style={{ marginTop: `40px` }} variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              <Typography
                style={{
                  fontSize: `30px`,
                  fontWeight: `700`,
                  color: `#353945`,
                }}
              >
                Password
              </Typography>
            </InputLabel>
            <BootstrapInput
              name="password"
              onChange={(e) => takeInforUser(e)}
              defaultValue=""
              placeholder="Enter your  password"
              id="bootstrap-input"
            />
          </FormControl>
        </S_wrapInput>
        <S_buttonNext type="submit">Next</S_buttonNext>

        <Link
          style={{ marginTop: `10px`, textDecoration: `none`, color: "#000" }}
          to={"/Register"}
        >
          {" "}
          <span style={{ color: `#2BA84A` }}> Click here</span> to Sign up if
          you don’t have an account
        </Link>
      </form>
    </S_Register>
  );
};

export default Signin;
