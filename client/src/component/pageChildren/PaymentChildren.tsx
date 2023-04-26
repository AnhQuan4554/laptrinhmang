import React, { CSSProperties, useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Typography,
  styled,
  Button,
  FormControl,
  InputBase,
  TextField,
  Dialog,
} from "@mui/material";
import addImg from "./imgPageChildren/addImg.svg";
import FormSucess from "./FormSucess";
import axios from "axios";
import { storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { RootState } from "../../store/store";
const S_OverChildren = styled(Box)({
  padding: `10px 40px`,
  background: "#fff",
  margin: `auto`,
});
const S_InputInfor = styled(Box)({
  display: `flex`,
  flexDirection: "column",
});
/* CSS input */
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: `translate(-50%)`,
  top: `50%`,
};
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& lable": { position: `initial` },
  "label + &": {
    marginTop: theme.spacing(3),
  },

  "& .MuiInputBase-input": {
    marginTop: `8px`,
    marginBottom: "16px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #EBEAED",
    fontSize: 16,
    color: "##141416",
    fontWeight: 600,
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
const S_inputSelect = styled(TextField)({
  marginLeft: `12px`,
  marginTop: `8px`,
  marginBottom: "16px",
  background: `#fff`,
  borderRadius: `4px`,
});
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const PaymentChildren: React.FC<any> = () => {
  let [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  interface typePost {
    imgEvent: String;
    contentEvent: String;
    money: String;
    usedDate: String;
    status: String;
    userID: String;
  }
  const [inforCreat, setInforCreat] = useState<typePost>({
    imgEvent: "",
    contentEvent: "",
    money: "",
    usedDate: "5454",
    status: "ONLINE",
    userID: "",
  });
  const [currency, setCurrency] = useState<any>("EUR");
  const [location, setLocation] = useState<any>("Sydney");
  const [address, setAddress] = useState<any>("Crawford Room, Mortlock ....");

  const creatPost = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    try {
      const imgPush = await uploadFile();
      await axios.post("http://localhost:5000/payment/creatPayment", {
        ...inforCreat,
        imgEvent: `${imgPush}`,
        usedDate: `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      });
      console.log("success");
    } catch (error) {
      console.log(error, "LOI CON ME NO ROI");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setInforCreat({
      ...inforCreat,
      [event.target.name]: event.target.value,
    });
  };
  // console.log(imgUrlFirebase, "imgUrlFirebaseimgUrlFirebaseimgUrlFirebase");
  const [open, setOpen] = React.useState(false);
  const handleClose = async () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      setOpen(true);
    }, 2000);
  };
  const [urlImg, seturlImg] = useState("");
  const [urlImgFireBase, seturlImgFireBase] = useState<any>("");
  const handleImage = (e: any) => {
    var file = e.target.files;
    seturlImg(URL.createObjectURL(file[0]));
    seturlImgFireBase(file[0]);
  };
  useEffect(() => {
    setInforCreat({
      ...inforCreat,
      imgEvent: urlImg,
    });
  }, [urlImg]);
  const uploadFile = async () => {
    const imageRef = ref(storage, `images/${urlImgFireBase.name}`);
    const uploadImg = await uploadBytes(imageRef, urlImgFireBase as any);
    return await getDownloadURL(uploadImg.ref);
  };

  return (
    <Box
      style={{
        justifyContent: `center`,
        position: `relative`,
      }}
    >
      <S_OverChildren>
        <form onSubmit={creatPost}>
          <Typography
            style={{ fontWeight: `600`, marginBottom: `20px` }}
            variant="h4"
          >
            Add new payment record
          </Typography>
          <S_InputInfor>
            <Typography style={{ fontWeight: `600`, fontSize: `18px` }}>
              Payment record information
            </Typography>
            <Box>
              <Typography variant="h6">Tittle</Typography>
              <BootstrapInput
                defaultValue={inforCreat.contentEvent}
                onChange={handleChange}
                name="contentTittle"
                id="bootstrap-input"
              />
            </Box>
            <FormControl variant="standard">
              <Box
                component="form"
                sx={{
                  padding: "0",
                  "& .MuiTextField-root": {
                    width: "10ch",
                  },
                  "& select": {
                    padding: `10px`,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h6">Money Used</Typography>
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                  }}
                >
                  <BootstrapInput
                    sx={{ width: "85%" }}
                    placeholder="Money Used"
                    onChange={handleChange}
                    name="money"
                    id="bootstrap-input"
                  />
                  <S_inputSelect
                    id="filled-select-currency-native"
                    select
                    value={currency}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </S_inputSelect>
                </div>
              </Box>
            </FormControl>
            <FormControl variant="standard">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "25ch",
                  },
                  "& select": {
                    padding: `10px`,
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h6">Location</Typography>
                <Typography
                  style={{ position: `absolute`, top: `0px`, left: `51%` }}
                  variant="h6"
                >
                  Address
                </Typography>
                <div>
                  <S_inputSelect
                    style={{ marginLeft: "0" }}
                    id="filled-select-currency-native"
                    select
                    value={location}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}

                    // variant="filled"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </S_inputSelect>
                  <S_inputSelect
                    id="filled-select-currency-native"
                    select
                    value={address}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}

                    // variant="filled"
                  >
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </S_inputSelect>
                </div>
              </Box>
            </FormControl>
            <Box>
              <Typography variant="h5">Media</Typography>
              <label style={{ marginTop: `20px` }} htmlFor="inputFile">
                <img
                  style={{ maxWidth: `160px`, maxHeight: `160px` }}
                  src={urlImg ? urlImg : addImg}
                />
              </label>
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="inputFile"
                type="file"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
            </Box>
            <Button
              style={{ marginTop: `20px` }}
              size="large"
              color="success"
              variant="contained"
              type="submit"
              onClick={handleClickOpen}
            >
              Creat new post
            </Button>
          </S_InputInfor>
        </form>
      </S_OverChildren>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {<FormSucess open={open} />}
      </Dialog>
      <BeatLoader
        loading={loading}
        cssOverride={override}
        size={25}
        color="#36d7b7"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  );
};

export default PaymentChildren;
