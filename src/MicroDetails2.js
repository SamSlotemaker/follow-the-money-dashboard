import React, { useEffect, useRef, useState } from 'react';

import BubbleChart from './visualisaties/BubbleChart'
import Peilingen from './visualisaties/Peilingen';

export default function MicroDetails2() {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
    }, [])


    return (
        <section ref={container} className="micro-details2-container">
            <h2>Huidige peilingen</h2>
            {/* <BubbleChart width={width} height={height} /> */}
            <Peilingen />
        </section>
    )
}
