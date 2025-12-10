import { useEffect } from "react";

function DigitalClock({ digTime, setDigTime }) {
    useEffect(() => {
        let id = setInterval(() => {
            const d = new Date();
            setDigTime({ hr: d.getHours(), min: d.getMinutes(), sec: d.getSeconds()});
        }, 10);
        return () => { clearInterval(id) };
    }, [])

    return (
        <>
            <h1>DIGITAL CLOCK</h1>
            <div className="inner-content">
                <div className="hr">{digTime.hr}</div>:
                <div className="min">{digTime.min}</div> :
                <div className="sec">{digTime.sec}</div>
            </div>
        </>
    );
}
export default DigitalClock;