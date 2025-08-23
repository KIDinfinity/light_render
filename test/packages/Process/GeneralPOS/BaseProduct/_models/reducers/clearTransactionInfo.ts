/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';

export default (state: any) =>
  produce(state, (draftState: any) => {
    const transactionTypeCodes = Object.values(draftState.entities.transactionTypesMap || {})
      .map((item) => ({
        transactionTypeCode: item?.transactionTypeCode,
        branchReceivedDate: item?.branchReceivedDate,
        requestDate: item?.requestDate,
        hoReceivedDate: item?.hoReceivedDate,
      }))
      .filter((item) => item?.transactionTypeCode);

    const ids = [];
    draftState.entities = {
      transactionTypesMap: {},
    };

    transactionTypeCodes.forEach((item) => {
      const addServicingRequestInfo = {
        id: uuidv4(),
        isManualAdd: true,
        transactionTypeCode: item.transactionTypeCode,
      };
      if (item?.branchReceivedDate) {
        addServicingRequestInfo.branchReceivedDate = item?.branchReceivedDate;
      }
      if (item?.requestDate) {
        addServicingRequestInfo.requestDate = item?.requestDate;
      }
      if (item?.hoReceivedDate) {
        addServicingRequestInfo.hoReceivedDate = item?.hoReceivedDate;
      }
      ids.push(addServicingRequestInfo.id);
      draftState.entities.transactionTypesMap[addServicingRequestInfo.id] = addServicingRequestInfo;
    });

    draftState.processData = {
      submissionDate: draftState.processData.submissionDate,
      submissionChannel: draftState.processData.submissionChannel,
      mainPolicyId: draftState.processData.mainPolicyId,
      transactionTypes: ids,
    };
  });
