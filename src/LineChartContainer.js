import { React, useRef, useEffect, useState } from 'react'
import LineChart from './visualisaties/linechart/LineChart';

export default function LineChartContainer() {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)

    console.log(container)
    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        console.log(width, height)
    }, [])


    return (
        <section ref={container} className="uitgaven-container">

            <h2>LineChartContainer</h2>
            {width > 0 && <LineChart width={width} height={height} />}
        </section>
    )
}
