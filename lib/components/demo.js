'use babel';

import React, { Fragment } from 'react';
import CustomRenderer from '../renderer';
import TouchBar from './TouchBar';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: Date.now(),
      isClicked: false,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    console.log('CLICKED!');
    // this.setState(() => ({
    //   text: Date.now(),
    //   isClicked: true,
    // }))
  }
  render() {
    return (
      <Fragment>
        <touch-button onClick={this.onButtonClick}>Hello World</touch-button>
        <touch-button onClick={this.onButtonClick}>Another button</touch-button>
        <touch-button onClick={this.onButtonClick}>Esto es un chiqui botón</touch-button>
      </Fragment>
      // <div>
      //   <Text className="hello-class" content={this.state.text} />
      //   <span style="color:blue;" autofocus>
      //     World
      //   </span>
      //   {this.state.isClicked && <div>Freaking awesome! this renderer works</div>}
      //   {!this.state.isClicked && <button onClick={this.onButtonClick}>Get current time</button>}
      // </div>
    );
  }
}

export default function demo() {
  return CustomRenderer.render(<Demo />, new TouchBar());
}
