import axios from 'axios'

export const GET_ACTIVITY = 'GET_ACTIVITY';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_POPULATION = 'SORT_POPULATION';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'; 

export const getAllCountries = () => async (dispatch) => {
    let response = await axios.get('http://localhost:3001/countries');
    return dispatch({ 
        type: GET_ALL_COUNTRIES,
        payload: response.data,
    });
};

export const getCountry = (payload) => async (dispatch) => {
    let response = await axios.get('http://localhost:3001/countries/' + payload);
    return dispatch({
        type: GET_COUNTRY,
        payload: response.data,
    });
};

export const findCountry = (name) => async (dispatch) => {
    let response = await axios.get('http://localhost:3001/countries?name=' + name);
    return dispatch({
        type: SEARCH_COUNTRY,
        payload: response.data,
    }); 
};

export const filterByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload,
    };
};

export const sortByName = (payload) => {
    return {
        type: SORT_BY_NAME,
        payload,
    };
};

export const sortPopulation = (payload) => {
    return {
        type: SORT_POPULATION,
        payload,
    };
};
// ACTIVIDADES
export const postActivity = (payload) => async () => {
    let json = await axios.post('http://localhost:3001/activity', payload);
    return json;
};

export const getActivities = () => async (dispatch) => {
        let json = await axios.get('http://localhost:3001/activity');
        return dispatch({
            type: GET_ACTIVITY,
            payload: json.data   
     });
};

export const filterByActivity = (payload) => {
    return {
        type: FILTER_ACTIVITY,
        payload,
    };
};