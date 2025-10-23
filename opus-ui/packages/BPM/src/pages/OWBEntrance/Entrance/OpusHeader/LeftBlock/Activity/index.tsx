import React, { useContext, useState, useEffect } from 'react';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import context from '../../../../Context/context';
import lodash from 'lodash';
import getIndicator from 'bpm/pages/OWBEntrance/Header/getIndicator';
import InfoLabel from 'bpm/pages/OWBEntrance/Header/InfoLabel';
import TaskDefKey from 'basic/enum/TaskDefKey';

const Activity = () => {
  const { state } = useContext(context);

  const [indicator, setIndicator] = useState({});

  const { taskDetail, title } = state;
  const activity = taskDetail?.taskDefKey;

  useEffect(() => {
    if (
      !lodash.isEmpty(taskDetail?.caseNo) &&
      taskDetail?.activityKey === TaskDefKey.BP_NB_ACT008
    ) {
      getIndicator({ caseNo: taskDetail.caseNo, setIndicator });
    }
  }, [taskDetail]);

  return (
    <div className={styles.activity}>
      {!!title
        ? title
        : formatMessageApi({
            activity,
          })}
      <InfoLabel indicator={indicator} />
    </div>
  );
};

Activity.displayName = 'activity';

export default Activity;
