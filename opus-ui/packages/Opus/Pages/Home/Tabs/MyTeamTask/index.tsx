import classname from 'classnames';
import React from 'react';
import AllCase from '../../Components/AllCase';
import CountTaskStatus from '../../Components/CountTaskStatus';
import TeamPipeline from '../../Components/CountTaskStatus/TeamPipeline';
import LeaveOverview from '../../Components/LeaveOverview';
import styles from '../../index.less';

export default ({ tabKey }: any) => {
  return (
    <>
      <div className={styles.myTeamContent}>
        <div className={classname(styles.taskStatus, styles.item)}>
          <CountTaskStatus tabKey={tabKey} />
        </div>
        <div className={classname(styles.overView)}>
          <LeaveOverview />
        </div>
      </div>
      <TeamPipeline />
      <AllCase tabKey={tabKey} />
    </>
  );
};
