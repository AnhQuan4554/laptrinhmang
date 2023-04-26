import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import {
  Box,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Dialog,
  styled,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NaviHome from "./index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { changeIndexPage, getDataPayment } from "../../store/reducer";
import axios from "axios";
import PaymentChildren from "../pageChildren/PaymentChildren";
const Payment: React.FC<any> = () => {
  // CSS ---------------------------
  const S_dataGrid = styled(DataGrid)({
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: `600`,
      fontSize: `18px`,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
      display: "none",
    },
  });
  const S_textColoum = styled(Typography)({
    width: `100%`,
    height: `72%`,
    borderRadius: `20px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#D5EEDB",
    color: `#30993B`,
    fontWeight: `500`,
  });
  // state ---------------------------------------------
  const dispath = useDispatch();
  dispath(changeIndexPage(4));
  const dataPost = useSelector(
    (state: RootState) => state.dataPostReducer.dataPayment
  );
  const columns: GridColDef[] = [
    {
      field: "logId",
      headerName: "LOG ID",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6" sx={{ color: "green" }}>
          {params.id.toString().slice(0, 8)}
        </Typography>
      ),
    },
    {
      field: "even",
      headerName: "EVENT",
      // type: "number",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <>
          <Avatar
            sx={{ width: `28px`, height: `28px`, marginRight: `20px` }}
            src={params.row.imgEvent}
          />
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {" "}
            {params.row.contentEvent}
          </Typography>
        </>
      ),
    },
    {
      field: "money",
      headerName: "MONEY USED",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6">{params.row.money}</Typography>
      ),
    },

    {
      field: "usedDate",
      headerName: "USED DATE",
      width: 250,
      editable: true,
      renderCell: (param) => (
        <Typography variant="h6"> {param.row.usedDate}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 120,
      editable: true,
      renderCell: (params) => <S_textColoum>{params.row.status}</S_textColoum>,
    },
    {
      field: "dsa",
      headerName: " ",
      width: 50,
      renderCell: () => (
        <FiMoreHorizontal style={{ width: "30px", height: `30px` }} />
      ),
    },
  ];
  const rows = dataPost;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <NaviHome>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#F4F5F6",
          p: 3,
          marginTop: `92px`,
        }}
      >
        <Toolbar
          style={{
            padding: `0`,
            display: `flex`,
            justifyContent: `space-between`,
          }}
        >
          <Typography style={{ fontWeight: `600` }} variant="h4">
            Reward Management{" "}
          </Typography>
          <div>
            <Button
              onClick={handleClickOpen}
              sx={{ padding: `10px` }}
              variant="contained"
              color="success"
            >
              + New voucher
            </Button>

            <Dialog open={open} onClose={handleClose}>
              {<PaymentChildren />}
            </Dialog>
          </div>
        </Toolbar>

        {dataPost && (
          <Box sx={{ height: 650, bgcolor: "#fff" }}>
            <S_dataGrid
              rows={rows || null}
              columns={columns || null}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        )}
      </Box>
    </NaviHome>
  );
};

export default Payment;
