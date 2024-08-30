import React, { useRef, useState } from 'react';
import styles from './TicTacToe.module.css';
import circle from '../Assests/circle.png';
import cross from '../Assests/cross4.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill(''));
  const titleRef = useRef(null);
  const toggle = (e, num) => {
    if (lock || data[num] !== '') {
      return;
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = 'x';
    } else {
      newData[num] = 'o';
    }

    setData(newData);
    setCount(count + 1);
    check(newData);
  };

  const check = (newData) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `Congratulations <img src=${cross} alt="cross"> You Win.`;
    } else if (winner === 'o') {
      titleRef.current.innerHTML = `Congratulations <img src=${circle} alt="circle"> You Win.`;
    }
    else if (winner !== 'x' && winner !=='o'){
        titleRef.current.innerHTML = "The match is Tied"
    }
  };

  const reset = () => {
    setLock(false);
    setData(Array(9).fill(''));
    setCount(0);
    titleRef.current.innerHTML = `Tic Tac Toe Game using <span className=${styles.reactTitle}>React JS</span>`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title} ref={titleRef}>Tic Tac Toe Game using <span className={styles.reactTitle}>React JS</span></h1>
      <div className={styles.board}>
        {[0, 1, 2].map((row) => (
          <div className={styles[`row${row + 1}`]} key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div className={styles.boxes} key={index} onClick={(e) => toggle(e, index)}>
                  {data[index] && <img src={data[index] === 'x' ? cross : circle} alt={data[index]} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className={styles.ResetBtn} onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;

