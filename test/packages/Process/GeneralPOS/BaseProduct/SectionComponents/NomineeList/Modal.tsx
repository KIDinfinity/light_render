import { Region, tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import CustomerIdentificationModal from 'process/GeneralPOS/BaseProduct/SectionComponents/CustomerIdentification/CustomerIdentificationModal';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { convertIdentificationList } from './utils';

const Modal = ({ transactionId }: any) => {
  const dispatch = useDispatch();

  const commonNomineeModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.commonNomineeModal
  );
  const needDuplicateCheckList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.needDuplicateCheckList;
  });
  const clientInfoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList;
  }, shallowEqual);
  const identificationList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.identificationList;
  }, shallowEqual);

  const showClientList = commonNomineeModal?.showClientList;

  const handleSelectedHandle = (clientSeq, e) => {
    const data = tenant.region({
      [Region.TH]: {
        operationResult: e ? 'select' : 'create',
        selectClientId: e,
      },
      [Region.MY]: {
        operationResult: e ? 'select' : 'create',
        selectCcrClientId: e,
      },
    });

    dispatch({
      type: `${NAMESPACE}/saveCommonNomineeModal`,
      payload: {
        showClientList: showClientList.map((item) =>
          item.clientSeq === clientSeq ? { ...item, ...data } : item
        ),
        selectedId: e,
        transactionId,
        clientSeq,
      },
    });
  };

  const identificationDataList = lodash.map(showClientList, (suspectClientItem) => {
    const clientInfo = clientInfoList?.find(
      (clientItem) => clientItem.clientSeq === suspectClientItem?.clientSeq
    );
    const { firstName, middleName, surname, roleList } = formUtils.objectQueryValue(
      clientInfo || {}
    );
    const roles = lodash.map(roleList, (roleItem: any) => roleItem.customerRole);
    const customerInfo = { firstName, middleName, surname, roleList: roles };
    const identificationListData = convertIdentificationList(
      identificationList,
      clientInfo,
      suspectClientItem?.identificationResult
    );
    const selectedId = tenant.region({
      [Region.TH]: suspectClientItem?.selectClientId,
      [Region.MY]: suspectClientItem?.selectCcrClientId,
    });
    return {
      clientSeq: suspectClientItem?.clientSeq,
      customerInfo,
      identificationList: identificationListData,
      identifyResultTagShow:
        suspectClientItem?.identificationResult !== IdentificationClientTagEnum.SuspectClient,
      identifyResultTag: suspectClientItem?.identificationResult || undefined,
      selectedId,
      handleSelected: handleSelectedHandle.bind(null, suspectClientItem?.clientSeq),
    };
  });

  const modalConfirmHandle = async () => {
    await dispatch({
      type: `${NAMESPACE}/updateIdentificationResultItem`,
      payload: {
        transactionId,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/saveNeedDuplicateCheckList`,
      payload: {
        transactionId,
        needDuplicateCheckList: lodash.filter(
          needDuplicateCheckList,
          (item) => !showClientList.find((clientItem) => clientItem.clientSeq === item)
        ),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/saveCommonNomineeModal`,
      payload: {
        visible: false,
        suspectClientList: [],
        showClientList: [],
        submit: false,
      },
    });
    if (commonNomineeModal?.submit) {
      bpm.buttonAction('submit');
    }
  };

  const closeHandle = () => {
    dispatch({
      type: `${NAMESPACE}/saveCommonNomineeModal`,
      payload: {
        visible: false,
        suspectClientList: [],
        showClientList: [],
        submit: false,
        revertRole: true,
        transactionId,
      },
    });
  };

  return (
    <CustomerIdentificationModal
      onCancel={closeHandle}
      onConfirm={modalConfirmHandle}
      setShow={() => {}}
      visible={commonNomineeModal?.visible}
      identificationDataList={identificationDataList}
    />
  );
};

export default Modal;
