import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';
import ESubmissionChannel from 'basic/enum/SubmissionChannel';
import { wholeEntities } from '../dto/EntriesModel';
import { createNormalizeData } from '../../utils/normalizrUtils';
import treatmentAdd from './treatmentAdd';
import incidentAdd from './incidentAdd';

const incidentHandle = (draftState: any) => {
  if (lodash.isEmpty(draftState.claimProcessData.incidentList)) {
    const incidentState = incidentAdd(draftState);

    const incidentId = lodash.get(incidentState, 'claimProcessData.incidentList.0');
    const treatmentId = uuidv4();
    const treatmentNo = 1;
    const { claimNo } = draftState.claimProcessData;
    const addTreatment = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      treatmentNo,
    };

    const treatmentState = treatmentAdd(incidentState, {
      payload: { incidentId, treatmentAdd: addTreatment },
    });
    const { claimEntities, claimProcessData }: any = lodash.pick(treatmentState, [
      'claimEntities',
      'claimProcessData',
    ]);
    draftState.claimEntities = claimEntities;
    draftState.claimProcessData = claimProcessData;
  }

  // 设置第一条incident展开
  draftState.incidentItemExpandStatus = {
    [`id_${draftState.claimProcessData.incidentList[0]}`]: true,
  };
  return {
    ...draftState,
  };
};

export default (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (lodash.isEmpty(claimData.incidentList)) {
    claimData.incidentList = [];
  }
  if (lodash.isEmpty(claimData.payeeList)) {
    claimData.payeeList = [];
  }
  if (!claimData.insured) {
    claimData.insured = {};
  }
  if (!claimData.claimant) {
    claimData.claimant = {};
  }

  // VENUSHK-1830
  const tempSubmissionChannel = claimData.submissionChannel || action.taskDetail.submissionChannel;
  if (
    [ESubmissionChannel.PAPERSUBMISSION, ESubmissionChannel.ManualCreate].includes(
      tempSubmissionChannel
    )
  ) {
    delete claimData.submissionChannel;
  } else {
    claimData.submissionChannel = tempSubmissionChannel;
  }
  // VENUSHK-1830

  lodash.set(claimData, 'checkNumberRefresh', true);

  lodash.set(
    claimData,
    'payeeList',
    lodash
      .chain(claimData.payeeList)
      .compact()
      .filter((item: any) => !!item.id)
      .value()
  );

  const result = createNormalizeData(claimData, wholeEntities);

  return incidentHandle({
    ...state,
    ...result,
  });
};
