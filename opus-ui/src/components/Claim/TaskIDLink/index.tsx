import React, { useEffect } from 'react';
import { history } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

function TaskIDLink({ value }) {
  function selectedId() {
    const id = 'taskId';
    if (
      document.getSelection().baseNode &&
      document.getSelection().focusNode.parentNode &&
      document.getSelection().focusNode.parentNode.id === id
    ) {
      document.getSelection().selectAllChildren(document.getSelection().focusNode.parentNode);
    }
  }
  useEffect(() => {
    document.addEventListener('selectionchange', selectedId);
    return () => document.removeEventListener('selectionchange', selectedId);
  }, []);

  return (
    <>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BPM_CaseInfo: 'TaskID',
        })}
      </span>
      <span className={styles.wrap} onClick={() => history.push(`/process/task/detail/${value}`)}>
        <span className={styles.text} id="taskId">
          {value}
        </span>
      </span>
    </>
  );
}

export default TaskIDLink;
