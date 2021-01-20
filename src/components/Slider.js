import React, { useRef, useEffect } from 'react';

export default function Slider({ datum, setDatum }) {

    let slider = useRef()
    let minDatum = '2020-9-1'
    let maxDatum = '2021-1-20'
    const DATUM_KEY = 'SLIDER_DATUM_KEY'

    //on page load
    useEffect(() => {
        slider.current.value = 100;
        handleSlider()
    }, [])


    function handleSlider() {
        //voeg method toe aan Days om dagen op te tellen
        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        const datum1 = new Date(minDatum)
        const datum2 = new Date(maxDatum)

        const diffTime = Math.abs(datum2 - datum1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const aantalDagenOptellen = Math.floor(slider.current.value / 100 * diffDays);
        const nieuweDatum = datum1.addDays(aantalDagenOptellen);

        const nieuweDag = nieuweDatum.getDate()
        const nieuweMaand = nieuweDatum.getMonth() + 1
        const nieuwJaar = nieuweDatum.getFullYear()
        const nieuweDatumFormatted = "" + nieuwJaar + '-' + nieuweMaand + '-' + nieuweDag;
        setDatum(nieuweDatumFormatted)
    }

    return (
        <section className="slider-container">
            <input ref={slider} type="range" min="1" max="100" className="slider-years" id="myRange" onChange={handleSlider} />
            <p>Datum: {datum}</p>
        </section>
    )
}


