import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

export default class ColorSelect extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      color: '#fff',
    };
  }

  handleChange = (value: any) => {
    const { setColor } = this.props;
    const color = value.hex;
    this.setState({ color });
    setColor(color);
  }

  render() {
    const { color }: any = this.props;
    return (
      <div>
        <ChromePicker color={color} onChange={this.handleChange} />
      </div>
    );
  }
}
