import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string;
  time: string;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  private timeId: ReturnType<typeof setInterval> | undefined;
  // private logTimeId: ReturnType<typeof setInterval> | undefined;

  state: State = {
    clockName: getRandomName(),
    time: new Date().toUTCString().slice(-12, -4),
    hasClock: true,
  };

  handleDocuentRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleDocuentLeftClick = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount(): void {
    // оновлюємо час щосекунди
    this.timeId = window.setInterval(() => {
      if (this.state.hasClock) {
        // перевірка, чи годинник видимий
        const currentTime = new Date().toUTCString().slice(-12, -4);

        this.setState({ time: currentTime });
        console.log(currentTime); // виводити час тільки якщо годинник видимий
      }
    }, 3300);

    // додаємо обробник події для правого кліку
    document.addEventListener('contextmenu', this.handleDocuentRightClick);
    document.addEventListener('click', this.handleDocuentLeftClick);

    // console.log('componentDidMount');
  }

  componentWillUnmount(): void {
    if (this.timeId) {
      clearInterval(this.timeId);
    }

    document.removeEventListener('contextmenu', this.handleDocuentRightClick);
    document.removeEventListener('click', this.handleDocuentLeftClick);

    // console.log('componentWillUnmount');
  }

  componentDidUpdate(_: {}, prevState: State): void {
    if (prevState.clockName !== this.state.clockName) {
      console.warn(`Renamed from ${prevState.clockName} to ${this.state.clockName}`);
    }
  }
}

render() {
  const { clockName, time, hasClock } = this.state;

  return (
    <div className="App">
      <h1>React Clock</h1>

      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>
          {' time is '}
          <span className="Clock__time">{time}</span>
        </div>
      )}
    </div>
  );
}


// const [clockName, setClockName] = useState(getRandomName());
// const [time, setTime] = useState(new Date().toUTCString().slice(-12, -4));

// useEffect(() => {
//   const handleDocuentRightClick = (event: MouseEvent) => {
//     // this.setState({ value: event.key  })
//     // eslint-disable-next-line no-console
//     console.warn(event);
//   };

//   const timeId = setInterval(() => {
//     setClockName(getRandomName());
//     setTime(new Date().toUTCString().slice(-12, -4));
//   }, 3300);

//   document.addEventListener('contextmenu', handleDocuentRightClick);

//   // eslint-disable-next-line no-console
//   console.log('compometDidMout');

//   // return () => clearInterval(timeId);
//   return () => {
//     window.clearInterval(timeId);
//     document.removeEventListener('contextmenu', handleDocuentRightClick);
//     console.log('componentWillUnmount');
//   };
// }, []);

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
