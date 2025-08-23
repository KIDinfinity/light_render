import React, { useEffect, useCallback } from 'react';
import Insured from '../DataCapture/Insured/InsuredV2';
import Claimant from './ClaimantV2';
import Incident from './Incident/IncidentList';
import CaseSplit from 'claim/pages/CaseSplit';
import { useDispatch, connect,  } from 'dva';
import { Row, Col } from 'antd';
import PageContainer from 'basic/components/Elements/PageContainer';
import SearchModal from '../DataCapture/Insured/SearchModal';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import { NAMESPACE } from './activity.config';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import lodash from 'lodash';
import dictionaryConfig from '../DataCapture/DictionaryByTypeCodes.config';

// import dictionaryConfig from '../DataCapture/DictionaryByTypeCodes.config';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

const Index = ({ taskDetail, businessData, listPolicy, dictsClaimType }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      taskDetail,
      payload: businessData,
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig.HKdataCapture.concat([
        'Dropdown_COM_AssuranceClaimType',
        'Dropdown_CLM_AssuranceDecision',
      ]),
    });
    (async () => {
      const state: any = await dispatch({ type: 'global/accessStore' });
      const claimProcessData = state[NAMESPACE].claimProcessData,
        taskNotEditable = state.claimEditable.taskNotEditable;
      const insuredId = lodash.get(claimProcessData?.insured, 'insuredId');
      if (insuredId && !taskNotEditable && taskDetail?.companyCode !== 'Assurance') {
        dispatch({
          type: `${NAMESPACE}/getC360Data`,
          payload: {
            isInitial: true,
          },
        });
      }
    })();
  }, []);

  const updateClaimProcessData = useCallback(async (claimProcessData: any, fnShowLoading: any) => {
    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: claimProcessData,
    });
    await dispatch({
      type: `${NAMESPACE}/saveDefaultClaimProcessData`,
    });

    if (lodash.isFunction(fnShowLoading)) {
      fnShowLoading(false);
    }
  }, []);

  return (
    <PageContainer
      pageConfig={
        taskDetail || {
          caseCategory: 'BP_CLM_CTG009',
          activityKey: 'BP_CLM_AS_ACT004',
        }
      }
    >
      <Row gutter={24}>
        <Col {...layout}>
          <Insured />
        </Col>
        <Col {...layout}>
          <Claimant />
        </Col>
      </Row>
      <Incident />
      {/*
      <ServiceAgent />
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
        })}
      />
      <PayeeInfo /> */}
      {taskDetail && (
        <CaseSplit
          updateClaimProcessData={updateClaimProcessData}
          claimTypes={dictsClaimType}
          listPolicy={listPolicy}
          taskDetail={taskDetail}
          tabConfig={{
            splitTypeDef: 'Incident',
            policy: { disabled: true },
            document: { disabled: true },
          }}
        />
      )}

      <SearchModal />
      <FurtherClaimModal namespace={NAMESPACE} />
    </PageContainer>
  );
};
// export default Index
export default connect(
  ({
    [NAMESPACE]: modelnamepsace,
    user,
    formCommonController,
    dictionaryController,
    claimEditable,
  }: any) => ({
    claimProcessData: modelnamepsace.claimProcessData,
    claimEntities: modelnamepsace.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(
  changeWorkSpaceHoc(
    setEnvoyHoc(
      setInformationHoc(
        setInsured360Hoc(setClaimEditableHoc(eSubmimnssionValidation(NAMESPACE)(Index)))
      )
    )
  )
);

const HistoryComponent = connect(
  ({
    [NAMESPACE]: modelnamepsace,
    user,
    formCommonController,
    dictionaryController,
    claimEditable,
  }: any) => ({
    claimProcessData: modelnamepsace.claimProcessData,
    claimEntities: modelnamepsace.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(Index);

export { HistoryComponent };
