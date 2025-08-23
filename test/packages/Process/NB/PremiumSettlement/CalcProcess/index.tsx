import React from 'react';
import PolicyInfo from './PolicyInfo';
import CalculateInfo from './CalculateInfo';
import styles from './index.less';
const CalcProcess = ({ wrapperRef }: any) => {
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
      </div>
    </div>
  );
};
CalcProcess.displayName = 'CalcProcess';
export default CalcProcess;
