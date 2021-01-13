import { React, useRef, useState } from 'react'


export default function MicroDetails1({ partijen, setPartijenState }) {
    let container = useRef();
    let showOneForm = useRef()
    let hideOneForm = useRef()
    let checkbox = useRef()
    let [showAll, setShowAll] = useState(true)

    function handleShowOne() {
        setPartijenState([showOneForm.current.value])
        setShowAll(false)
    }

    function handleHideOne() {
        const nieuweLijst = uitsluitenPartij(partijen)
        setPartijenState(nieuweLijst)
        setShowAll(true)

        function uitsluitenPartij(partijen) {
            return partijen.map(partij => {
                if (partij !== hideOneForm.current.value) return partij
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
                        <option value="geen">Geen</option>
                        {partijen.map(partij => {
                            return <option key={partij} value={partij}>{partij}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="alle-partijen-tonen">Alle partijen tonen</label>
                    <label htmlFor="alle-partijen-tonen" className="switch">
                        <input ref={checkbox} type="checkbox" checked={showAll} id="alle-partijen-tonen" onChange={handleShowAll} />
                        <span className="slider round"></span>
                    </label>

                </div>
            </form>
            {/* {width > 0 && <UitgavenBarChart width={width} height={height} />} */}
        </section>
    )
}
