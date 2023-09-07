import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  // Button,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

const MovieBox = ({ id, poster_path, title, release_date }) => {
  // const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <Card
      style={{
        width: 250,
        marginTop: 15,
        background: '#010100',
        borderRadius: 10,
        height: 500,
        position: 'relative',
      }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {/* {console.log(item, 'items')} */}
      <Link style={{ textDecoration: 'none' }} to={`/moviepage/${id}`}>
        <CardActionArea>
          <CardMedia
            sx={{ width: 250, height: 350, borderRadius: 3 }}
            component="img"
            image={`${process.env.REACT_APP_POSTER_API}${poster_path}`}
            alt="movie poster"
          />
          <CardContent style={{ color: 'white' }}>
            <Typography
              align="center"
              gutterBottom
              variant="h6"
              component="div"
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions></CardActions>
    </Card>
  );
};

export default MovieBox;
