import { useEffect, useRef, useState } from "react";

function StopWatch({ swTime, setSwTime, pad }) {
    const [swStart, setSwStart] = useState(false);
    const [lap, setLap] = useState([]);
    const intervalId = useRef(null);

    function addToLap() {
        if(swStart){
            let add = `${pad(swTime.hr)}:${pad(swTime.min)}:${pad(swTime.sec)}:${pad(swTime.millisec)}`;
            setLap(prev => [add, ...prev]);
        }
    }

    useEffect(() => {
        if (!swStart) {
            if (intervalId.current) clearInterval(intervalId);
            return;
        }
        intervalId.current = setInterval(() => {
            setSwTime(prev => {
                let { hr, min, sec, millisec } = prev;
                if (millisec >= 99) {
                    millisec = 0;
                    if (sec >= 59) {
                        sec = 0;
                        if (min >= 59) {
                            min = 0;
                            hr++;
                        } else {
                            min++;
                        }
                    } else {
                        sec++;
                    }
                } else {
                    millisec++;
                }
                return { hr, min, sec, millisec }
            })
        }, 10);
        return () => clearInterval(intervalId.current);
    }, [swStart]);

    return (
        <>
            <h1>STOP WATCH</h1>
            <div className="inner-content">
                <div className="hr">{pad(swTime.hr)}</div> :
                <div className="min">{pad(swTime.min)}</div> :
                <div className="sec">{pad(swTime.sec)}</div>:
                <div className="sec">{pad(swTime.millisec)}</div>
            </div>
            <div className="outer-content">
                <button className="start" onClick={() => setSwStart(prev => !prev)}>{!swStart ? "Start" : "Stop"}</button>
                <button className="lap" onClick={addToLap}>Lap</button>
                <button className="reset" onClick={() => { setSwStart(false); setSwTime({ hr: 0, min: 0, sec: 0, millisec: 0 }); setLap([]) }}>Reset</button>
            </div>
            <div className="lap-content">
                <ul className="lap-children">
                    {
                        lap.map((item, index) => (
                            <li key={index}><p>{lap.length - index}.</p><p>{item}</p></li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}
export default StopWatch;
