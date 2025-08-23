import React from 'react';
import lodash from 'lodash';
import { Select } from 'antd';
import { useDispatch } from 'dva';
import classnames from 'classnames';
import { useGetMonthPeriodDatas } from './_hooks/index';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const PeriodDropDown = ({ monthPeriod, setMonthPeriod, selectedRoleInd }: any) => {
  const monthPeriodDatas = useGetMonthPeriodDatas(selectedRoleInd);
  const dispatch = useDispatch();

  const { Option } = Select;

  return (
    (!lodash.isEmpty(monthPeriodDatas) && (
      <div className={classnames(styles.container, styles.periodDropDown)}>
        <Select
          defaultValue={monthPeriod}
          onSelect={(value: any) => {
            setMonthPeriod(value);
            dispatch({
              type: 'insured360/setMonthPeriod',
              payload: { monthPeriod: value },
            });
          }}
          placeholder={formatMessageApi({ Label_BIZ_Policy: 'TASRByPeriod' })}
        >
          {lodash.map(monthPeriodDatas, (item) => (
            <Option
              value={item?.monthPeriod}
              key={item?.monthPeriod}
              className={styles.periodOption}
            >
              {item?.monthPeriod}
            </Option>
          ))}
        </Select>
      </div>
    )) ||
    null
  );
};

export default PeriodDropDown;
