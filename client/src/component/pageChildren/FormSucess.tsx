import React from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import imgSuccess from "./imgPageChildren/imgSucess.png";
const FormSucess: React.FC<any> = ({ setshowDialogParent }) => {
  const S_formSucess = styled(Box)({
    minWidth: `645px`,
    minHeight: `463px`,
    display: `flex`,
    alignItems: "center",
    flexDirection: "column",
    padding: `40px`,
  });
  const backToPageParent = () => {
    window.location.reload();
  };
  return (
    <S_formSucess>
      <Typography
        style={{
          fontWeight: `700`,
          fontSize: `24px`,
          lineHeight: `32px`,
          color: `#2BA84A`,
        }}
        variant="h4"
      >
        Create successfully{" "}
      </Typography>
      <Typography
        style={{ color: `#141416`, fontSize: `16px`, marginTop: `12px` }}
        variant="h5"
      >
        Your post created successfully.
      </Typography>
      <img
        style={{
          width: `300px`,
          height: `211.14px`,
          marginTop: ` 40px`,
          marginBottom: `36px`,
        }}
        src={imgSuccess}
        alt=""
      />
      <Button variant="contained" color="success" onClick={backToPageParent}>
        Back to reward management{" "}
      </Button>
    </S_formSucess>
  );
};

export default FormSucess;
