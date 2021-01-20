import React, { useRef } from 'react';
import Peilingen from '../visualisaties/Peilingen';

export default function MicroDetails2({ datum }) {
    let container = useRef();

    return (
        <section ref={container} className="micro-details2-container">
            <h2>Huidige peilingen</h2>
            <Peilingen datum={datum} />
        </section>
    )
}
