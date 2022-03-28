import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { findCountry } from "../../actions";
import './SearchBar.css'

function SearchBar() {
  const dispatch = useDispatch();
  //creamos nuestro estado local
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);//Guardamos lo que va apaareciendo en nuetro input
  };
   
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(findCountry(name));//mi estado local que va a llegarle a la action y le llega la back
    setName('')
  };

  return (
      <div>
      <input
        className='search-input' type="text" placeholder="Buscar pais..." value={name} onChange={e => handleInputChange(e)}
      />
      <button className='search-button' type="submit" onClick={e => handleClick(e)}>Buscar</button>
      </div>
  );
};
export default SearchBar;