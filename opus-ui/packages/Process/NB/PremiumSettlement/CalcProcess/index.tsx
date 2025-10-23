import React from 'react';
import PolicyInfo from './PolicyInfo';
import CalculateInfo from './CalculateInfo';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetNtuDate from 'process/NB/PremiumSettlement/_hooks/useGetNtuDate';
import moment from 'moment';

const CalcProcess = ({ wrapperRef }: any) => {
  const ntuDate = useGetNtuDate();
  const [divHeight, setDivHeight] = React.useState(0);
  React.useEffect(() => {
    setDivHeight(wrapperRef?.current?.clientHeight);
  }, [wrapperRef]);

  return (
    <div className={styles.pre} style={{ height: divHeight }}>
      <div className={styles.Container}>
        <div className={styles.headerWrap}>
          <PolicyInfo />
          <CalculateInfo />
        </div>
        <div className={styles.ntuContent}>
          <div className={styles.ntuTitle}>
            {formatMessageApi({
              Label_BIZ_Policy: 'NTUDate',
            })}
          </div>
          <div className={styles.con}>{ntuDate ? moment(ntuDate).format('L') : '-'}</div>
        </div>
      </div>
    </div>
  );
};
CalcProcess.displayName = 'CalcProcess';
export default CalcProcess;
