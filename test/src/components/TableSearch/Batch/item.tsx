import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Item extends PureComponent {
  render() {
    const { rows, children } = this.props; // children必须是方法

    return <Fragment>{children({ rows })}</Fragment>;
  }
}

Item.propTypes = {
  children: PropTypes.func,
  rows: PropTypes.array,
};

Item.defaultProps = {
  children: () => {},
  rows: [],
};
