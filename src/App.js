import React, { useState, useRef, useEffect } from 'react';
import LineChartContainer from "./LineChartContainer";
import InfoContainer1 from "./InfoContainer1";
import InfoContainer2 from "./InfoContainer2";
import InfoContainer3 from "./InfoContainer3";
import MicrotargettingDataContainer from "./MicrotargettingDataContainer";
import MicroDetails1 from "./MicroDetails1";
import MicroDetails2 from "./MicroDetails2";
import InhoudAdvertenties from "./InhoudAdvertenties";
import Slider from "./Slider";


function App() {


  const [datum, setDatum] = useState(null);


  return (
    <section className="dashboard">
      <InfoContainer1 datum={datum} />
      <InfoContainer2 />
      <InfoContainer3 />
      <LineChartContainer />
      <MicrotargettingDataContainer />
      <MicroDetails1 />
      <MicroDetails2 />
      <InhoudAdvertenties />
      <Slider datum={datum} setDatum={setDatum} />
    </section>
  )
}

export default App;
