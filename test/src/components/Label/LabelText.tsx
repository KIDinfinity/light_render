import React from 'react';
import lodash from 'lodash';
import { Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// import flagList from './labelList.config';
import styles from './LabelText.less';

const Label = ({ indicator, className }: any) => {
  return (
    <div className={className}>
      {lodash.map(indicator?.caseLabelList || [], (item: any) => {
        const { labelValue, valueTypeCode, labelDictCode, labelTypeCode } = item;
        const name = valueTypeCode ? formatMessageApi({ [valueTypeCode]: labelValue }) : labelValue;
        const title = labelTypeCode ? formatMessageApi({ [labelTypeCode]: labelDictCode }) : labelDictCode;
        return (
          <Tooltip title={title} key={labelDictCode}>
            <div className={styles.labelTooltip}> {name} </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default Label;
