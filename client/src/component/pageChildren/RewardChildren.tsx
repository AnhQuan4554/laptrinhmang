import React, { CSSProperties, useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const S_OverChildren = styled(Box)({
  padding: `40px 40px`,
  // height: `1023px`,
  background: "#fff",
  margin: `auto`,
});
const S_InputInfor = styled(Box)({
  display: `flex`,
  //   alignItems: "center",
  flexDirection: "column",
});
/* CSS input */
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
  // padding: "20px",
  // width: `94px`,
  // height: `43px`,
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

const RewardChildren: React.FC<any> = () => {
  let [loading, setLoading] = useState(false);
  interface typePost {
    id: String;
    imgVocher: String;
    contentVocher: String;
    expiredDate: String;
    activeDate: String;
    status: String;
    userID: String;
  }
  const [inforCreat, setInforCreat] = useState<typePost>({
    id: "",
    imgVocher: "",
    contentVocher: "",
    expiredDate: "",
    activeDate: "",
    status: "ONLINE",
    userID: "",
  });

  //submit form | Creat Post
  const creatReward = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    const imgPush = await uploadFile();
    try {
      await axios.post("http://localhost:5000/reward/creat-reward", {
        ...inforCreat,
        imgVocher: `${imgPush}`,
        expiredDate: `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        activeDate: `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      });
      console.log("success");
    } catch (error) {
      console.log(error, "LOI CON ME NO ROI");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInforCreat({
      ...inforCreat,
      [event.target.name]: event.target.value,
      imgVocher: urlImg,
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
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
      imgVocher: urlImg,
    });
  }, [urlImg]);
  const uploadFile = async () => {
    const imageRef = ref(storage, `images/${urlImgFireBase.name}`);
    const uploadImg = await uploadBytes(imageRef, urlImgFireBase as any);
    return await getDownloadURL(uploadImg.ref);
  };
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
    position: "absolute",
    left: "50%",
    transform: `translate(-50%)`,
    top: `50%`,
  };
  return (
    <Box
      style={{
        justifyContent: `center`,
      }}
    >
      <S_OverChildren>
        <form onSubmit={creatReward}>
          <Typography
            style={{ fontWeight: `600`, marginBottom: `20px` }}
            variant="h4"
          >
            Add new voucher
          </Typography>
          <S_InputInfor>
            <Typography style={{ fontWeight: `600`, fontSize: `18px` }}>
              Voucher Information
            </Typography>
            <FormControl variant="standard">
              <Typography variant="h6">Voucher name</Typography>
              <BootstrapInput
                defaultValue={inforCreat.contentVocher}
                onChange={handleChange}
                name="contentVocher"
                id="bootstrap-input"
              />
            </FormControl>

            <Box style={{ display: "flex", alignItems: "center" }}>
              <Box
                component="form"
                sx={{
                  marginRight: "20px",
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
                <Typography variant="h6">Expired Date</Typography>

                <BootstrapInput
                  onChange={handleChange}
                  name="expiredDate"
                  defaultValue="1000"
                  id="bootstrap-input"
                />
              </Box>
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
                <Typography variant="h6">Voucher Code</Typography>

                <BootstrapInput
                  onChange={handleChange}
                  name="activeDate"
                  defaultValue="1000"
                  id="bootstrap-input"
                />
              </Box>
            </Box>
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

export default RewardChildren;
