import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, postActivity } from '../../actions';
import { Link } from 'react-router-dom';
import { validate } from './Validate/validate';
import styles from './CreateActivity.module.css'

const CreateActivity = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    //usamos estados locales: input para ir almacenando los valores que el usuario escriba en los inputs
    //y error para ir guardando los errores que nos devolverá nuestra función validate.
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: []
    });

  //nuestra función handleInputChange actauliza nuestros estados input y error
  //en input guardará los valores que el usuario tipee y en error guardará el resultado de la ejecución
  //de la función validate que recibirá nuestro estado input como argumento.

    function handleChange(e){
        setInput({
            ...input, 
            [e.target.name] : e.target.value
        });
         setErrors(validate({
             ...input, 
             [e.target.name] : e.target.value
     }));
    };

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input, 
                [e.target.name] : e.target.value
            });
        };
         setErrors(validate({
             ...input, 
             [e.target.name] : e.target.value
         }));
    };

    function handleSelect(e){
        if (input.countries.includes(e.target.value)) {
            alert("El pais ya esta seleccionado");
          } else {
        setInput({
            ...input,
            // Concateno lo que ya habia en el array, con el nuevo value
            countries: [...input.countries, e.target.value]
        })
         setErrors(validate({
             ...input, 
            countries: [e.target.name, e.target.value] 
     }));
     };
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
            alert('Complete todos los campos para poder continuar');
        } else {
            e.preventDefault();
            dispatch(postActivity(input));
            alert('Tu actividad ha sido creada exitosamente');
            // Reseteamos el input
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season:'',
                countries: []
            });
        };
    };

    function handleDelete(e){
        setInput({
            ...input,
            //Se va a filtrar todo el array, devolviendo todos los paises que no coincidan con el seleccionado
            countries: input.countries.filter(country => country !== e)
        });
    };

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    return (
        <div  className={styles.create}>
            <div className={styles.flex}>
            <Link to='/home'>
                <button className={styles.back}>Volver</button>
            </Link>
            </div>
            <h1 className={styles.title}>Crear actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.justify}>
                <div >
                <div className={styles.container}>
                    <label className={styles.label}>Nombre: </label>
                    <input type="text" value={input.name} name='name' onChange={handleChange} className={styles.input}/>
                    {/* por último, utilizando nuevamente el operador && decimos que si existe un error
         nos muestre un pequeño parrafó con el contenido del error */}
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Dificultad: </label>
                    <label>
                    <input type="radio" value='1' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    1</label>
                    <label>
                    <input type="radio" value='2' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    2</label>
                    <label>
                    <input type="radio" value='3' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    3</label>
                    <label>
                    <input type="radio" value='4' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    4</label>
                    <label>
                    <input type="radio" value='5' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    5</label>
                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Duracion: </label>
                    <input type="text" value={input.duration} name='duration' onChange={handleChange} className={styles.input}/>
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Temporada: </label>
                    <label>
                    <input type="radio" value='Summer' name='season' onChange={(e) => handleCheck(e)}/>
                    Verano</label>
                    <label>
                    <input type="radio" value='Spring' name='season' onChange={(e) => handleCheck(e)}/>
                    Primavera</label>
                    <label>
                    <input type="radio" value='Autumm' name='season' onChange={(e) => handleCheck(e)}/>
                    Otoño</label>
                    <label>
                    <input type="radio" value='Winter' name='season' onChange={(e) => handleCheck(e)}/>
                    Invierno</label>
                    {errors.season && (<p>{errors.season}</p>)}
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Pais: </label>
                    <div className={styles.custom}>
                    <select onChange={(e) => handleSelect(e)} className={styles.select}>
                    {countries.map((country) => (
                        <option value={country.name}>{country.name}</option>
                    ))}
                    </select>
                    </div>
                    {errors.countries && (<p>{errors.countries}</p>)}
                </div>
                {input.countries.map((e) =>
                <div className={styles.countryContainer}>
                    <p className={styles.name}>{e}</p>
                    <button type='button' onClick={() => handleDelete(e)} className={styles.back}>X</button>
                </div>
                )}
                <div className={styles.center}>
                <button type='submit' className={styles.btn}>Crear actividad</button>
                </div>
                </div>
            </form>
        </div>
    );
};
export default CreateActivity;