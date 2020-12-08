import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Catalog from "./Catalog";
import Footer from "./Footer";
import Playlist from "./Playlist";
import LoadingPage from "./LoadingPage";

function Main() {
  // These are variables that need to be tracking in state management
  const [song, setSong] = useState([]);
  const [songIndex, setSongIndex] = useState();
  const [searchValue, setSearch] = useState(null);
  const [playlistData, setPData] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [spotifyIDs, setSpotify] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // This spotify auth token only lasts for an hour
  const spotifyAuth =
    "BQB8qSa57TC2CLZVy1Xih83nM_O_hTyvOrF5rgyqX2rnH9o0TBKWRRFypxQJ5Ga8B6O4ixg83SixCsIo8tU";
  // This will be a default value
  let playlistDataDefault = [
    {
      image: "https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3",
      song: "SICKO MODE",
      albumn: "ASTROWORLD",
      artist: "Travis Scott",
    },
  ];
  // This will be a default value
  let spotifyIDInital = [{ spotifyId: "2xLMifQCjDGFmkHkpNLD9h" }];

  // We need to initalize these variables to these values only when the page loads
  useEffect(() => {
    setValueList({ Happiness: 0, Sadness: 0, Excited: 0 });
    setPData(playlistDataDefault);
    setSong(playlistDataDefault[0]);
    setSongIndex(0);
    setSpotify(spotifyIDInital);
  }, []);

  // This function is passed into other components to set slide value
  const setSlideValue = (event) => {
    const { name, value } = event.target;
    valueList[name] = Number(value);
    setValueList(valueList);
  };

  // This function allows the playlist to change the song displayed
  const changeSong = (index) => {
    let length = Object.keys(playlistData).length;

    // If out of range, go to the other end of the playlist
    if (index >= length) {
      index = 0;
    }

    if (index < 0) {
      index = length - 1;
    }

    setSong(playlistData[Number(index)]);
    setSongIndex(Number(index));
  };

  // This function will fetch data using spotify's api
  const spotifyFetch = (spotifyID) => {
    // Headers
    const config = {
      headers: {
        Authorization: "Bearer " + spotifyAuth,
      },
    };

    // Request URL
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

  // This function will get the data needed from spotify in the format needed
  const getData = async (idList) => {
    let songData = [];
    // For each song, compile the relevent information
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
    // update playlist and displayed song
    setPData(songData);
    setSongIndex(0);
    setSong(songData[0]);
  };

  // this fetch is for an api call to our express server
  const backendFetch = (target, search) => {
    // Request url
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

  // this function will do all the required tasks when searching is needed
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
  };

  // when the search value is changed (button pressed), we will perform the needed search
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
    if (searchValue === null) {
      return;
    }

    setLoading(true);
    performUpdate(computedEmotionValue);
    setSearch(null);
  }, [searchValue]);

  // the loading screen will stop being displayed when we get a change in displayed song
  useEffect(() => {
    setLoading(false);
  }, [song]);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="large-container">
          <Banner
            curentSong={song}
            songIndex={songIndex}
            changeSong={changeSong}
            searchButton={setSearch}
            setSlideValue={setSlideValue}
            valueList={valueList}
          />
          {playlistData !== [] || playlistData !== undefined ? (
            <Playlist data={playlistData} changeSong={changeSong} />
          ) : null}
          <Catalog />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Main;
