import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { Icon, Tooltip } from 'antd';
import flagList from '@/components/Label/labelList.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getBgColorByLabeCode from 'basic/utils/getBgColorByLabeCode';

import styles from './Flag.less';

export default ({ item }: any) => {
  const indicator = lodash.get(item, 'indicator') || {};
  return (
    <div className={styles.flag} id="taskCardCaseNoContent">
      {lodash.map(indicator?.caseLabelList || [], (labelItem) => {
        const { labelCode } = labelItem;
        const bgColor = getBgColorByLabeCode(labelCode);
        const iconConfig = lodash.find(flagList, (flagItem) => {
          return labelItem?.labelValue && flagItem?.id === labelItem?.labelValue;
        });
        const name = formatMessageApi({ [labelItem.typeCode]: labelItem.labelValue });
        return iconConfig ? (
          <Tooltip title={labelCode} key={labelCode}>
            <Icon
              component={iconConfig?.component}
              className={classnames(iconConfig?.className, styles.flagIcon)}
            />
          </Tooltip>
        ) : (
          <Tooltip title={labelCode} key={labelCode}>
            <div className={classnames(styles.flagIcon, styles.textIndicator, styles[bgColor])}>
              <div className={styles.text}>{name}</div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
