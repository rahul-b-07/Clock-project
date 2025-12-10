import { useEffect, useRef, useState } from "react";

function Timer({ tmTime, setTmTime, pad }) {
    const [tmStart, setTmStart] = useState(false);
    const [inp, setInp] = useState({ hr: false, min: false, sec: false, HaveName: false, name: "" });
    const [initialization, setInitialization] = useState(true);
    const [lap, setLap] = useState([]);
    const intervalId = useRef(null);

    function addToLap() {
        if (tmStart) {
            let add = `${pad(tmTime.hr)}:${pad(tmTime.min)}:${pad(tmTime.sec)}:${pad(tmTime.millisec)}`;
            setLap(prev => [add, ...prev]);
        }
    }

    function start() {
        setTmStart(true);
        if (initialization) {
            setInp(prev => ({ ...prev, hr: true, min: true, sec: true, HaveName: true }));
            setTmTime(prev => ({ hr: inp.hr ? prev.hr : 0, min: inp.min ? prev.min : 0, sec: inp.sec ? prev.sec : 0, millisec: 99 }));
            setInitialization(false);
        }
    }

    function reset() {
        setTmStart(false);
        setInitialization(true);
        setLap([]);
        setTmTime({ hr: 0, min: 0, sec: 0, millisec: 0 });
        setInp({ hr: false, min: false, sec: false, HaveName: false, name: "" });
    }

    useEffect(() => {
        if (!tmStart) {
            if (intervalId.current) clearInterval(intervalId);
            return;
        }
        intervalId.current = setInterval(() => {
            setTmTime(prev => {
                let { hr, min, sec, millisec } = prev;
                if (hr === 0 && min === 0 && sec === 0 && millisec === 0) {
                    setTmStart(false);
                    alert("Time Up");
                    return prev;
                }
                if (millisec > 0) millisec--;
                else {
                    millisec = 99;
                    if (sec > 0) {
                        sec--;
                    } else {
                        sec = 59;
                        if (min > 0) {
                            min--;
                        } else {
                            min = 59;
                            if (hr > 0) {
                                hr--;
                            }
                        }
                    }
                }
                return { hr, min, sec, millisec };
            })
        }, 10);
        return () => clearInterval(intervalId.current);
    }, [tmStart]);

    return (
        <>
            <h1>
                {(inp.HaveName && inp.name !== "") ? `TIMER : ${inp.name}` : (inp.HaveName ? "TIMER " : "TIMER : ")}
                {!inp.HaveName && <input className="inp-name" type="text" placeholder="Name" onKeyDown={(e) => { if (e.key === "Enter") { setInp({ ...inp, HaveName: true, name: e.target.value }) } }} />}
            </h1>
            <div className="inner-content">
                {!inp.hr && <input className="inp-hr" type="number" placeholder="Hr" onKeyDown={(e) => { if (e.key === "Enter") { setTmTime({ ...tmTime, hr: Number(e.target.value) }); setInp({ ...inp, hr: true }) } }} />}
                {inp.hr && <div className="hr">{pad(tmTime.hr)}</div>} :
                {!inp.min && <input className="inp-min" type="number" placeholder="Min" onKeyDown={(e) => { if (e.key === "Enter") { setTmTime({ ...tmTime, min: Number(e.target.value) }); setInp({ ...inp, min: true }) } }} />}
                {inp.min && <div className="min">{pad(tmTime.min)}</div>} :
                {!inp.sec && <input className="inp-sec" type="number" placeholder="Sec" onKeyDown={(e) => { if (e.key === "Enter") { setTmTime({ ...tmTime, sec: Number(e.target.value) }); setInp({ ...inp, sec: true }) } }} />}
                {inp.sec && <div className="sec">{pad(tmTime.sec)}</div>}
                {/* {inp.hr && inp.min && inp.sec &&  */}
                <>:<div className="millisec">{pad(tmTime.millisec)}</div></>
            </div>
            <div className="outer-content">
                <button className="start" disabled={!(inp.hr || inp.min || inp.sec)} onClick={() => { !tmStart ? start() : setTmStart(prev => !prev); }}>{!tmStart ? "Start" : "Stop"}</button>
                <button className="lap" onClick={addToLap}>Lap</button>
                <button className="reset" onClick={reset}>Reset</button>
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
export default Timer;