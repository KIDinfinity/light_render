import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import { Tooltip } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default (props: any) => {
  const { form, formName, handleFormat, labelTypeCode, labelId } = props;
  const text = form.getFieldValue(formName);
  const value = lodash.isFunction(handleFormat) ? handleFormat(text) : text;

  return (
    <div className="ant-form-item">
      <div className="ant-form-item-label">
        <label>
          <span className="formItemLabel">
            {formatMessageApi({
              [labelTypeCode]: labelId,
            })}
          </span>
        </label>
      </div>
      <div className={classNames(styles.formItemText)}>
        <Tooltip title={value}>{value || ''}</Tooltip>
      </div>
    </div>
  );
};
