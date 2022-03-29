const { Router } = require ('express');
const Sequelize = require ('sequelize')
const axios = require ('axios');
const { Country, Activity, country_activity } = require ('../db.js');  

const router = Router();

const getApiInfo = async () => {//Traigo la informacion de la API
    const apiUrl = await axios.get('https://restcountries.com/v3/all');//Peticion a la API
    const apiInfo = await apiUrl.data.map(country => {
        if (!country.capital) country.capital = ['N/A']
        return {//retorna unicamente toda la informacion que se necsita para la DB
            id: country.cca3.toUpperCase(),
            name: country.name.common,
            img: country.flags[0],
            continent: country.continents[0],//array
            capital: country.capital[0],//array
            subregion: country.subregion,
            area: country.area,
            population: country.population
        }
    });
    return apiInfo
};

const getDbInfo = async () => {//trae toda la informacion almacenada ne la DB
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: []
            },
        },
    });
};

router.get('/countries', async(req, res) => {
    let { name } = req.query
    let dbCountries = await getDbInfo();

    if(name){
        if(dbCountries.length === 0){
            return res.status(404).send('Country not found')
        }else{
            let country = await dbCountries.filter(country => country.name.toLowerCase() === name.toLowerCase())
            return res.status(200).send(country)
        }
    }else{

        if(dbCountries.length === 0){
            let apiCountries = await getApiInfo();
            await apiCountries.forEach(async country => {
                let newCountry = {
                    id: country.id,
                    name: country.name,
                    img: country.img,
                    continent: country.continent,
                    capital: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population
                }
                Country.create(newCountry)
            })
            return res.status(200).send(apiCountries)
        }
        return res.status(200).send(dbCountries)
    }

})
//Obtiene los datos del pais cuyo id corresponda con el indicado
router.get('/countries/:id', async (req,res) => {
    const countryId = req.params.id
    //Encontrarlo por primary key e incluir todas las act asociadas
    let countryById = await Country.findByPk(countryId, {
        include : {
            model : Activity
        },
    });
  return res.status(200).send(countryById);
});

//obtener activades
router.get('/activity', async (req, res, next) => {
    try {
        let activities = await Activity.findAll()
        return res.status(200).send(activities)
    } catch (error) {
       next(error);
    };
});

router.post('/activity', async (req, res, next) => {
    try{
        let { name, difficulty, duration, season, countries } = req.body;
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });
//dentro de mi modelo encontrá todos los temps que coincidan con lo que le paso por body 
        let activityCountry = await Country.findAll({
            where: { name : countries}
        });     
            await newActivity.addCountry(activityCountry);
            return res.status(200).send('La actividad se creo exitosamente')
    } catch(error) {
        next(error);
        return res.status(500).send('No se pudo crear la actividad');
    };
});
module.exports = router;