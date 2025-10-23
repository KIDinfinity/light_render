import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { Icon, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import flagList from './labelList.config';
import styles from './LabelIcon.less';
import getBgColorByLabeCode from 'basic/utils/getBgColorByLabeCode';

const Label = ({ item, render }: any) => {
  const indicator = lodash.get(item, 'indicator');
  return (
    <div className={styles.flag}>
      <div className={styles.flagicon}>
        {lodash.map(indicator?.caseLabelList || [], (labelItem) => {
          const { labelCode } = labelItem;
          const title = formatMessageApi({ [labelItem.labelTypeCode]: labelItem.labelDictCode });
          const bgColor = getBgColorByLabeCode(labelCode);
          const iconConfig = lodash.find(flagList, (flagItem) => {
            return labelItem?.labelValue && flagItem?.id === labelItem?.labelValue;
          });
          const name = formatMessageApi({ [labelItem.typeCode]: labelItem.labelValue });
          return iconConfig ? (
            <Tooltip title={title}>
              <Icon component={iconConfig.component} className={iconConfig.className} />
            </Tooltip>
          ) : (
            <Tooltip title={labelCode === 'OwbPolicyStatus' ? title : labelCode}>
              <div
                className={classnames(
                  styles.textIndicator,
                  labelCode == 'OwbPolicyStatus'
                    ? styles[bgColor]
                    : bgColor == 'defaultTagBg'
                    ? styles.defaultTagBg1
                    : styles[bgColor]
                )}
              >
                <div className={labelCode == 'OwbPolicyStatus' ? styles.text : styles.text1}>
                  {name}
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
      {render && <div className={styles.textRender}>{render()}</div>}
    </div>
  );
};

export default Label;
