import { Card, CardActionArea, CardMedia, CardContent,Typography, Button, CardActions } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const IMG_API_URL = process.env.REACT_APP_POSTER_API

const MovieBox = ({item}) => {
  return (
    <Card style={ {maxWidth: 350, marginTop:15, background:"#1c1d1f", borderRadius:10 } }>
      <Link style={{ textDecoration: 'none' }} to = {`/moviepage/${item.id}`}>
        <CardActionArea>
            <CardMedia
            sx={{width:300, height: 400, margin:3, borderRadius:3}}
            component="img"
            image={IMG_API_URL + item.poster_path}
            alt="movie poster"
            />
            <CardContent style ={{color:"white"}}>
            <Typography gutterBottom variant="h6" component="div">
                {item.title}
            </Typography>
            <Typography variant="body2" >
                {item.release_date}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Link>
        <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
        
    </Card>
  )
}

export default MovieBox