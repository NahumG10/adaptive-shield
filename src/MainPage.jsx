import React, { useState, useRef, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { TextField, Grid } from "@mui/material";
import Dropdown from "./components/Dropdown";
import AlbumModal from "./components/AlbumModal";
import useLazyList from "./hooks/useLazyList";
import Loader from "./components/Loader";

export default function MainPage({ photos, albums }) {
  const [currentModalPhoto, setCurrentModalPhoto] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedAlbum, setSelectedAlbum] = useState(1);

  //custom hook for getting data in lazy mode
  const { isLoading, hasMore, visibileList } = useLazyList(
    photos,
    pageNumber,
    search,
    selectedAlbum
  );

  const observer = useRef();

  // setting ref to the last element in the current presented list
  const lastAlbumElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      // disconnecting observer when loading more content
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // add page to current visible list
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <div className="inputs">
        <Typography variant="h2" component="div" color={"#fff"} gutterBottom>
          Photo Album Page
        </Typography>
        <Dropdown
          options={albums}
          selectedItem={selectedAlbum}
          setSelectedItem={setSelectedAlbum}
          label="Album"
        />
        <TextField
          id="outlined-basic"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Grid
        container
        columnGap={2}
        rowGap={2}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {/* rendering the current visible list */}
        {visibileList.map((photo, index) => {
          return (
            <Card
              key={photo.id}
              sx={{ width: 300 }}
              ref={
                visibileList.length === index + 1 ? lastAlbumElementRef : null
              }
            >
              <CardActionArea
                onClick={() => {
                  // open the modal and change it's details
                  setCurrentModalPhoto(photo);
                  setIsModalShown(true);
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.url}
                  alt="some photo"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {photo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    id :{photo.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Album: {photo.albumId}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="body2" color="text.secondary">
                    {photo.url}
                  </Typography>
                </CardActions>
              </CardActionArea>
            </Card>
          );
        })}
      </Grid>

      {isLoading && <Loader />}

      <AlbumModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        albums={albums}
        currPhoto={currentModalPhoto}
      />
    </>
  );
}
