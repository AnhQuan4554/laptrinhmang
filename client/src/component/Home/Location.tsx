import React, { CSSProperties, useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  styled,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { FiMoreHorizontal } from "react-icons/fi";
import { DialogChoose } from "../dialog/DialogChoose";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NaviHome from "../Home/index";
import LocationChildren from "../pageChildren/LocationChildren";
import {
  changeIndexPage,
  getDataLocation,
  deleteIdItem,
} from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BeatLoader } from "react-spinners";
const Location: React.FC<any> = () => {
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
  const styleOpenBox = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
  const dispath = useDispatch();
  const dataLocation = useSelector(
    (state: RootState) => state.dataPostReducer.dataLocation
  );
  const [openIcon, setOpenIcon] = useState(false);
  let [loading, setLoading] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ADDRESS ID",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <>
          <Typography variant="h6" sx={{ color: "green" }}>
            {params.id.toString().slice(0, 8)}
          </Typography>
        </>
      ),
    },
    {
      field: "wrapAdress",
      headerName: "ADDRESS",
      width: 300,
      editable: true,
      renderCell: (params) => (
        <>
          <Avatar
            sx={{ width: `28px`, height: `28px`, marginRight: `20px` }}
            src={params.row.imgAddress}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", overflow: "hidden" }}
          >
            {" "}
            {params.row.contentAddress}
          </Typography>
        </>
      ),
    },
    {
      field: "location",
      headerName: "LOCATION",
      // type: "number",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <Typography variant="h6">{params.row.location}</Typography>
      ),
    },
    {
      field: "addedDate",
      headerName: "ADDED DATE",
      sortable: false,
      width: 250,

      renderCell: (param) => (
        <Typography variant="h6"> {param.row.addedDate}</Typography>
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
      field: "iconChose",
      headerName: " ",
      width: 80,
      renderCell: (params) => {
        const handleClickOpenIcon = (e: any) => {
          e.preventDefault();

          dispath(deleteIdItem(params.id));
          setOpenIcon(true);
        };

        return (
          <>
            <FiMoreHorizontal
              onClick={handleClickOpenIcon}
              style={{ width: "30px", height: `30px` }}
            />
            <DialogChoose
              testId={params.id}
              setLoading={setLoading}
              openIcon={openIcon}
              setOpenIcon={setOpenIcon}
            />
          </>
        );
      },
    },
  ];

  //chinh sua index
  dispath(changeIndexPage(2));

  const rows = dataLocation;

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
            Location Management{" "}
          </Typography>
          <div>
            <Button
              onClick={handleClickOpen}
              sx={{ padding: `10px` }}
              variant="contained"
              color="success"
            >
              + New Location
            </Button>

            <Dialog open={open} onClose={handleClose}>
              {<LocationChildren />}
            </Dialog>
          </div>
        </Toolbar>

        {dataLocation && (
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
      <BeatLoader
        loading={loading}
        cssOverride={override}
        size={25}
        color="#36d7b7"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </NaviHome>
  );
};

export default Location;
