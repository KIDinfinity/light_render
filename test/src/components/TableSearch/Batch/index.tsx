import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapprops from '@/utils/mapprops';
import BatchMore from './more';
import BatchItem from './item';
import styles from './index.less';

export default class Batch extends PureComponent {
  static Item = BatchItem;

  static More = BatchMore;

  render() {
    const { children, selectedRows } = this.props;

    return (
      <div className={styles.operator} data-role="tableSearch.operator">
        {mapprops(children, { rows: selectedRows })}
      </div>
    );
  }
}

Batch.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  selectedRows: PropTypes.array,
};

Batch.defaultProps = {
  children: [],
  selectedRows: [],
};
