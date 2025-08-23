import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import useGetRouterParams from 'basic/hooks/useGetRouterParams';
import useLoadEWSVersions from 'process/NewBusiness/EWS/_hooks/useLoadEWSVersions';
import useSetInitSelectedEwsVersion from 'process/NewBusiness/EWS/_hooks/useSetInitSelectedEwsVersion';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Layout from './Layout';
import Content from './Content';
import Versions from './Versions';
import Header from './Header';
import CaseContainer from 'basic/components/CaseContainer';
import EWSDataProvider from './EWSDataProvider';
import { NAMESPACE } from './activity.config';
import { useParams } from 'umi';

const EWS = (props: any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { businessNo: applicationNo, caseNo } = useGetRouterParams({
    match: { params },
    keys: ['businessNo', 'caseNo'],
  });

  const { getTaskDetail } = props;
  const [loading, setLoading] = useState(true);

  useLoadEWSVersions({ applicationNo, setLoading });
  useSetInitSelectedEwsVersion();

  useEffect(() => {
    if (caseNo) {
      dispatch({
        type: `${NAMESPACE}/getCaseDetail`,
        payload: {
          caseNo,
        },
      });

      getTaskDetail({
        processInstanceId: caseNo,
      });
    }
  }, [caseNo]);

  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/resetBizData`,
      });
    };
  }, []);
  return (
    <>
      <Layout loading={loading}>
        <Header />
        <Versions />
        <Content applicationNo={applicationNo} />
      </Layout>
    </>
  );
};

export default (props: any) => {
  return (
    <EWSDataProvider>
      <CaseContainer defaultActivityKey="BP_NB_ACT004">
        <CaseTaskDetail.Consumer>
          <EWS {...props} />
        </CaseTaskDetail.Consumer>
      </CaseContainer>
    </EWSDataProvider>
  );
};
