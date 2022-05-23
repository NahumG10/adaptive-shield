import React, { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./MainPage";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    // fetching all photos
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
      });

    // fetching all albums
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  useEffect(() => {
    // showing the data after finishing loading
    if (photos && albums) {
      setIsLoading(false);
    }
  }, [photos, albums]);

  return (
    <>{isLoading ? <Loader /> : <MainPage photos={photos} albums={albums} />}</>
  );
}

export default App;
