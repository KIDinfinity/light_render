import { ReactComponent as UrgentIcon } from './urgent.svg';
import { ReactComponent as UrgentdIcon } from './urgentd.svg';
import createUrgentTask from './createUrgentTask';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import styles from '../index.less';
const UrgentButton = ({ taskId }) => {
  const [urgentStatus, setUrgentStatus] = useState(false);
  const urgent: boolean = useSelector(({ processTask }) => processTask?.getTask?.urgent) || false;
  const processInstanceId: any = useSelector(
    (state) => state?.processTask?.getTask?.processInstanceId
  );
  useEffect(() => {
    setUrgentStatus(urgent);
  }, [urgent]);
  const handleUrgentTask = async () => {
    const respone: any = await createUrgentTask({
      processInstanceId,
      urgent: urgentStatus === true ? 0 : 1,
    });
    if (respone) {
      setUrgentStatus(urgentStatus === true ? false : true);
    }
  };
  return (
    <>
      <span className={styles.urgent} onClick={handleUrgentTask}>
        {urgentStatus ? <UrgentdIcon /> : <UrgentIcon />}
      </span>
    </>
  );
};

export default UrgentButton;
