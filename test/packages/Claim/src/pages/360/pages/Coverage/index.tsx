import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import { Radio } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CoverageTsar from './TsarList';
import PeriodDropDown from './PeriodDropDown';
import useGetCoverageRoleList from '../C360Expander/_hooks/useGetCoverageRoleList';
import styles from './index.less';

const CoverageMonthPeriod = ({ selectedRoleInd }: any) => {
  const [monthPeriod, setMonthPeriod] = useState('ALL');

  return (
    <>
      <PeriodDropDown
        selectedRoleInd={selectedRoleInd}
        monthPeriod={monthPeriod}
        setMonthPeriod={setMonthPeriod}
      />

      <CoverageTsar selectedRoleInd={selectedRoleInd} monthPeriod={monthPeriod} />
    </>
  );
};

const CoverageRole = ({ setSelectedRoleInd }: any) => {
  const coverageRoleList = useGetCoverageRoleList({ displayStyle: 'left' });
  const defalutRole = lodash.get(coverageRoleList, '[0]');

  useEffect(() => {
    if (lodash.size(coverageRoleList) > 0) {
      setSelectedRoleInd(defalutRole);
    }
  }, [coverageRoleList]);

  return (
    (!lodash.isEmpty(coverageRoleList) && (
      <div className={styles.container}>
        <Radio.Group
          onChange={(e: any) => {
            setSelectedRoleInd(e?.target?.value);
          }}
          defaultValue={defalutRole}
          buttonStyle="solid"
        >
          {lodash.map(coverageRoleList, (role: any) => (
            <Radio.Button value={role} key={role}>
              {formatMessageApi({ Dropdown_CLM_CustomerRole: role })}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    )) ||
    null
  );
};

const Coverage = () => {
  const dispatch = useDispatch();
  const [selectedRoleInd, setSelectedRoleInd] = useState();

  useEffect(() => {
    dispatch({
      type: `insured360/getTsarCalculationCategoryDisplayPeriod`,
    });
  }, []);

  return (
    <div className={styles.coverage}>
      <CoverageRole setSelectedRoleInd={setSelectedRoleInd} />
      <CoverageMonthPeriod selectedRoleInd={selectedRoleInd} />
    </div>
  );
};

export default Coverage;
