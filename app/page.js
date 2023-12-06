'use client'
import React, { useRef, useState, useEffect } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const lapRef = useRef(1); 
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      setCurrentTime(elapsed);
    }, 10); 
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const lapTimer = () => {
    setLaps((prevLaps) => [...prevLaps, { lap: lapRef.current++, time: currentTime }]);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
    lapRef.current = 1;
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{(currentTime / 1000).toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapTimer}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      <section className='lap-section' >
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lapData) => (
            
            <p key={lapData.lap}>
              {(lapData.time / 1000).toFixed(3)}
            </p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
