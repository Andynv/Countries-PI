import React from "react";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterByActivity, getActivities, sortPopulation, filterByContinent, sortByName, getAllCountries}  from '../../actions'
import { Link } from 'react-router-dom'
import CountryCard from '../Details/CountryCard'
import Paginado from "../Utils/Paginado"
import SearchBar from "../Utils/SearchBar";
import './Home.css'

function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector((state) => state.activities);

    //INICIO DEL PAGINADO
    // Pagina actual 
    const [order, setOrder] = useState('');
    //Modificamos el estado local
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPage, setCountriesPage] = useState(10);
    const LastCountry = currentPage * countriesPage; // indice de la ultima carta
    const FirstCountry = LastCountry - countriesPage; //
    
  
    // toma el arreglo y toma una porcion de lo que le estoy pasando por parametro, que es el indice del primer personaje  el indice del ultimo personaje
    const currentCountries = currentPage === 1
    ? allCountries.slice(FirstCountry, LastCountry -1) 
    : allCountries.slice(FirstCountry, LastCountry)
    const paginado = (totalPages) => {
        setCurrentPage(totalPages);
    };
    //FIN DEL PAGINADO

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])//ejecutalo siempre y cuando tengamos un dispatch
     
    useEffect(()=>{
        dispatch(getActivities())
    }, [dispatch])


    const handleClick = (e) => {
       e.preventDefault();
       dispatch(getAllCountries())
       setCurrentPage(1);
    };

    const handleSortingName = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Sorted ${e.target.value}`)
    };

    const handleContinentFilter = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
        setOrder(`Sorted ${e.target.value}`)
    };

    const handleSortingPopulation = (e) => {
        e.preventDefault();
        dispatch(sortPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`Sorted ${e.target.value}`);
    };
    const handleFilterActivity = (e) => {
        // Se toma como payload el value de la option que elija el usuario
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className='home'>
            <div className='search-container'>
                <div>
                <SearchBar />
                </div>
                <div className='first-text'>
            <h1>Países del mundo</h1>
            </div>
                <div>
                    <Link to='/activity/create'>
                        <button className='create'>Crear Actividad</button>
                    </Link>
                </div>
            </div>
                                                {/* FILTROS */}
        <div className='filter-container'>
            <div>
                                              {/* ORDER BY NAME */}
            <select onChange={e => handleSortingName(e)} className='name-order'>
                {/** Deben ser filtrados ascendente y descendente por orden alfabetico y por cantidad de poblacion
                 */}
                <option vale='All'>Ordenar por nombre</option> 
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            </div>
            <div>
                                             {/* ORDER BY POPULATION */}
            <select onChange={e => handleSortingPopulation(e)} className='population-order'>
                 <option value='All'>Order by population</option>
                 <option value='asc'>Ascendent</option>
                 <option value='desc'>Descendent</option>
            </select>
            </div>
            <div>
                                    {/* ORDER BY CONTINENT */}
            <select onChange={e => handleContinentFilter(e)} className='continent-order'>
                {/* filtrar por continente y por tipo de actividad turística */}
                <option value="All">Filter by continent</option>
                <option value="Africa">Africa</option>
                <option value="North America">America del Norte</option>
                <option value="South America">America del Sur</option>
                <option value="Antarctica">Antartica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
            </select>
            </div>
            <div>
                                {/* ORDER BY ACTIVITIES */}
            <select onChange={e => handleFilterActivity(e)} className='activities-order'>
                <option value="All">Activities</option>
                { allActivities && allActivities.map(activity => (
                    <option value={activity.name}>{activity.name}</option>
                ))}
            </select>
            </div>
            <div>
                                        {/* REFRESH PAGE */}
            <button className='refresh' onClick={event => handleClick(event)}>Refresh</button>
                </div>
            </div>
            <hr className='line' />
            <Paginado 
                countriesPage={countriesPage}
                allCountries={allCountries.length}
                paginado={paginado}
            />
            <div className='grid'>
{/* Si tenemos countries , lo mapeamamos y  le pasamos nuestro componente card con los elemento que vamos a renderizar */}
            {currentCountries?.map(country => {
                return ( 
                <div className='card-container'>
                <Link to={'/home/' + country.id}>
                <CountryCard 
                name={country.name} 
                img={country.img} 
                continent={country.continent}
                id={country.id}
                population={country.population}
                key={country.id}/>
                </Link>
                </div>
                )
                })}
            </div>
            <div>  
            </div>  
        </div>
    );
};

export default Home;