import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import lodash from 'lodash';
import { SourceSystem } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import AddKliCaseInfo from './AddKliCaseInfo';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import KlipCaseInfo from './KlipCaseInfo';
import Treatment from './Treatment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const PopUpModal = ({ children, loading, setIsShow, isShow, editable }: any) => {
  const dispatch = useDispatch();
  return (
    <Modal
      visible={isShow}
      onCancel={() => setIsShow(false)}
      footer={
        <div className={styles.buttonGroup}>
          <Button className={styles.popUpModalButton} onClick={() => setIsShow(false)}>
            {formatMessageApi({
              Label_COM_Opus: 'cancel',
            })}
          </Button>
          {editable && (
            <Button
              type="primary"
              loading={loading || false}
              onClick={async () => {
                const errors = await dispatch({
                  type: `${NAMESPACE}/validatePopupFields`,
                });
                if (!errors?.length) {
                  await dispatch({
                    type: `${NAMESPACE}/setIntegrationData`,
                  });
                }
              }}
            >
              {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
            </Button>
          )}
        </div>
      }
      width="80%"
      centered
      title={formatMessageApi({ Label_BIZ_Claim: 'KLIPCaseInfo' })}
      destroyOnClose
      maskClosable={false}
      className={styles.popUpModal}
    >
      {children}
    </Modal>
  );
};

const PopUp = () => {
  const {
    listPolicy = [],
    popupData = {},
    treatmentList,
    editable,
  } = useSelector(
    ({ [NAMESPACE]: modelnamepsace, claimEditable }: any) => ({
      listPolicy: modelnamepsace?.listPolicy,
      popupData: modelnamepsace?.popupData,
      treatmentList:
        modelnamepsace.claimEntities?.incidentListMap?.[modelnamepsace?.popupData?.incidentId]
          ?.treatmentList,
      editable: !claimEditable.taskNotEditable,
    }),
    shallowEqual
  );

  const confirmLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/setIntegrationData`]
  );

  const modalLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getLifeJRefundInfo`]
  );

  const { klipCaseInfoList, isShow, incidentId, treatmentListMap, procedureListMap } = popupData;

  const existPolicy = lodash.compact(
    lodash.map(klipCaseInfoList, (item) => formUtils.queryValue(item?.policyId))
  );

  const newKlipCaseInfoList = useMemo(() => {
    return lodash.map(klipCaseInfoList, (infoItem: any) => ({
      ...infoItem,
      sourceSystem: lodash
        .chain(listPolicy)
        .find((policyItem: any) => policyItem.policyNo === formUtils.queryValue(infoItem.policyId))
        .get('sourceSystem')
        .value(),
    }));
  }, [klipCaseInfoList, listPolicy]);

  const dispatch = useDispatch();
  const setIsShow = (val: boolean) => {
    dispatch({
      type: `${NAMESPACE}/updatePopupData`,
      payload: {
        isShow: val,
      },
    });
  };

  const caseInfoList = lodash.reduce(
    newKlipCaseInfoList,
    (arr: any, el: any) => {
      return el.sourceSystem === SourceSystem.Lifej ? [el, ...arr] : [...arr, el];
    },
    []
  );

  return (
    <PopUpModal isShow={isShow} setIsShow={setIsShow} loading={confirmLoading} editable={editable}>
      <Spin spinning={!!modalLoading}>
        <div className={styles.container}>
          {caseInfoList.map((item: any) => (
            <KlipCaseInfo
              item={item}
              key={item.id}
              existPolicy={existPolicy}
              incidentId={incidentId}
              disableDelete={caseInfoList && caseInfoList?.length === 1}
            />
          ))}
          {editable && !klipCaseInfoList?.length ? (
            <AddKliCaseInfo incidentId={incidentId} />
          ) : null}
          {lodash.map(treatmentList, (treatmentId: any) => (
            <Treatment
              treatmentId={treatmentId}
              incidentId={incidentId}
              key={treatmentId}
              treatmentListMap={treatmentListMap}
              procedureListMap={procedureListMap}
            />
          ))}
        </div>
      </Spin>
    </PopUpModal>
  );
};

export default PopUp;
