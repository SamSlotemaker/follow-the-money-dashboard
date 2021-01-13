import React, { useRef } from 'react';

export default function Slider({ datum, setDatum }) {

    let slider = useRef()

    function handleSlider() {
        setDatum(slider.current.value)
    }

    return (
        <section className="slider-container">
            <input ref={slider} type="range" min="1" max="100" className="slider-years" id="myRange" onChange={handleSlider} />
            <p>Datum: {datum}</p>
        </section>
    )
}
