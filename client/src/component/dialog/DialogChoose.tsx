import React, { CSSProperties, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/system";
import { GridRowId } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { RootState } from "../../store/store";
interface DialogChooseProps {
  testId: any;
  openIcon: boolean;
  setOpenIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  textAlign: "center",
  position: "absolute",
  left: "50%",
  transform: `translate(-50%)`,
  top: `50%`,
};
const StyledDialog = styled(Dialog)({
  boxShadow: "unset",
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    boxShadow: "none",
  },
});
export const DialogChoose: React.FC<DialogChooseProps> = (props) => {
  const idItem = useSelector(
    (state: RootState) => state.deleteItemReducer.idItemDelete
  );

  const { openIcon, setOpenIcon, setLoading, testId } = props;
  console.log("TestID", testId);
  const handleCloseIcon = () => {
    setOpenIcon(false);
  };
  const handleDelete = async () => {
    setOpenIcon(false);
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
      setLoading(false);
    }, 2000);
    try {
      await axios.delete("http://localhost:5000/location/deleteLocation", {
        data: {
          id: idItem,
        },
      });
    } catch (error) {
      console.log("Loi ben phia client");
    } finally {
      window.location.reload();
    }
  };
  return (
    <>
      <StyledDialog
        open={openIcon}
        onClose={handleCloseIcon}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
      >
        <DialogTitle>Bảng lựa chọn</DialogTitle>
        <DialogContent>
          <p>Bạn muốn làm gì với sản phẩm này?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIcon}>Đóng</Button>
          <Button onClick={handleDelete}>Xóa</Button>
          <Button onClick={handleCloseIcon}>Sửa thông tin</Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};
