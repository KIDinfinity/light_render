import React, { useContext, useEffect, useState } from 'react';
import lodash from 'lodash';
import InfoHead from './InfoHead';
import getIndicator from './getIndicator';
import { useGetQueryPageAtomConfig } from '../_hooks';
import context from '../Context/context';
import styles from './InfoContainer.less';
import { useSelector } from 'dva';
import { tenant } from '@/components/Tenant';

export default React.memo(
  ({ children }: any) => {
    const [indicator, setIndicator] = useState({});
    const { state, dispatch } = useContext(context);
    const { taskDetail } = lodash.pick(state, 'taskDetail');
    const isReassess = useSelector((item: any) => item?.GeneralPOSController?.isReassess);

    useEffect(() => {
      if (!lodash.isEmpty(taskDetail?.caseNo)) {
        getIndicator({ caseNo: taskDetail.caseNo, setIndicator });
      }
    }, [taskDetail, isReassess]);

    useGetQueryPageAtomConfig({
      caseCategory: taskDetail?.caseCategory,
      sectionId: 'HeadLabel',
      dispatch,
    });
    const isShowLabelHead = !tenant.isJP() && !!indicator.caseLabelList?.length;
    return (
      <div className={styles.wrap}>
        {isShowLabelHead ? (
          <InfoHead indicator={indicator}>{children}</InfoHead>
        ) : (
          <div>{children}</div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
