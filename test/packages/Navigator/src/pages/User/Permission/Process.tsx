import React from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import RightForm from '../_components/RightForm';
import ProcessBar from './ProcessBar';
import styles from './ProcessBar.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const { findAuthActivityByRoleCodesV2 } = useSelector(
    (state: any) => ({
      findAuthActivityByRoleCodesV2: state.userManagement.findAuthActivityByRoleCodesV2,
    }),
    shallowEqual
  );

  return (
    <div className={styles.wrap}>
      <RightForm formTitle="process">
        {lodash.map(
          findAuthActivityByRoleCodesV2,
          (activityResourceDOList, caseCategory) =>
            lodash.isArray(activityResourceDOList) && (
              <ProcessBar
                key={caseCategory}
                title={formatMessageApi({
                  Label_BPM_CaseCategory: caseCategory,
                })}
                barItems={activityResourceDOList}
              />
            )
        )}
      </RightForm>
    </div>
  );
};
