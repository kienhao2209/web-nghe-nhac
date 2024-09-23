import React, { useState, useEffect } from "react";
import "../styles/LeftMenu.css";
import { FaPlus } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import { PlayList } from "./PlayList";
import axios from 'axios';


function MenuPlayList() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/playlists');
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const addPlaylist = async () => {
    if (newPlaylistName.trim() !== "") {
      try {
        const newPlaylist = { name: newPlaylistName, songs: [] };
        const response = await axios.post('http://localhost:4000/api/playlists', newPlaylist);
        setPlaylists([...playlists, response.data]);
        setNewPlaylistName("");
      } catch (error) {
        console.error("Error adding playlist:", error);
      }
    }
  };

  const removePlaylist = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/playlists/${id}`);
      setPlaylists(playlists.filter((playlist) => playlist._id !== id));
    } catch (error) {
      console.error("Error removing playlist:", error);
    }
  };

  return (
    <div className="playListContainer">
      <div className="nameContainer">
        <p>Playlists</p>
        <i onClick={addPlaylist}>
          <FaPlus />
        </i>
      </div>

      <div className="playListScroll">
        {PlayList &&
          PlayList.map((list) => (
            <div className="playLists" key={list._id}>
              <i className="list">
                <BsMusicNoteList />
              </i>
              <p>{list.name}</p>
              <button onClick={() => removePlaylist(list._id)}>Remove</button>
            </div>
          ))}
      </div>

      <div className="addPlaylistContainer">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New Playlist Name"
        />
        <button onClick={addPlaylist}>Add Playlist</button>
      </div>
    </div>
  );
}

export { MenuPlayList };
