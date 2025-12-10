import { useState } from "react";
import "../css/ClockUpdated.css"
import DigitalClock from "./DigitalClock";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

function ClockUpdated() {
    const [digTime, setDigTime] = useState({ hr: 0, min: 0, sec: 0 });
    const [swTime, setSwTime] = useState({ hr: 0, min: 0, sec: 0, millisec: 0 });
    const [tmTime, setTmTime] = useState({ hr: 0, min: 0, sec: 0, millisec: 0 });
    const [digclk, setDigclk] = useState(true);
    const [swclk, setSwclk] = useState(false);
    const [tmclk, setTmclk] = useState(false);

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    return (
        <>
            <div className="content">
                <div className="types">
                    {digclk && <DigitalClock digTime={digTime} setDigTime={setDigTime} />}
                    {swclk && <StopWatch swTime={swTime} setSwTime={setSwTime} pad={pad} />}
                    {tmclk && <Timer tmTime={tmTime} setTmTime={setTmTime} pad={pad} />}
                </div>
                <div className="buttons">
                    <button className={digclk ? "digital-on" : "digital"} onClick={() => { setDigclk(true); setSwclk(false); setTmclk(false) }}>Clock</button>
                    <button className={swclk ? "stopwatch-on" : "stopwatch"} onClick={() => { setDigclk(false); setSwclk(true); setTmclk(false) }}>Stop watch</button>
                    <button className={tmclk ? "timer-on" : "timer"} onClick={() => { setDigclk(false); setSwclk(false); setTmclk(true) }}>Timer</button>
                </div>
            </div>
        </>
    )
}
export default ClockUpdated;