import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import useAbortController from '@/components/AbortController/useAbortController';

import PageLoading from '@/components/PageLoading';

import Auth from './Auth';
import AddEnvoy from './AddEnvoy';
import Progress from './Progress';
import History from './History';
import PreviewModal from './Components/PreviewModal/PreviewModal';

import CaseTaskDetail from 'navigator/components/CaseTaskDetail';

import styles from './index.less';

const Helper = React.memo(({ reasonList, caseCategory }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    reasonList?.map((reasonCode) => {
      dispatch({
        type: 'envoyController/getListMemos',
        payload: {
          reasonCode,
          caseCategory,
        },
      });
    });
  }, [reasonList, caseCategory]);
  return null;
}, lodash.isEqual);

const GetListMemos = () => {
  const historyReasonGroups =
    useSelector((state) => lodash.get(state, 'envoyController.historyReasonGroups')) || [];
  const currentReasonGroups =
    useSelector((state) => lodash.get(state, 'envoyController.currentReasonGroups')) || [];
  const caseCategory = useSelector(({ envoyController }) => envoyController.caseCategory);

  const historyReason = historyReasonGroups.flatMap(
    (reasonGroup) => reasonGroup?.reasonDetails?.map((detail) => detail.reasonCode) || []
  );
  const currentReason = currentReasonGroups.flatMap(
    (reasonGroup) => reasonGroup?.reasonDetails?.map((detail) => detail.reasonCode) || []
  );

  const reasonList = lodash.chain(currentReason).concat(historyReason).uniq().sort().value();
  return <Helper reasonList={reasonList} caseCategory={caseCategory} />;
};

const Content = ({ caseDetail }: any) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: any) => state.loading.effects[`envoyController/initEnvoyData`]
  );

  const signal = useAbortController([caseDetail]);
  useEffect(() => {
    if (!lodash.isEmpty(caseDetail)) {
      const t = async () => {
        dispatch({
          type: 'envoyController/setCaseNo',
          payload: {
            caseDetail,
          },
        });
        await dispatch({
          type: 'envoyController/initEnvoyData',
          signal,
        });
        await dispatch({
          type: 'envoyController/getMedicalProviderDicts',
        });
      };

      t();
    }
    return () => {
      dispatch({
        type: 'envoyController/clearAllData',
        payload: {},
      });
    }
  }, [signal, caseDetail]);

  return (
    <div className={styles.container}>
      {!!loading ? (
        <PageLoading />
      ) : (
        <>
          <AddEnvoy />
          <Progress />
          <History />
          <GetListMemos />
          <PreviewModal />
        </>
      )}
    </div>
  );
};

export default ({ children, caseDetail }: any) => (
  <CaseTaskDetail.Pending.Consumer>
    <Auth>
      <Content caseDetail={caseDetail}>{children}</Content>
    </Auth>
  </CaseTaskDetail.Pending.Consumer>
);
