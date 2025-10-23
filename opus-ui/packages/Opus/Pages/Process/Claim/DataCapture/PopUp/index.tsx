import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal, Button } from 'antd';
import lodash from 'lodash';
import { SourceSystem } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import AddKliCaseInfo from './AddKliCaseInfo';
import { NAMESPACE } from '../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import KlipCaseInfo from './KlipCaseInfo';
import Treatment from './Treatment';
import styles from './index.less';

const PopUpModal = ({ children, setSwitchOn, switchOn, incidentId, editable, loading }: any) => {
  const dispatch = useDispatch();
  return (
    <Modal
      visible={switchOn}
      onCancel={() => setSwitchOn(false)}
      footer={
        <div className={styles.popUpModalFooter}>
          <Button className={styles.popUpModalButton} onClick={() => setSwitchOn(false)}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>
          {editable && (
            <Button
              type="primary"
              loading={loading}
              onClick={async () => {
                const errors = await dispatch({
                  type: `${NAMESPACE}/submitIntegration`,
                  payload: {
                    incidentId,
                  },
                });
                if (lodash.size(errors) > 0) {
                  return;
                }

                setSwitchOn(false);
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
      maskClosable={false}
      destroyOnClose
      className={styles.popUpModal}
    >
      {children}
    </Modal>
  );
};

const PopUp = ({ incidentId, setSwitchOn, switchOn }: any) => {
  const policyList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.policyList) || [];

  const klipCaseInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.integration?.[incidentId]?.klipCaseInfoList
    ) || [];
  const treatmentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId].treatmentList
  );
  const confirmLoading =
    useSelector(({ loading }: any) => loading.effects[`${NAMESPACE}/submitIntegration`]) || false;
  const existPolicy = lodash.compact(
    lodash.map(klipCaseInfoList, (item) => formUtils.queryValue(item?.policyId))
  );

  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const newKlipCaseInfoList = useMemo(() => {
    return lodash.map(klipCaseInfoList, (infoItem: any, index) => ({
      ...infoItem,
      sourceSystem:
        lodash
          .chain(policyList)
          .find(
            (policyItem: any) => policyItem.policyId === formUtils.queryValue(infoItem.policyId)
          )
          .get('sourceSystem')
          .value() ||
        infoItem?.sourceSystem ||
        '',
    }));
  }, [klipCaseInfoList, policyList]);

  const caseInfoList = lodash.reduce(
    newKlipCaseInfoList,
    (arr: any, el: any) => {
      return el.sourceSystem === SourceSystem.Lifej ? [el, ...arr] : [...arr, el];
    },
    []
  );

  return (
    <PopUpModal
      switchOn={switchOn}
      setSwitchOn={setSwitchOn}
      incidentId={incidentId}
      editable={editable}
      loading={confirmLoading}
    >
      <div className={styles.container}>
        {caseInfoList.map((item: any) => (
          <KlipCaseInfo
            item={item}
            key={item.id}
            id={item.id}
            existPolicy={existPolicy}
            incidentId={incidentId}
            disableDelete={caseInfoList && caseInfoList?.length === 1}
          />
        ))}
        {editable && !klipCaseInfoList?.length ? <AddKliCaseInfo incidentId={incidentId} /> : null}
        {lodash.map(treatmentList, (treatmentId: any) => (
          <Treatment treatmentId={treatmentId} incidentId={incidentId} key={treatmentId} />
        ))}
      </div>
    </PopUpModal>
  );
};

export default PopUp;
