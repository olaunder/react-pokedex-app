import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import axios from "axios";
import Spinner from "./Spinner";
export default function PokeAPI() {
  const [name, setname] = useState("");
  const [Find, setFind] = useState("pikachu");
  const [Img, setImg] = useState("");
  const [Id, setId] = useState("");
  const [Type, setType] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [disName, setdisName] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    document.title = 'Pokedex App';
    async function getData() {

      try {
        let searchQuery = Find.toLowerCase();
        setLoading(true);
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
        setImg(res.data.sprites.front_default);
        setId(res.data.id);
        setType(res.data.types[0].type.name);
        setHeight(res.data.height*10);
        setWeight(res.data.weight/10);
        setdisName(Find);
        setLoading(false);

      } catch (error) {
        setLoading(false);
        Swal.fire({
          // icon: 'error',
          title: 'Oops...',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/188/188987.png',
          imageHeight: '100',
          imageWidth: '100',
          text: 'Invalid Pokemon name!',
        })
      }

    }

    getData();
  }, [Find]);

  const Typename = (event) => {
    setname(event.target.value);
  };

  const Search = () => {
    if (name !== "") setFind(name);
    setname("");
  };

  return (
    <>
      <div className="back">
        <div className="card">
          <img src={`${Img}`} alt="" />
          <div className="name">Name: {disName.toUpperCase()}</div>
          <div className="id">Number: {Id}</div>
          <div className="type">Type: {Type}</div>
          <div className="height">Height: {Height} cm</div>
          <div className="weight">Weight: {Weight} kg</div>
          <input type="text" onChange={Typename} value={name} />

          {/* <button className="searchBtn" onClick={Search}>Search</button> */}
          <button class="btn btn-round b-level-1 b-type-4" onClick={Search}>Search</button>
        </div>
      </div>

      {loading && <div id="cover-spin"><Spinner /></div>}
    </>
  );
}