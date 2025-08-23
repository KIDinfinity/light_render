import React, { useEffect, lazy, Suspense } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Spin } from 'antd';
import Modal, { EButtonType } from 'basic/components/CommonModal';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { VLD_000566, VLD_000568 } from 'claim/pages/HongKong/FurtherClaim/validator';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { warnMessageModal } from 'claim/pages/utils/popModel';

import styles from './SerialTreatment/styles.less';

const SerialClaim = lazy(() => import('./SerialTreatment'));

// 日本已经移到具体流程中,不使用这个组件

const FurtherClaim = ({
  furtherClaimVisable,
  claimProcessData,
  claimEntities,
  namespace,
  dispatch,
  taskNotEditable,
  isRegisterMcs,
  loading,
}: any) => {
  const claimData = { claimProcessData, claimEntities, isRegisterMcs };
  const isVld000568 = VLD_000568(claimData);

  const btnList = tenant.region({
    [Region.JP]: () => {
      return [
        {
          id: EButtonType.Confirm,
          handler: async () => {
            dispatch({
              type: 'claimCaseController/saveFurtherClaimVisable',
              payload: { furtherClaimVisable: false },
            });
            dispatch({
              type: `${namespace}/addTreatments`,
            });
          },
          show: !taskNotEditable,
          order: 0,
        },
        {
          id: EButtonType.Return,
          handler: () => {
            dispatch({
              type: 'claimCaseController/saveFurtherClaimVisable',
              payload: { furtherClaimVisable: false },
            });
            dispatch({ type: `${namespace}/saveFurtherClaimRelationshipId`, payload: {} });
          },
          show: true,
          order: 2,
        },
      ];
    },
    notMatch: () => {
      return [
        {
          id: EButtonType.Confirm,
          handler: async () => {
            dispatch({
              type: 'claimCaseController/saveFurtherClaimVisable',
              payload: { furtherClaimVisable: false },
            });
          },
          show: !taskNotEditable && !isRegisterMcs,
          order: 0,
        },
        {
          id: EButtonType.Return,
          handler: () => {
            dispatch({
              type: 'claimCaseController/saveFurtherClaimVisable',
              payload: { furtherClaimVisable: false },
            });
          },
          show: true,
          order: 2,
        },
        {
          id: EButtonType.Refresh,
          label: 'Refresh',
          typeCode: 'Label_BIZ_Claim',
          iconType: 'sync',
          show: !taskNotEditable && !isRegisterMcs,
          handler: async () => {
            const result = await warnMessageModal(
              [{ Label_COM_Message: 'MSG_000486' }],
              true,
              false
            );
            if (result) dispatch({ type: `${namespace}/refreshSerialTreatment` });
          },
          order: 1,
        },
      ];
    },
  });

  const { claimRelation } = claimData?.claimProcessData || {};

  useEffect(() => {
    if (!lodash.isEmpty(claimRelation)) {
      dispatch({
        type: `${namespace}/getRelationTreatmentInfo`,
        payload: {
          claimRelation,
        },
      });
    }
  }, [claimRelation]);

  useEffect(() => {
    if (!taskNotEditable && !isRegisterMcs && furtherClaimVisable) {
      dispatch({ type: `${namespace}/refreshSerialTreatment` });
    }
  }, [furtherClaimVisable]);

  const cancelModal = () => {
    dispatch({
      type: 'claimCaseController/saveFurtherClaimVisable',
      payload: { furtherClaimVisable: false },
    });
  };
  return (
    <Modal
      btnList={btnList}
      onCancel={cancelModal}
      width={'80%'}
      visible={furtherClaimVisable}
      closable={false}
      zIndex={99999}
      maskClosable={false}
    >
      {loading && (
        <div className={styles.spinWrap}>
          <Spin />
        </div>
      )}
      {furtherClaimVisable && (
        <div className={styles.furtherClaim}>
          <div className={styles.header}>
            {formatMessageApi({ Label_BIZ_Claim: 'SerialClaimSelection' })}
            {!taskNotEditable && !isRegisterMcs && VLD_000566(claimData) && (
              <ErrorTooltipManual
                isWarning
                manualErrorMessage={formatMessageApi({ Label_COM_Message: 'MSG_000487' })}
              />
            )}
            {!taskNotEditable && !isRegisterMcs && isVld000568 && (
              <ErrorTooltipManual
                isWarning
                manualErrorMessage={formatMessageApi({ Label_COM_Message: 'MSG_000489' })}
              />
            )}
          </div>
          <Suspense
            fallback={
              <div className={styles.spinWrap}>
                <Spin />
              </div>
            }
          >
            <SerialClaim isVld000568={isVld000568} namespace={namespace} />
          </Suspense>
        </div>
      )}
    </Modal>
  );
};

export default connect(
  (
    { dictionaryController, claimCaseController, claimEditable, loading, ...res }: any,
    { namespace }: any
  ) => ({
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    furtherClaimVisable: claimCaseController.furtherClaimVisable,
    taskNotEditable: claimEditable.taskNotEditable,
    claimProcessData: lodash.get(res, `${namespace}.claimProcessData`),
    claimEntities: lodash.get(res, `${namespace}.claimEntities`),
    namespace,
    isRegisterMcs: lodash.get(res, `${namespace}.isRegisterMcs`),
    loading: loading.effects[`${namespace}/getRelationTreatmentInfo`],
  })
)(FurtherClaim);
