import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const timer = useRef();
  const modalRef = useRef();

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      modalRef.current.open();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }
  return (
    <>
      {timerExpired && (
        <ResultModal
          ref={modalRef}
          result='lost'
          targetTime={targetTime}
        ></ResultModal>
      )}
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
