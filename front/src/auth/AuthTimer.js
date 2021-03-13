import React, { useState, useEffect } from "react";

function AuthTimer (props) {
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                    //!!!여기에 props.timerOn = false 로 갱신해야됨.
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
        <div className="App">
            <h1>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
        </div>
    );
}
export default AuthTimer;