import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Catalog from "./Catalog";
import Footer from "./Footer";
import Playlist from "./Playlist";

function Main() {
  let playlistData = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
      song: "SICKO MODE",
      albumn: "ASTROWORLD",
      artist: "Travis Scott",
    },
  ];

  const [song, setSong] = useState([]);
  const [songIndex, setSongIndex] = useState();
  // const [playlistData, setPData] = useState([]);

  const spotifyAuth =
    "BQC-QcUYiOdrYj4KnaT__4NzIWb7TNOhodnC8koXgBcx9dA0-9h9UUDxCDiC5KyVFVaOB8vbZnS87JKe_gA";

  let spotifyIDs = [
    { spotifyId: "2xLMifQCjDGFmkHkpNLD9h" },
    { spotifyId: "2xLMifQCjDGFmkHkpNLD9h" },
  ];

  const spotifyFetch = (spotifyID) => {
    // Headers
    const config = {
      headers: {
        Authorization: "Bearer " + spotifyAuth,
      },
    };

    // Request Body
    const url = "https://api.spotify.com/v1/tracks/" + spotifyID;

    return axios
      .get(url, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Error!");
        console.log(err);
      });
  };

  const getData = async (idList) => {
    for (let i = 0; i < Object.keys(idList).length; i++) {
      await spotifyFetch(idList[i].spotifyId).then((data) => {
        let artist = data.artists[0].name;
        let song = data.name;
        let albumn = data.album.name;
        let image = data.album.images[0].url;

        let previousData = playlistData;
        let objectData = {
          artist: artist,
          albumn: albumn,
          image: image,
          song: song,
        };

        // setPData(previousData, objectData);
      });
    }
  };

  useEffect(() => {
    getData(spotifyIDs);

    // setPData(playlistDataTest);
    setSong(playlistData[0]);
    setSongIndex(0);
  }, []);

  const changeSong = (index) => {
    let length = Object.keys(playlistData).length;
    if (index >= length) {
      index = 0;
    }

    console.log(index);
    if (index < 0) {
      index = length - 1;
    }
    setSong(playlistData[index]);
    setSongIndex(index);
  };

  return (
    <div className="large-container">
      <Banner curentSong={song} songIndex={songIndex} changeSong={changeSong} />
      <Playlist data={playlistData} changeSong={changeSong} />
      <Catalog />
      <Footer />
    </div>
  );
}

export default Main;
