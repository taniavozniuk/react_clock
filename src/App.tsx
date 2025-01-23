import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string;
  time: string;
}

export class App extends React.Component<{}, State> {
  state: State = {
    clockName: getRandomName(),
    time: new Date().toUTCString().slice(-12, -4)
  }

  render() {

    return (
      <div className="App">
        <h1>React clock</h1>

        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>

          {' time is '}

          <span className="Clock__time">{time}</span>
        </div>
      </div>
    );
  }
  // const [clockName, setClockName] = useState(getRandomName());
  // const [time, setTime] = useState(new Date().toUTCString().slice(-12, -4));

  useEffect(() => {
    const handleDocuentRightClick = (event: MouseEvent) => {
      // this.setState({ value: event.key  })
      // eslint-disable-next-line no-console
      console.warn(event);
    };

    const timeId = setInterval(() => {
      setClockName(getRandomName());
      setTime(new Date().toUTCString().slice(-12, -4));
    }, 3300);

    document.addEventListener('contextmenu', handleDocuentRightClick);

    // eslint-disable-next-line no-console
    console.log('compometDidMout');

    // return () => clearInterval(timeId);
    return () => {
      window.clearInterval(timeId);
      document.removeEventListener('contextmenu', handleDocuentRightClick);
      console.log('componentWillUnmount');
    };
  }, []);

  // componentDidMount(): void {
  //   document.addEve
  // }
  // const today = new Date();
  // let clockName = 'Clock-0';

  // // This code starts a timer
  // const timerId = window.setInterval(() => {
  //   clockName = getRandomName();
  // }, 3300);

  // // this code stops the timer
  // window.clearInterval(timerId);


};
