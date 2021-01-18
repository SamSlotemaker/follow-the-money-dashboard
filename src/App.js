import React, { useState } from 'react';
import LineChartContainer from "./LineChartContainer";
import InfoContainer1 from "./InfoContainer1";
import InfoContainer2 from "./InfoContainer2";
import InfoContainer3 from "./InfoContainer3";
import MicrotargettingDataContainer from "./MicrotargettingDataContainer";
import Filtering from "./Filtering";
import MicroDetails2 from "./MicroDetails2";
import InhoudAdvertenties from "./InhoudAdvertenties";
import Introduction from './Introduction'
import Slider from "./Slider";
import { partijen } from './partijInformatie.js'


function App() {


  const [datum, setDatum] = useState('2020-10-10');
  const [partijenState, setPartijenState] = useState(partijen)
  const [grootsteAdverteerder, setGrootsteAdverteerder] = useState(null)
  const [bedragGrootsteAdverteerder, setBedragGrootsteAdverteerder] = useState(null)

  return (
    <>
      <Introduction />
      <section className="dashboard hide">
        <InfoContainer1 datum={datum} partijen={partijenState} setGrootsteAdverteerder={setGrootsteAdverteerder} setBedragGrootsteAdverteerder={setBedragGrootsteAdverteerder} />
        <InfoContainer2 grootsteAdverteerder={grootsteAdverteerder} bedragGrootsteAdverteerder={bedragGrootsteAdverteerder} />
        <InfoContainer3 />
        <LineChartContainer partijen={partijenState} allePartijen={partijen} datum={datum} />
        <MicrotargettingDataContainer partijen={partijenState} />
        <Filtering partijen={partijen} setPartijenState={setPartijenState} />
        <MicroDetails2 datum={datum} />
        <InhoudAdvertenties />
        <Slider datum={datum} setDatum={setDatum} />
      </section>
    </>
  )
}

export default App;
