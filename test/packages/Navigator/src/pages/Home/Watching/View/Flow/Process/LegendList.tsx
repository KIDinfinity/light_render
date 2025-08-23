import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import styles from './legendList.less';

const LegendList = ({ title, list }) => (
  <div className={styles.legend_list}>
    <div className="legend_title">
      {title && (
        <span className="legend_title_text" title={title}>
          {title}
        </span>
      )}
    </div>
    <ul className="legend_content">
      {lodash.map(list, (item, index) => (
        <li
          className={classNames('legend_item', `legend_item_${index}`)}
          key={`legend_item_${index}`}
        >
          <i className="legend_item_icon" style={{ background: item.color }} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default LegendList;
