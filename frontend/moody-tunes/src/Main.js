import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Catalog from "./Catalog";
import Footer from "./Footer";
import Playlist from "./Playlist";

function Main() {
  //This will be a temp or default value
  let playlistDataDefault = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
      song: "SICKO MODE",
      albumn: "ASTROWORLD",
      artist: "Travis Scott",
    },
  ];

  const [song, setSong] = useState([]);
  const [songIndex, setSongIndex] = useState();
  const [searchValue, setSearch] = useState(-1);
  const [playlistData, setPData] = useState([]);
  const [valueList, setValueList] = useState([]);

  const spotifyAuth =
    "BQBpN21o6Fq16tZz_aN9WZw3qbSZ7Ad5lAZt3_amWwFfw_B6Y0go9h6uJ4YewK1Xg2JrZgg5WI9cBCNgg_0";
  //This is OUR api call data
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

  const setSlideValue = (event) => {
    const { name, value } = event.target;
    valueList[name] = Number(value);
    setValueList(valueList);
  };

  const getData = async (idList) => {
    let songData = [];
    for (let i = 0; i < Object.keys(idList).length; i++) {
      await spotifyFetch(idList[i].spotifyId).then((data) => {
        let artist = data.artists[0].name;
        let song = data.name;
        let albumn = data.album.name;
        let image = data.album.images[0].url;

        let objectData = {
          artist: artist,
          albumn: albumn,
          image: image,
          song: song,
        };

        songData.push(objectData);
      });
    }

    setPData(songData);
  };

  useEffect(() => {
    setPData(playlistDataDefault);
    setSong(playlistDataDefault[0]);
    setSongIndex(0);
  }, []);

  const changeSong = (index) => {
    let length = Object.keys(playlistData).length;
    if (index >= length) {
      index = 0;
    }

    if (index < 0) {
      index = length - 1;
    }
    setSong(playlistData[index]);
    setSongIndex(index);
  };

  useEffect(() => {
    let computedEmotionValue = Math.round(
      5000 +
        valueList["Happiness"] * valueList["Excited"] -
        valueList["Sadness"]
    );
    console.log(computedEmotionValue);
    if (searchValue === 0) {
      console.log("BFS");
    } else if (searchValue === 1) {
      console.log("DFS");
      getData(spotifyIDs);
      console.log(playlistData);
    }
    setSearch(null);
  }, [searchValue]);

  return (
    <div className="large-container">
      <Banner
        curentSong={song}
        songIndex={songIndex}
        changeSong={changeSong}
        searchButton={setSearch}
        setSlideValue={setSlideValue}
        valueList={valueList}
        setValueList={setValueList}
      />
      {playlistData !== [] ? (
        <Playlist data={playlistData} changeSong={changeSong} />
      ) : null}
      <Catalog />
      <Footer />
    </div>
  );
}

export default Main;
