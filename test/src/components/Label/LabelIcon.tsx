import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { Icon, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import flagList from './labelList.config';
import styles from './LabelIcon.less';
import getBgColorByLabeCode from 'basic/utils/getBgColorByLabeCode';
import IndicatorLabelCode from 'basic/enum/IndicatorLabelCode';

const Label = ({ item, render }: any) => {
  const indicator = lodash.get(item, 'indicator');
  return (
    <div className={styles.flag}>
      <div className={styles.flagicon}>
        {lodash.map(indicator?.caseLabelList || [], (labelItem) => {
          const { labelCode } = labelItem;
          const title = formatMessageApi({ [labelItem.labelTypeCode]: labelItem.labelDictCode });
          const bgColor = getBgColorByLabeCode(labelCode);
          const iconConfig =
            labelCode != IndicatorLabelCode.VIPService &&
            lodash.find(flagList, (flagItem) => {
              return labelItem?.labelValue && flagItem?.id === labelItem?.labelValue;
            });
          const name = formatMessageApi({ [labelItem.typeCode]: labelItem.labelValue });
          const renderBg = () => {
            switch (labelCode) {
              case 'OwbPolicyStatus':
              case 'IntermediaryStatus':
                return styles[bgColor];
              case 'Investigation':
                return styles.defaultTagBg2;
              case 'UWRuleFail':
                return styles.defaultTagBg3;
              default:
                if (bgColor === 'defaultTagBg') return styles.defaultTagBg1;
                return styles[bgColor];
            }
          };

          const showLabelTitle = lodash.includes(
            [
              'OwbPolicyStatus',
              'UWRuleFail',
              'adminRule',
              'PreDecision',
              'IntermediaryStatus',
              'VIPService',
            ],
            labelCode
          );
          return (
            <>
              {iconConfig ? (
                <Tooltip title={title}>
                  <Icon component={iconConfig.component} className={iconConfig.className} />
                </Tooltip>
              ) : (
                <Tooltip title={showLabelTitle ? title : labelCode}>
                  <div className={classnames(styles.textIndicator, renderBg())}>
                    <div className={classnames(styles.text, renderBg())}>{name}</div>
                  </div>
                </Tooltip>
              )}
            </>
          );
        })}
      </div>
      {render && <div className={styles.textRender}>{render()}</div>}
    </div>
  );
};

export default Label;
