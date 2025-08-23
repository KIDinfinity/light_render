import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { queryPageAtomConfig } from '@/services/miscPageAtomConfigControllerService';
import { tenant } from '@/components/Tenant';
import TsarCard from './TsarCard';
import styles from './index.less';
import lodash from 'lodash';

const CoverageBreakdownList = () => {
  const dispatch = useDispatch();
  const tsarBreakDownConifg = useSelector(({ insured360 }: any) => insured360?.tsarBreakDownConifg);

  useEffect(() => {
    const region = tenant.region();
    const fetchData = async () => {
      const response = await queryPageAtomConfig({
        caseCategory: 'Tsar_Break_Down',
        regionCode: region,
      });
      if (response?.success && lodash.isArray(response?.resultData)) {
        dispatch({
          type: 'insured360/saveTsarBreakDownConifg',
          payload: { config: response?.resultData },
        });
      }
    };
    if (lodash.isEmpty(tsarBreakDownConifg)) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.coverageBreakdownList}>
      <div className={styles.header}>TSAR Break Down List</div>
      <TsarCard />
    </div>
  );
};

export default CoverageBreakdownList;
