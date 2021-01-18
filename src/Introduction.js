import React from 'react'
import lineChartImage from './images/line-chart.png'

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
                    <img src={lineChartImage} alt="" />
                </section>
                <section>
                    <p>Zie in detail hoe de cijfers samenkomen</p>
                    <img src={lineChartImage} alt="" />
                </section>
                <section>
                    <p>Zie het verschil over tijd door d eslider onderaan de pagina te gebruiken</p>
                    <img src={lineChartImage} alt="" />
                </section>

            </div>
            <button onClick={handleButtonClick}>Naar het dashboard</button>
        </section>
    )
}
