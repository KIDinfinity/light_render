import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import styles from './index.less';
import SortMachine from './Machine/SortMachine';

export interface SortProps {
  sortName: string;
  sortOrder: string;
}

interface IProps {
  sortName: string;
  sortOrders: SortProps[];
  sortMore: boolean;
  title: any;
}

class Sorter extends PureComponent<IProps> {
  get currentOrder() {
    const { sortName, sortOrders } = this.props;
    return lodash
      .chain(sortOrders)
      .find((el) => el.sortName === sortName)
      .get('sortOrder')
      .value();
  }

  get currentIndex() {
    const { sortName, sortOrders } = this.props;
    const currentIndex = lodash
      .chain(sortOrders)
      .findIndex((el) => el.sortName === sortName)
      .value();
    if (currentIndex < 0) {
      return '';
    }
    return currentIndex + 1;
  }

  get nextOrder() {
    const next = SortMachine.transition(this.currentOrder || 'undefined', 'NEXT').value;
    return next === 'undefined' ? '' : String(next);
  }

  get sortOrders() {
    const { sortOrders = [], sortName, sortMore = false } = this.props;
    let sortOrdersTemp = lodash.cloneDeep(sortOrders);

    if (!sortMore) {
      return [
        {
          sortName,
          sortOrder: this.nextOrder,
        },
      ];
    }
    if (!this.currentOrder) {
      sortOrdersTemp.push({
        sortName,
        sortOrder: this.nextOrder,
      });
    } else if (this.nextOrder) {
      sortOrdersTemp = sortOrdersTemp.map((item) => {
        if (item.sortName === sortName) {
          lodash.set(item, 'sortOrder', this.nextOrder);
        }
        return item;
      });
    } else if (!this.nextOrder) {
      sortOrdersTemp = lodash.filter(sortOrdersTemp, (el) => el.sortName !== sortName);
    }
    return sortOrdersTemp;
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.sorter}>
        <div className={styles.sorterWord}>{title}</div>
        <div className={styles.sorterIcon}>
          <Icon
            type="caret-up"
            className={`${styles.icon} ${this.currentOrder === 'asc' && styles.active}`}
          />
          <Icon
            type="caret-down"
            className={`${styles.icon} ${styles.iconDown} ${
              this.currentOrder === 'desc' && styles.active
            }`}
          />
          <div className={styles.sorterIndex}>{this.currentIndex}</div>
        </div>
        <div className={styles.sorterCover} />
      </div>
    );
  }
}

export default Sorter;
