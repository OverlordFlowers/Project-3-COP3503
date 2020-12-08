import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Catalog from "./Catalog";
import Footer from "./Footer";
import Playlist from "./Playlist";

function Main() {
  const [song, setSong] = useState([]);
  const [songIndex, setSongIndex] = useState();
  const [searchValue, setSearch] = useState(-1);
  const [playlistData, setPData] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [spotifyIDs, setSpotify] = useState([]);
  const spotifyAuth =
    "BQDDp-hfQXIGo4V1rFFgDZeUQEOeujwfr4uGmudVyhpna5KoAazfDdnVF2zSvPsEQaPKNa6BSg_Lyg2cC90";
  //This will be a temp or default value
  let playlistDataDefault = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
      song: "SICKO MODE",
      albumn: "ASTROWORLD",
      artist: "Travis Scott",
    },
  ];
  let spotifyIDInital = [
    { spotifyId: "2xLMifQCjDGFmkHkpNLD9h" },
    { spotifyId: "2xLMifQCjDGFmkHkpNLD9h" },
  ];

  useEffect(() => {
    setPData(playlistDataDefault);
    setSong(playlistDataDefault[0]);
    setSongIndex(0);
    setSpotify(spotifyIDInital);
  }, []);

  const setSlideValue = (event) => {
    const { name, value } = event.target;
    valueList[name] = Number(value);
    setValueList(valueList);
  };

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
        console.log("Error from spotifyFetch function!");
        console.log(err);
      });
  };

  const getData = async (idList) => {
    let songData = [];
    for (let i = 0; i < Object.keys(idList).length; i++) {
      await spotifyFetch(idList[i])
        .then((data) => {
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

          return objectData;
        })
        .then((object) => {
          songData.push(object);
        });
    }
    setPData(songData);
    setSongIndex(0);
    setSong(songData[0]);
  };

  const backendFetch = (target, search) => {
    // Request Body
    const url = "http://localhost:8000/api/" + target + "/" + search;

    return axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("Error!");
        console.log(err);
      });
  };

  const searchUpdate = async (target, search) => {
    await backendFetch(target, search)
      .then((data) => {
        if (data === undefined) {
          console.log("backend error");
          return;
        }
        setSpotify(data.data);
        return data;
      })
      .then((data) => {
        if (data === undefined) {
          console.log("backend error 2");
          return;
        }
        getData(data.data)
          .then(() => {
            console.log("playlist updated");
          })
          .catch(() => {
            console.log("spotify fetch error");
          });
      });

    setSearch(null);
  };

  useEffect(() => {
    let computedEmotionValue = Math.round(
      5000 +
        valueList["Happiness"] * valueList["Excited"] -
        valueList["Sadness"]
    );

    async function performUpdate(target) {
      await searchUpdate(target, searchValue).then(() => {
        console.log("updated search");
      });
    }

    performUpdate(computedEmotionValue);
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
      {playlistData !== [] || playlistData !== undefined ? (
        <Playlist data={playlistData} changeSong={changeSong} />
      ) : null}
      <Catalog />
      <Footer />
    </div>
  );
}

export default Main;
