import { formatMessageApi } from '@/utils/dictFormatMessage';
import isOpus from '@/utils/isOpus';
import { Icon } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'dva';
import useHandleSearchRelevantCaseInSmartCircleCallback from 'navigator/pages/SmartCircle/hooks/useHandleSearchRelevantCaseInSmartCircleCallback';
import React, { useEffect } from 'react';
import { history } from 'umi';
import styles from './index.less';

function CaseNoLink({ value, beforeGoRouter }: any) {
  const inOpus = isOpus();
  const dispatch = useDispatch();
  function selectedId() {
    const id = 'caseno';
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

  const handleClick = () => {
    const params = new URL(document.location).searchParams;
    const afterHook = params.get('afterHook');

    if (inOpus) {
      return false;
    }

    if (afterHook === 'closeWin') {
      return false;
    }
    if (beforeGoRouter) {
      beforeGoRouter();
    }
    dispatch({
      type: 'navigatorInformationController/clearAuditLogList',
    });
    history.push(`/navigator/case/detail/${value}`);
  };

  const handleClickGlobalIcon = useHandleSearchRelevantCaseInSmartCircleCallback({ value });
  return (
    <>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
        })}
      </span>
      <span className={styles.wrap}>
        <span
          className={classNames(styles.text, { [styles.noUnderline]: inOpus })}
          id="caseno"
          onClick={() => {
            handleClick();
          }}
        >
          {value}
        </span>
        {!inOpus && (
          <Icon className="btn_case_relationship" type="global" onClick={handleClickGlobalIcon} />
        )}
      </span>
    </>
  );
}

export default CaseNoLink;
