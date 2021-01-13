import { React, useRef, useEffect, useState } from 'react'
import { partijKleuren } from './partijInformatie.js'
import LineChart from './visualisaties/linechart/LineChart';

export default function LineChartContainer({ partijen }) {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)

    console.log(container)
    useEffect(() => {
        setWidth(container.current.offsetWidth)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        console.log(width, height)
    }, [])


    return (
        <section ref={container} className="uitgaven-container">
            <h2>Grafiek totalen uitgaven per week</h2>
            <div className="line-chart-legenda">
                {partijen.map(partij => {
                    return <p style={{ backgroundColor: partijKleuren[partij] }}>{partij}</p>
                })}
            </div>
            {width > 0 && <LineChart width={width} height={height} partijen={partijen} />}
        </section>
    )
}
