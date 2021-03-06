import React, { useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ActivityCard from './ActivityCard'
import './CountryDetail.css'

const CountryDetail = () => {
    const {countryId} = useParams();
    const dispatch = useDispatch();
    
     useEffect(() => {
        dispatch(getCountry(countryId));
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country);

    return(
        <div className="details-container">
            <div className='flex'>
            <Link to='/home'>
                <button className='back'>Volver</button>
            </Link>
            </div>
            <div className="grid-container">
                <div className="country-info">
                    <h1 className="country-name">{country.name}, {country.id}</h1>
                    <div className="country-details">
                        <div className="country-flag">
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe width="100%" height="100%" id="gmap_canvas" src={`https://maps.google.com/maps?q=${country.name}&t=&z=5&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="map"></iframe>
                                </div>
                            </div>
                            {country.activities && country.activities.map(
                            (activity) => <ActivityCard  
                            name={activity.name}  
                            difficulty={activity.difficulty}
                            duration={activity.duration} 
                            season={activity.season} />)}
                            
                        </div>
                        <div className="details">
                            <ul>
                                <li>Continent: {country.continent}</li>
                                <li>Subregion: {country.subregion}</li>
                                <li>Capital: {country.capital}</li>
                                <li>Area: {Intl.NumberFormat('en-US').format(country.area)} Km&sup2;</li>
                                <li>Population: {Intl.NumberFormat('en-US').format(country.population)} habitants </li>
                                <img src={country.img} alt="flag not found" className='flag'/>
                            </ul>     
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};
export default CountryDetail;
//Intl.NumberFormat()
//Constructor de objetos que permiten formatear los n??meros en funci??n del idioma.

