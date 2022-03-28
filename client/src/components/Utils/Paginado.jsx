import React from 'react';
import "./Paginado.css"

const Paginado = ({countriesPage, allCountries, paginado}) => {
    const pageNumbers = [];//

        for(let i = 1;  i <= Math.ceil(allCountries / countriesPage); i++){
            pageNumbers.push(i);
        }; // recorro un arreglo donde tomo el numero redondo de de dividir todos los paises por los 
        //paises por pagina que quiero y ese numero lo pushe a pagenumber
        return(
            <div className="container">
                <div className="pagination">
                { pageNumbers && 
                pageNumbers.map((number) => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={number} onClick={() => paginado(number)}>
                        {number}
                    </a>
                ))}
                {/* Si tenemos algo lo mapeamos y me regresa cada uno de los numeros que me devuea el paginado */}
                </div>
            </div>
        );
};
 export default Paginado;