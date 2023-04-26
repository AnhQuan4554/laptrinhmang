import React from "react";
import {
  Box,
  Typography,
  styled,
  Avatar,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
  Dialog,
} from "@mui/material";
import locationShow from "../../img/ImgCurrent/locationShow.png";
import paymentShow from "../../img/ImgCurrent/paymentShow.png";
import handShow from "../../img/ImgCurrent/handShow.png";
import documentShow from "../../img/ImgCurrent/documentShow.png";
import NaviHome from "../Home/index";
import PostChildren from "../pageChildren/PostChildren";
const S_tittle = styled(Typography)({
  fontWeight: `600`,
  fontSize: `28px`,
  lineHeight: `44px`,
  color: `#141416`,
});
const S_location = styled(Box)({
  display: `flex`,
  alignItems: `center`,
  marginTop: `8px`,
});
const S_wrapCard = styled(Grid)({
  marginTop: `10px`,
});

const Overview: React.FC<any> = ({ show }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <NaviHome>
      <div style={{ marginTop: `72px`, padding: `32px` }}>
        <S_tittle variant="h3">Welcome back, Milly Nguyen</S_tittle>
        <S_location>
          <Avatar
            src={locationShow}
            sx={{ width: `18px`, height: `20px`, marginRight: `10px` }}
          />
          <Typography variant="h6">South Australia(SA), 5583</Typography>
        </S_location>
        <S_wrapCard container spacing={3}>
          <Grid
            xs={6}
            item
            sx={{ "& .MuiCardContent-root": { padding: `10px` } }}
          >
            {" "}
            <Card>
              <CardActionArea>
                <CardContent>
                  <img
                    style={{ width: `36px`, height: `48px` }}
                    src={documentShow}
                  />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Add a new post
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: `flex`, justifyContent: `center` }}>
                <Button
                  size="large"
                  sx={{ width: `90%` }}
                  variant="contained"
                  color="success"
                  onClick={handleClickOpen}
                >
                  New Post
                </Button>
              </CardActions>
              <Dialog open={open} onClose={handleClose}>
                {<PostChildren />}
              </Dialog>
            </Card>
          </Grid>
          <Grid
            xs={6}
            item
            sx={{ "& .MuiCardContent-root": { padding: `10px` } }}
          >
            {" "}
            <Card>
              <CardActionArea>
                <CardContent>
                  <img
                    style={{ width: `36px`, height: `48px` }}
                    src={locationShow}
                  />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Add a new location to the application map
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: `flex`, justifyContent: `center` }}>
                <Button
                  size="large"
                  sx={{ width: `90%` }}
                  variant="contained"
                  color="success"
                >
                  New Post
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </S_wrapCard>
        <S_wrapCard container spacing={3}>
          <Grid
            xs={6}
            item
            sx={{ "& .MuiCardContent-root": { padding: `10px` } }}
          >
            {" "}
            <Card>
              <CardActionArea>
                <CardContent>
                  <img
                    style={{ width: `36px`, height: `48px` }}
                    src={handShow}
                  />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Add new rewards and vouchers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: `flex`, justifyContent: `center` }}>
                <Button
                  size="large"
                  sx={{ width: `90%` }}
                  variant="contained"
                  color="success"
                >
                  New Post
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            xs={6}
            item
            sx={{ "& .MuiCardContent-root": { padding: `10px` } }}
          >
            {" "}
            <Card>
              <CardActionArea>
                <CardContent>
                  <img
                    style={{ width: `36px`, height: `48px` }}
                    src={paymentShow}
                  />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Update the amount of used money for donations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: `flex`, justifyContent: `center` }}>
                <Button
                  size="large"
                  sx={{ width: `90%` }}
                  variant="contained"
                  color="success"
                >
                  New Post
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </S_wrapCard>
      </div>
    </NaviHome>
  );
};

export default Overview;
