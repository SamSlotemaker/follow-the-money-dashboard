import { React, useRef, useEffect, useState } from 'react'
import { partijKleuren } from './partijInformatie.js'
import LineChart from './visualisaties/linechart/LineChart';

export default function LineChartContainer({ partijen, allePartijen, datum }) {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(container.current.offsetWidth)
        setHeight(container.current.offsetHeight)
    }, [])


    return (
        <section className="uitgaven-container">
            <h2>Grafiek totalen uitgaven per week</h2>
            <div className="line-chart-legenda">
                {allePartijen.map(partij => {
                    return <p key={partij} style={{ backgroundColor: partijKleuren[partij] }}>{partij}</p>
                })}
            </div>
            <div ref={container} className="chart-container">
                {width > 0 && <LineChart width={width} height={height} partijen={partijen} datum={datum} />}

            </div>
        </section>
    )
}
