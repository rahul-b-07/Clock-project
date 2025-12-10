import { useEffect, useState } from "react";
import "../css/Clock.css"

function Clock() {
    const d = new Date();
    const [clock, setClock] = useState(true);
    const [stopwatch, setStopwatch] = useState(false);
    const [timer, setTimer] = useState(false);
    const [running, setRunning] = useState(false);
    const [timerStart, setTimerStart] = useState(false);
    const [hr, setHr] = useState(clock ? d.getHours() : (stopwatch ? 0 : timerStart));
    const [min, setMin] = useState(clock ? d.getMinutes() : (stopwatch ? 0 : timerStart));
    const [sec, setSec] = useState(clock ? d.getSeconds() : (stopwatch ? 0 : timerStart));
    const [millisec, setMillisec] = useState(0);
    const [lapcontent_timer, setLapcontent_timer] = useState([]);
    const [lapcontent_stopwatch, setLapcontent_stopwatch] = useState([]);

    function pad(num) {
        return String(num).padStart(2, "0");
    }

    function stopwatch_start() {
        setRunning(prevRunning => !prevRunning);
    }
    function stopwatch_lap() {
        let add = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(millisec)}`;
        setLapcontent_stopwatch(prev => [add, ...prev]);
    }
    function stopwatch_reset() {
        setRunning(false);
        setMillisec(0);
        setSec(0);
        setMin(0);
        setHr(0);
        setLapcontent_stopwatch([]);
    }

    function timer_start() {
        setTimerStart(prevTimerStart => !prevTimerStart);
    }
    function timer_lap() {
        let add = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(millisec)}`;
        setLapcontent_timer(prev => [add, ...prev]);
    }
    function timer_reset() {
        setTimerStart(false);
        setMillisec(0);
        setSec(0);
        setMin(0);
        setHr(0);
        setLapcontent_stopwatch([]);
    }

    function clock_set() {
        setClock(true);
        setStopwatch(false);
        setTimer(false);
    }
    function stopwatch_set() {
        setClock(false);
        setStopwatch(true);
        setTimer(false);
        setHr(0);
        setMin(0);
        setSec(0);
        setMillisec(0);
    }
    function timer_set() {
        setTimer(true);
        setClock(false);
        setStopwatch(false);
        setHr(0);
        setMin(0);
        setSec(0);
        setMillisec(0);
        // setTimerStart(true);
    }

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => {
            setMillisec(prevMillisec => {
                if (prevMillisec === 99) {
                    setSec(prevSec => {
                        if (prevSec === 59) {
                            setMin(prevMin => {
                                if (prevMin === 59) {
                                    setHr(prevHr => prevHr + 1);
                                    return 0;
                                }
                                return prevMin + 1;
                            });
                            return 0;
                        }
                        return prevSec + 1;
                    });
                    return 0;
                }
                return prevMillisec + 1;
            })
        }, 10)
        return () => { clearInterval(id) };
    }, [running]);

    useEffect(() => {
        if (!timerStart) return;
        const id = setInterval(() => {
            setMillisec(prevMillisec => {
                if (prevMillisec === 0) {
                    setSec(prevSec => {
                        if (prevSec === 0) {
                            setMin(prevMin => {
                                if (prevMin === 0) {
                                    setHr(prevHr => prevHr - 1);
                                    if (prevMillisec === 0 && hr === 0 && prevMin === 0 && prevSec === 0) {
                                        setHr(0);
                                        setMin(0);
                                        setSec(0);
                                        setMillisec(0);
                                        alert("Time out")
                                        setTimerStart(prev => !prev);
                                    }
                                    return 59;
                                }
                                return prevMin - 1;
                            });
                            return 59;
                        }
                        return prevSec - 1;
                    });
                    return 99;
                }
                return prevMillisec - 1;
            })
        }, 10)
        return () => { clearInterval(id) };
    }, [timerStart]);

    useEffect(() => {
        if (!clock) return;
        let id = setInterval(() => {
            let clk = new Date();
            setHr(clk.getHours());
            setMin(clk.getMinutes());
            setSec(clk.getSeconds());
        }, 1000);
        return () => { clearInterval(id); }
    }, [clock]);

    return (
        <>
            <div className="options">
                <button onClick={clock_set}>Clock</button>
                <button onClick={stopwatch_set}>Stop Watch</button>
                <button onClick={timer_set}>Timer</button>
            </div>
            <div className="content">
                <h1>DIGITAL CLOCK</h1>
                <div className="inner-content">
                    <div className="hr">{pad(hr)}</div> :
                    <div className="min">{pad(min)}</div> :
                    <div className="sec">{pad(sec)}</div>
                    {!clock && <>:<div className="millisec">{pad(millisec)}</div></>}
                </div>
                {!clock &&
                    <>
                        <div className="outer-content">
                            {stopwatch && <><button className={!running ? "start" : "stop"} onClick={stopwatch_start}>{!running ? "START" : "STOP"}</button>
                                <button className="lap" onClick={stopwatch_lap}>lap</button>
                                <button className="reset" onClick={stopwatch_reset}>RESET</button></>}
                            {timer && <><button className={!running ? "start" : "stop"} onClick={timer_start}>{!running ? "START" : "STOP"}</button>
                                <button className="lap" onClick={timer_lap}>lap</button>
                                <button className="reset" onClick={timer_reset}>RESET</button></>}
                        </div>
                        <div className="lap-content">
                            <ul className="lap-children">
                                {
                                    lapcontent_stopwatch.map((item, index) => (
                                        <li key={index}><p>{lapcontent_stopwatch.length - index}.</p><p>{item}</p></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>}
            </div>
            {
                timer && <>
                    <input type="number" placeholder="HR" onChange={(e) => { setHr(e.target.value) }} />
                    <input type="number" placeholder="Min" onChange={(e) => { setMin(e.target.value) }} />
                    <input type="number" placeholder="Sec" onChange={(e) => { setSec(e.target.value) }} />
                </>
            }
        </>
    );
}
export default Clock;