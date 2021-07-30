import styled from 'styled-components'
import React from 'react'
const TemplateBioseguridad = ({granjas, cantidadDeColumnasYFilas}) => {
    function reverseString(str) {
        return str.split("").reverse().join("");
    }
    reverseString("hello");



    const GridLabels = styled.div`
        display: grid;
        grid-template-columns: repeat(${cantidadDeColumnasYFilas}, minmax(34px, 1fr));
    `;
    const MainGrid = styled.div`
        display: grid;
        grid-template-rows: repeat(${cantidadDeColumnasYFilas}, minmax(34px, 1fr));
        overflow: hidden;
        border: 0.1px solid gray;
    `;

    const SidebarGridLeft = styled.div`
        display: grid;
        grid-template-rows: repeat(${cantidadDeColumnasYFilas}, minmax(34px, 1fr));
    `;
    return (
        <div>
            {/* <h4> Bios seguridad granjas</h4> */}
            <div className="grid__container">
                
            <div className="content__noches">
                {/* <h4>Noches</h4> */}
                
            </div>
            <div className="grid__system">
                {/* HEADER TOP */}
                <div className="logo">
                    {/* <img src="" alt=""/> */}
                    {/* <p>Here some text</p> */}
                    <img className="logo-ojai" src='./assets/monitor__visitas/logoN.png' alt="Logo Ojai" />
                </div>
                <div className="header__top">
                    <GridLabels>
                        {granjas.map(item => <div key={item.value + 'a'} className="label__top"><h5>{item.label.toUpperCase() }</h5></div>)}
                    </GridLabels>
                </div>
                {/* MAIN */}

                <MainGrid className="main">
                    {granjas.map(item =>
                     <GridLabels key={item.value} className="label__main">
                        {
                            item.noches.map((noche, index) => {
                                return  <div key={noche + index}  className="label__content"><div>{noche}</div></div>
                            })
                        
                        }
                        
                    </GridLabels>)}
                </MainGrid>

                {/* SIDEBAR LEFT */}
                <SidebarGridLeft className="sidebar__left">
                    {granjas.map((item, index) => <div key={item.value} className="sidebar__content__labels"><h5 >{item.label}</h5></div>)}
                </SidebarGridLeft>
            </div>
            </div>
        </div>
    )
}

export default TemplateBioseguridad
