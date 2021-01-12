import React, { useState, useRef, useEffect } from 'react';
import LineChartContainer from "./LineChartContainer";
import InfoContainer1 from "./InfoContainer1";
import InfoContainer2 from "./InfoContainer2";
import InfoContainer3 from "./InfoContainer3";
import MicrotargettingDataContainer from "./MicrotargettingDataContainer";
import Filtering from "./Filtering";
import MicroDetails2 from "./MicroDetails2";
import InhoudAdvertenties from "./InhoudAdvertenties";
import Slider from "./Slider";
import { partijen } from './partijInformatie.js'


function App() {


  const [datum, setDatum] = useState(null);
  const [partijenState, setPartijenState] = useState(partijen)

  return (
    <section className="dashboard">
      <InfoContainer1 datum={datum} />
      <InfoContainer2 />
      <InfoContainer3 />
      <LineChartContainer />
      <MicrotargettingDataContainer partijen={partijenState} />
      <Filtering partijen={partijen} setPartijenState={setPartijenState} />
      <MicroDetails2 />
      <InhoudAdvertenties />
      <Slider datum={datum} setDatum={setDatum} />
    </section>
  )
}

export default App;
