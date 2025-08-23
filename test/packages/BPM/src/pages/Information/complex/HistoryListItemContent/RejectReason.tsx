import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import useJudgeDispalyReason from 'bpm/pages/Information/_hooks/useJudgeDispalyReason';

const RejectReason = ({ allCategoryTypeCode, item }: any) => {
  const displayReason = useJudgeDispalyReason({ category: item.category });

  return (
    <>
      {displayReason && (
        <div className={styles.policy}>
          <div className={styles.label}>
            {formatMessageApi({
              Label_Sider_Information: item.reasonType,
            })}
            :
          </div>
          <div className={styles.content}>
            {formatMessageApi({
              [lodash.get(allCategoryTypeCode, item.reasonType)]: item.reason,
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RejectReason;
