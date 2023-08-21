import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  // Button,
  CardActions,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieBox = ({ item }) => {
  const { id, poster_path } = item;

  return (
    <Card
      style={{
        maxWidth: 350,
        marginTop: 15,
        background: "#0f151f",
        borderRadius: 10,
        height: 600,
      }}
    >
      <Link style={{ textDecoration: "none" }} to={`/moviepage/${id}`}>
        <CardActionArea>
          <CardMedia
            sx={{ width: 300, height: 400, margin: 3, borderRadius: 3 }}
            component="img"
            image={`${process.env.REACT_APP_POSTER_API}${poster_path}`}
            alt="movie poster"
          />
          <CardContent style={{ color: "white" }}>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2">{item.release_date}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default MovieBox;
