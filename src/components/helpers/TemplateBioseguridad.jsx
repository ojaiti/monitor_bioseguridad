import React from 'react'
const TemplateBioseguridad = ({granjas, cantidadDeColumnasYFilas}) => {
    function reverseString(str) {
        return str.split("").reverse().join("");
    }
    reverseString("hello");

    return (
        <>
        <h3 align="center">Piramide Bioseguridad</h3>
        <table>
            <thead>
            <tr className="label__main">
                <th>
                    <img className="logo-ojai" width="100" src='./assets/monitor__visitas/logoN.png' alt="Logo Ojai" />
                </th>
            {granjas.map(item =><th key={item.label}><span className="label__top">{item.label.toUpperCase() }</span></th>)}
            </tr>
            </thead>
            <tbody>
                {granjas.map(item =>
                    (<tr key={item.value + 'ezzz' } className="label__main">
                            <th  data-label={item.label + 'e' } key={item.value + 'ezzz' }><span >{item.label.toUpperCase() }</span></th>
                        {
                            item.noches.map((noche, index) => {
                                return  <td data-label={noche + index} key={noche + index}  className={noche === '-' ? 'label__content dark_night':'label__content'}><div>{noche}</div></td>
                            })
                        }

                    </tr>)
                )}
            </tbody>
                     
            
            
        </table>
        </>
    )
    
}

export default TemplateBioseguridad

  

