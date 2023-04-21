import React from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {}

interface PopupState {}

class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));
