import { React, useRef, useEffect, useState } from 'react'
import UitgavenBarChart from './visualisaties/UitgavenBarChart'


export default function MicroDetails1() {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        console.log(width, height)
    }, [])

    return (
        <section ref={container} className="micro-details1-container">
            <h2>MicroDetails1</h2>

            {/* {width > 0 && <UitgavenBarChart width={width} height={height} />} */}
        </section>
    )
}
