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
  padding: `10px 40px`,
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
});
const currencies = [
  {
    value: "Sydney",
    label: "Sydney",
  },
  {
    value: "Việt Nam",
    label: "VN",
  },
  {
    value: "Hoa Kì",
    label: "USA",
  },
  {
    value: "Pháp",
    label: "¥",
  },
];
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: `translate(-50%)`,
  top: `50%`,
};
//////////////////////////////////////////////////
const LocationChildren = () => {
  const userIdStore = useSelector(
    (state: RootState) => state.userReducer.userID
  );
  let [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  interface typeLocation {
    id: String;
    imgAddress: String;
    contentAddress: String;
    location: String;
    addedDate: String;
    status: String;
    userID: String;
  }
  const [stateLocation, setstateLocation] = useState<typeLocation>({
    id: "",
    imgAddress: "",
    contentAddress: "",
    location: "",
    addedDate: "",
    status: "ONLINE",
    userID: "",
  });
  const creatLocation = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    try {
      const imgPush = await uploadFile();

      await axios.post("http://localhost:5000/location/creatLocation", {
        ...stateLocation,
        imgAddress: `${imgPush}`,
        addedDate: `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [urlImg, seturlImg] = useState("");
  const [urlImgFireBase, seturlImgFireBase] = useState<any>("");

  const handleImage = (e: any) => {
    var file = e.target.files;
    seturlImg(URL.createObjectURL(file[0]));
    seturlImgFireBase(file[0]);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstateLocation({
      ...stateLocation,
      [event.target.name]: event.target.value,
      userID: "4325345",
    });
  };
  useEffect(() => {
    setstateLocation({
      ...stateLocation,
      imgAddress: urlImg,
    });
  }, [urlImg]);

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
  const uploadFile = async () => {
    const imageRef = ref(storage, `images/${urlImgFireBase.name}`);
    const uploadImg = await uploadBytes(imageRef, urlImgFireBase as any);
    return await getDownloadURL(uploadImg.ref);
  };
  return (
    <>
      <Box
        style={{
          justifyContent: `center`,
          position: "relative",
        }}
      >
        <S_OverChildren>
          <form onSubmit={creatLocation}>
            <Typography
              style={{ fontWeight: `600`, marginBottom: `20px` }}
              variant="h4"
            >
              Add new location
            </Typography>
            <S_InputInfor>
              <Typography style={{ fontWeight: `600`, fontSize: `18px` }}>
                Location Information
              </Typography>

              <FormControl variant="standard">
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      width: "55ch",
                    },
                    "& select": {
                      padding: `10px`,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography variant="h6">Location</Typography>
                  <div>
                    <S_inputSelect
                      style={{ marginLeft: "0" }}
                      id="filled-select-currency-native"
                      select
                      name="location"
                      defaultValue="VN"
                      onChange={handleChange}
                      // onChange={set}
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
                  </div>
                </Box>
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="h6">Address</Typography>
                <BootstrapInput
                  name="contentAddress"
                  onChange={handleChange}
                  placeholder="Address"
                  id="bootstrap-input"
                />
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
                onClick={handleClickOpen}
                type="submit"
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
          {<FormSucess />}
        </Dialog>
      </Box>

      <BeatLoader
        loading={loading}
        cssOverride={override}
        size={25}
        color="#36d7b7"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default LocationChildren;
