import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import useGetRouterParams from 'basic/hooks/useGetRouterParams';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Layout from './Layout';
import Content from './Content';
import Versions from './Versions';
import Header from './Header';
import { NAMESPACE } from '../BaseProduct/activity.config';
import lodash from 'lodash';
import { useParams } from 'umi';

const EWS = (props: any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const dataList = useSelector((state: any) => lodash.get(state, `${NAMESPACE}.ewsData`, []));

  const { businessNo, caseNo } = useGetRouterParams({
    match: { params },
    keys: ['businessNo', 'caseNo'],
  });
  const { setTaskDetail, setProcessInstanceId, setDataSource } = props;

  const loading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/ewsGetVersionList`]
  );

  useEffect(() => {
    if (caseNo) {
      dispatch({
        type: `${NAMESPACE}/ewsGetCaseDetail`,
        payload: {
          caseNo,
        },
      });
    }
  }, [caseNo]);

  useEffect(() => {
    if (businessNo) {
      dispatch({
        type: `${NAMESPACE}/ewsGetVersionList`,
        payload: {
          businessNo,
        },
      });
    }
  }, [businessNo]);
  // envoy c360
  useEffect(() => {
    if (setProcessInstanceId) {
      setProcessInstanceId(caseNo);
    }
  }, [setProcessInstanceId]);
  // information
  useEffect(() => {
    if (setDataSource) {
      setDataSource('CASE');
    }
  }, [setDataSource]);

  useEffect(() => {
    if (setTaskDetail) {
      dispatch({
        type: 'processTask/save',
        payload: {
          getTask: {
            businessNo,
            caseCategory: 'BP_POS_CTG001',
            activityKey: 'BP_POS_ACT002',
            taskDefKey: 'BP_POS_ACT002',
            taskStatus: 'completed',
          },
        },
      });
      setTaskDetail({
        businessNo,
        caseCategory: 'BP_POS_CTG001',
        activityKey: 'BP_POS_ACT002',
        taskDefKey: 'BP_POS_ACT002',
        taskStatus: 'completed',
      });
    }
  }, [setTaskDetail]);

  return (
    <>
      <Layout loading={loading} isEmpty={lodash.isEmpty(dataList)}>
        <Header />
        <Versions />
        <Content />
      </Layout>
    </>
  );
};

export default (props: any) => {
  return (
    <CaseTaskDetail.Consumer>
      <EWS {...props} />
    </CaseTaskDetail.Consumer>
  );
};
