import lodash from 'lodash';
import ESubmissionChannel from 'basic/enum/SubmissionChannel';
import { createNormalizeData } from '../../utils/normalizrUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { calcAge } from '@/utils/utils';

const saveClaimProcessData = (state: any, action: any) => {
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
  lodash.set(
    claimData,
    'payeeList',
    lodash
      .chain(claimData.payeeList)
      .compact()
      .filter((item: any) => !!item.id)
      .value()
  );

  lodash.set(
    claimData,
    'insured.age',
    calcAge(claimData?.insured?.dateOfBirth, claimData?.submissionDate)
  );
  lodash.set(claimData, 'checkNumberRefresh', true);
  lodash.set(claimData, 'promptMessages', '');
  const result = createNormalizeData(claimData, wholeEntities);

  return {
    ...state,
    ...result,
  };
};

export default saveClaimProcessData;
