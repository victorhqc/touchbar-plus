import React, { Component, Fragment } from 'react';

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀'];
  return values[Math.floor(Math.random() * values.length)];
};

export default class DemoReel extends Component<object, State> {
  private spinning: boolean;

  constructor(props: object) {
    super(props);

    this.state = {
      reel1: null,
      reel2: null,
      reel3: null,
      result: null,
      resultColor: null,
    };

    this.spinning = false;
    this.doSpin = this.doSpin.bind(this);
  }

  updateReels() {
    this.setState({
      reel1: getRandomValue(),
      reel2: getRandomValue(),
      reel3: getRandomValue(),
    });
  }

  finishSpin() {
    const { reel1, reel2, reel3 } = this.state;
    const uniqueValues = new Set([reel1, reel2, reel3]).size;

    if (uniqueValues === 1) {
      // All 3 values are the same
      this.setState({
        result: '💰 Jackpot!',
        resultColor: '#FDFF00',
      });
    } else if (uniqueValues === 2) {
      // 2 values are the same
      this.setState({
        result: '😍 Winner!',
        resultColor: '#FDFF00',
      });
    } else {
      // No values are the same
      this.setState({
        result: '🙁 Spin Again',
        resultColor: null,
      });
    }

    this.spinning = false;
  }

  doSpin() {
    if (this.spinning) {
      return;
    }

    this.spinning = true;
    this.setState({
      result: null,
    });

    let timeout = 10;
    const spinLength = 4 * 1000; // 4 seconds
    const startTime = Date.now();

    const spinReels = () => {
      this.updateReels();

      if (Date.now() - startTime >= spinLength) {
        this.finishSpin();
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1;
        setTimeout(spinReels, timeout);
      }
    };

    spinReels();
  }

  render() {
    const { reel1, reel2, reel3, result, resultColor } = this.state;

    return (
      <Fragment>
        <touchbar-button backgroundColor="#7851A9" onClick={this.doSpin}>
          🎰 Spin
        </touchbar-button>
        <touchbar-spacer large />
        <touchbar-label>{reel1}</touchbar-label>
        <touchbar-spacer small />
        <touchbar-label>{reel2}</touchbar-label>
        <touchbar-spacer small />
        <touchbar-label>{reel3}</touchbar-label>
        <touchbar-spacer large />
        <touchbar-label color={resultColor}>{result}</touchbar-label>
      </Fragment>
    );
  }
}

interface State {
  reel1: string | null;
  reel2: string | null;
  reel3: string | null;
  result: string | null;
  resultColor: string | null;
}
