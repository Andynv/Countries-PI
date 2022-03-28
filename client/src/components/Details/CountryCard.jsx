import React from "react";
import { Link } from "react-router-dom";
import './CountryCard.css'

const CountryCard = ({img, name, continent, population, id}) => { 
    return (
        <div className='card'>
            <div>   
            <img src={img} alt="imagen no encontrada" width='240px' height='125px' className='country-image'/>
            <Link to={'/home/' + id}></Link><h3>{name}, {id}</h3>
            <h5>Continent: {continent}</h5>
            <h5>Population: {population}</h5>
            </div>
        </div>
    );
};

export default CountryCard;