import React from 'react'
import fotoCompare from '../images/foto_compare.png'
import fotoFilter from '../images/foto_filter.png'
import fotoGraphs from '../images/foto_graphs.png'

export default function Introduction() {

    let dashboard = document.querySelector('.dashboard')
    let introduction = document.querySelector('.introduction')
    function handleButtonClick() {
        dashboard.classList.remove('hide')
        introduction.classList.add('hide')
    }

    return (
        <section className="introduction">
            <section>
                <h1>Follow the Money: politiek dashboard</h1>
                <p>Vergelijk en analyseer financiele data van politieke partijen gerelateerd tot advertering en microtargeting</p>
            </section>

            <div>
                <section>
                    <p>Filter op partijen om in detail op partijen in te zoomen</p>
                    <img src={fotoFilter} alt="" />
                </section>
                <section>
                    <p>Zie in detail hoe de cijfers samenkomen</p>
                    <img src={fotoGraphs} alt="" />
                </section>
                <section>
                    <p>Zie het verschil over tijd door de slider onderaan de pagina te gebruiken</p>
                    <img src={fotoCompare} alt="" />
                </section>

            </div>
            <button onClick={handleButtonClick}>Naar het dashboard</button>
        </section>
    )
}
