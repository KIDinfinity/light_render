import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { Close } from 'opus/Components/Modals';
import {
  formatMessageApi,
} from '@/utils/dictFormatMessage';
import { TreatmentType } from 'claim/pages/utils/claim';

import Table from './Table';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const [oldpayableList, setOldpayableList] = useState([]);

  const claimNo =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.claimNo
    ) || '';
  const serialClaimTreatmentId =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.serialClaimTreatmentId) ||
    '';
  const serialClaimFlag =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.serialClaimFlag) || false;
  const serialClaimMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.serialClaimMap?.[serialClaimTreatmentId]
    ) || {};

  const treatmentListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.treatmentListMap
    ) || {};

  const treatmentPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.treatmentPayableListMap
    ) || {};
  const opTreatmentPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.opTreatmentPayableListMap
    ) || {};

  // 处理请求列表需要的参数
  const payableList = useMemo(() => {
    return lodash
      .chain(lodash.values(treatmentListMap) || [])
      .reduce((arr: any, { id: treatmentId, treatmentType }: any) => {
        const getPayableList = (maps: any) => {
          const list = lodash
            .chain(lodash.values(maps) || [])
            .filter({ treatmentId })
            .value();

          return lodash.map(list, (payableItem: any) => ({
            ...lodash.pick(payableItem, [
              'id',
              'policyNo',
              'benefitItemCode',
              'diagnosisCode',
              'hospitalizationSequentialNo',
            ]),
            claimNo,
          }));
        };

        if (treatmentType === TreatmentType.InPatient) {
          return [...arr, ...getPayableList(treatmentPayableListMap)];
        }
        if (treatmentType === TreatmentType.OutPatient) {
          return [...arr, ...getPayableList(opTreatmentPayableListMap)];
        }
        return arr;
      }, [])

      .value();
  }, [treatmentPayableListMap, treatmentListMap, opTreatmentPayableListMap]);

  useEffect(() => {
    if (!lodash.isEmpty(payableList) && !lodash.isEqual(payableList, oldpayableList)) {
      setOldpayableList(payableList);
      dispatch({
        type: `${NAMESPACE}/getSerialClaimMap`,
        payload: { treatmentPayableIdList: payableList },
      });
    }
  }, [payableList, oldpayableList]);

  const onClose = () => {
    dispatch({
      type: `${NAMESPACE}/saveSerialClaimFlag`,
    });
    setTimeout(() => {
      dispatch({
        type: `${NAMESPACE}/saveSerialClaimTreatmentId`,
        payload: {
          id: '',
        },
      });
    }, 800);
  };

  return (
    <Close
      show={serialClaimFlag}
      hiddenIcon
      width="70%"
      height={400}
      title={formatMessageApi({ Label_CLM_Opus: 'serialClaim' })}
      handleCancle={onClose}
      handleClose={onClose}
    >
      <div className={styles.SerialClaim}>
        <Table list={lodash.values(serialClaimMap)} />
      </div>
    </Close>
  );
};
