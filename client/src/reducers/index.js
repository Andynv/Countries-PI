import {FILTER_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITY, GET_ALL_COUNTRIES, GET_COUNTRY, SEARCH_COUNTRY, SORT_BY_NAME, SORT_POPULATION, } from '../actions'
//Un _reducer_ es una función que recibe el estado previo de un Store y un acción y retorna el nuevo estado.
const initialState = {
    countries : [],
    allCountries : [],
    activities : [],
    country: {}
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload, //en mi estado countries, manda todo lo que te mande mi estado getcountries
                allCountries: action.payload
            };
        case SEARCH_COUNTRY: 
            return {
                ...state,
                countries: action.payload
            };
        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            let filteredContinent = allCountries;
            if (action.payload) {
                filteredContinent = allCountries.filter(
                    country => country.continent.toLowerCase().includes(action.payload.toLowerCase()));
            }
            return {
                ...state,
                countries: filteredContinent
            };
        case SORT_BY_NAME: 
        let ordered = state.countries;
        //ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.
        if(action.payload.toLowerCase() === 'asc'){
            ordered = state.countries.sort((a, b) => {
                if (a.name > b.name) return 1;// es mayor que 0, se sitúa b en un indice menor que a
                if (a.name < b.name) return -1; //s menor que 0, se sitúa a en un indice menor que b. Es decir, a viene primero.
                return 0// retorna 0, se deja a y b sin cambios entre ellos,;
            });
        }else if(action.payload.toLowerCase() === 'desc'){
            ordered = state.countries.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        }
            return {
                ...state,
                countries: ordered
            };
        case SORT_POPULATION:
            let sortedPopulation = state.countries;
            if(action.payload.toLowerCase() === 'asc'){
                sortedPopulation = state.countries.sort((a, b) => {
                    if(a.population > b.population) return 1
                    if(a.population < b.population) return -1
                    return 0
                });
            }
            else if(action.payload.toLowerCase() === 'desc'){
                sortedPopulation = state.countries.sort((a, b) => {
                    if(a.population > b.population) return -1
                    if(a.population < b.population) return 1
                    return 0
                });
            }; 
            return {
                    ...state,
                    allCountries: sortedPopulation
                };
        case GET_COUNTRY: 
          return {
              ...state,
              country: action.payload
          };
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            };   
        case 'POST_ACTIVITY':
            return{
                ...state
            };
        case FILTER_ACTIVITY:
            const allCountriesAct = state.countries
            const activitiesFilter = action.payload === 'All' ?
            allCountriesAct : allCountriesAct.filter(country => 
                country.activities && country.activities.map(el => el.name).includes(action.payload))
                 //  si existe actividades && mapeo las
                // actividades y usamos include para validar
                // que exista el payload dentro del array

            return{
                ...state,
                countries: activitiesFilter
            };
                
        default :
        return state;    
    };
};
export default rootReducer;