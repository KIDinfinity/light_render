import React, { useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Spin } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DrawHeadTitle from '@/components/DrawHeadTitle';
import CaseSearch from 'bpm/pages/Envoy/CaseSearch/CaseSearch';
import EnvoyList from 'bpm/pages/Envoy/EnvoyList/EnvoyList';
import HistoryList from 'bpm/pages/Envoy/HistoryList/HistoryList';
import EnvoyBatchSend from 'bpm/pages/Envoy/EnvoyBatchSend';
import Content from './Content';
import styles from './Envoy.less';
import AuthPremission from '@/auth/Authorized/AuthPremission';
import { EnvoyRequestType } from 'bpm/pages/Envoy/enum';
import EnvoyPreviewMode from './components/EnvoyPreviewMode';
import CaseTaskDetailContext from 'navigator/components/CaseTaskDetail/Pending/Context.ts';

export default ({ taskDetail }: any) => {
  const { enableGetDetial, localTaskId } = useContext(CaseTaskDetailContext);
  const dispatch = useDispatch();

  const historyChangeTime = useSelector(
    (state: any) => state.envoyController.historyChangeTime,
    shallowEqual
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['envoyController/initEnvoyData'],
    shallowEqual
  );

  const envoyDom: any = useRef(null);

  useEffect(() => {
    // 功能：send（send完就结束的那种）、resolved、waived后，焦点应该继续保持在当前reason上
    // 所以：以上会进入历史记录的操作后，会打开最后一个历史记录，配合这个滚动到底，实现上面的功能
    if (lodash.isNull(historyChangeTime)) {
      return;
    }
    const currentDom = envoyDom?.current;
    const currentDomTop = currentDom?.offsetTop;
    const currentDomH = currentDom?.clientHeight;
    const parentDom = currentDom?.parentElement;
    const parentDomH = parentDom?.clientHeight;
    const scrollTop = currentDomH + currentDomTop - parentDomH;
    let scrollTopTime: unknown;
    if (scrollTop > 0) {
      scrollTopTime = setTimeout(() => {
        parentDom.scrollTop = scrollTop;
      });
    }

    return () => {
      if (scrollTopTime) {
        clearTimeout(scrollTopTime);
      }
    };
  }, [historyChangeTime]);
  useEffect(() => {
    if (enableGetDetial === true && !localTaskId) {
      dispatch({
        type: 'envoyController/clearReasonInfo',
      });
    }
  }, [enableGetDetial, localTaskId]);
  return (
    <div className={styles.envoy} ref={envoyDom}>
      <DrawHeadTitle>
        {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.title' })}
      </DrawHeadTitle>
      <div className={styles.content}>
        <CaseSearch />
        <AuthPremission type="envoy">
          <Content>
            {loading ? (
              <div className={styles.spin}>
                <Spin />
              </div>
            ) : (
              <>
                <EnvoyBatchSend />
                <EnvoyList taskDetail={taskDetail} requestType={EnvoyRequestType.pending} />
                <EnvoyList taskDetail={taskDetail} requestType={EnvoyRequestType.nonPending} />
                <HistoryList />
              </>
            )}
          </Content>
        </AuthPremission>
      </div>
      <EnvoyPreviewMode />
    </div>
  );
};
