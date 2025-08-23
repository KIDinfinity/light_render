import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Form } from 'antd';
import styles from './index.less';

export default class Item extends PureComponent {
  render() {
    const { md = 8, sm = 24, label, form, children, expand, simple = false } = this.props;
    return (
      <Col
        md={md}
        sm={sm}
        className={styles.item}
        style={{ display: expand || simple ? '' : 'none' }}
      >
        <Form.Item label={label}>{children({ form })}</Form.Item>
      </Col>
    );
  }
}

Item.propTypes = {
  children: PropTypes.func,
};

Item.defaultProps = {
  children: () => {},
};
