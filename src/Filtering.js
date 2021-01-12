import { React, useRef, useEffect, useState } from 'react'
import UitgavenBarChart from './visualisaties/UitgavenBarChart'


export default function MicroDetails1({ partijen, setPartijenState }) {
    let container = useRef();
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0)
    let showOneForm = useRef()
    let hideOneForm = useRef()
    let checkbox = useRef()
    let [showAll, setShowAll] = useState(true)

    useEffect(() => {
        setWidth(container.current.offsetWidth - container.current.offsetWidth / 10)
        setHeight(container.current.offsetHeight - container.current.offsetHeight / 10)
        console.log(width, height)
    }, [])

    function handleShowOne() {
        setPartijenState([showOneForm.current.value])
        setShowAll(false)
    }

    function handleHideOne() {
        console.log(hideOneForm.current.value)
        const nieuweLijst = uitsluitenPartij(partijen)
        setPartijenState(nieuweLijst)
        setShowAll(true)

        function uitsluitenPartij(partijen) {
            return partijen.map(partij => {
                if (partij != hideOneForm.current.value) {
                    return partij
                }
            })
        }
    }

    function handleShowAll() {
        setShowAll(!showAll)
        if (!showAll) {
            setPartijenState(partijen)
        }
        else {
            setPartijenState([showOneForm.current.value])
        }
    }
    return (
        <section ref={container} className="filter-container">
            <h2>Filteropties</h2>
            <form action="">
                <div>
                    <label htmlFor="partij-tonen">Een enkele partij tonen</label>
                    <select name="partij-uitsluiten" id="partij-tonen" ref={showOneForm} onChange={handleShowOne}>
                        {partijen.map(partij => {
                            return <option key={partij} value={partij}>{partij}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="partij-uitsluiten">Een enkele partij uitsluiten</label>
                    <select name="partij-uitsluiten" id="partij-uitsluiten" ref={hideOneForm} onChange={handleHideOne}>
                        {partijen.map(partij => {
                            return <option key={partij} value={partij}>{partij}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="alle-partijen-tonen">Alle partijen tonen</label>
                    <label htmlFor="alle-partijen-tonen" className="switch">
                        <input ref={checkbox} type="checkbox" checked={showAll} id="alle-partijen-tonen" onChange={handleShowAll} />
                        <span class="slider round"></span>
                    </label>

                </div>
            </form>
            {/* {width > 0 && <UitgavenBarChart width={width} height={height} />} */}
        </section>
    )
}
