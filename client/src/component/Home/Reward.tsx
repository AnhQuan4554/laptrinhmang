import React, { useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  Box,
  Toolbar,
  Typography,
  styled,
  Avatar,
  Button,
  Dialog,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import NaviHome from "../Home/index";
import { changeIndexPage, getDataReward } from "../../store/reducer";
import RewardChildren from "../pageChildren/RewardChildren";
import { RootState } from "../../store/store";

const Post: React.FC<any> = () => {
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
  const dispath = useDispatch();
  const dataPost = useSelector(
    (state: RootState) => state.dataPostReducer.dataReward
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "VOUCHER CODE",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6" sx={{ color: "green" }}>
          {params.id.toString().slice(0, 8)}
        </Typography>
      ),
    },
    {
      field: "wrapVoucher",
      headerName: "VOUCHER INFORMATION",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <>
          <Avatar
            sx={{ width: `28px`, height: `28px`, marginRight: `20px` }}
            src={params.row.imgVocher}
          />
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            {" "}
            {params.row.contentVocher}
          </Typography>
        </>
      ),
    },
    {
      field: "expiredDate",
      headerName: "EXPIRED DATE",
      // type: "number",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6">{params.row.expiredDate}</Typography>
      ),
    },
    {
      field: "activeDate",
      headerName: "ACTIVED DATE",
      sortable: false,
      width: 250,
      renderCell: (param) => (
        <Typography variant="h6"> {param.row.activeDate}</Typography>
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
      width: 80,
      renderCell: () => (
        <FiMoreHorizontal style={{ width: "30px", height: `30px` }} />
      ),
    },
  ];

  //chinh sua index
  dispath(changeIndexPage(3));
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
            Post Management{" "}
          </Typography>
          <div>
            <Button
              onClick={handleClickOpen}
              sx={{ padding: `10px` }}
              variant="contained"
              color="success"
            >
              + New Post
            </Button>

            <Dialog open={open} onClose={handleClose}>
              {<RewardChildren />}
            </Dialog>
          </div>
        </Toolbar>

        {dataPost && (
          <Box sx={{ height: 650, bgcolor: "#fff" }}>
            <S_dataGrid
              rows={rows}
              columns={columns}
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

export default Post;
