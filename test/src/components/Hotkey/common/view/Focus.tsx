import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import styles from './Focus.less';

interface IComponentProps {
  id: string;
  block?: true;
  dynamicMergedConfigs: any;
  className?: string;
}
@connect(({ hotkey }: any) => ({
  dynamicMergedConfigs: hotkey.dynamicMergedConfigs,
}))
class Focus extends Component<IComponentProps> {
  activeRender = (list) => {
    return lodash
      .chain(list)
      .filter((item) => item.active)
      .map((item: any, index, filterdList: any) => {
        const activeSelect = lodash.find(item.sections, 'active');
        if (activeSelect) {
          return activeSelect;
        }
        return item;
      })
      .value();
  };

  render() {
    const { block = true, id, children, dynamicMergedConfigs, className = '' } = this.props;

    // const activeItem = this.activeRender(dynamicMergedConfigs);
    return block ? (
      <div
        className={`${styles.focus} ${className}`}
        // TODO:现在效果先关闭
        // className={`${styles.focus} ${
        //   !!activeItem[0] && activeItem[0].id == id ? `${styles.activeAmi} ` : ''
        // }`}
        tabIndex={0}
        id={`hotkey_${id}`}
      >
        {children}
      </div>
    ) : (
      <span
        className={`${styles.focus}`}
        // className={`${styles.focus} ${
        //   !!activeItem[0] && activeItem[0].id == id ? `${styles.activeAmi} ` : ''
        // }`}
        tabIndex={0}
        id={`hotkey_${id}`}
      >
        {children}
      </span>
    );
  }
}

export default Focus;
