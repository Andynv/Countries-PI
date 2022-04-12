import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import travelVideo from '../../assets/travel.mp4'

const LandingPage = () => {
    return (
        <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src={travelVideo} type='video/mp4' />
            </video>
            <div className='content'>
                <h1>Descubre todos los países del mundo </h1>
                <p>Countries App es una aplicación destinada a mostrarte información de diferentes partes del mundo</p>
                <div>
                    <Link to='/home'>
                    <button className='btn-landing'>Bienvenido</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default LandingPage;