import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
// import styles from './index.less';

export default class Item extends PureComponent {
  render() {
    const { label, form, children, expand, simple = false } = this.props;

    return (
      <div style={{ display: expand || simple ? '' : 'none' }}>
        <Form.Item label={label}>{children({ form })}</Form.Item>
      </div>
    );
  }
}

Item.propTypes = {
  children: PropTypes.func,
};

Item.defaultProps = {
  children: () => {},
};
