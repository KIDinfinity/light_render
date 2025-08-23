import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { isPartialBill, isIHB, isIDAC } from 'claim/pages/Thailand/flowConfig';
import CaseCategory from 'enum/CaseCategory';
import { CaseSource, SubmissionChannel } from 'claim/enum';

const sourceMap = {
  [CaseCategory.TH_GC_CTG01]: CaseSource.Reimbursement,
  [CaseCategory.TH_MC_CTG01]: null,
  default: CaseSource.CaseSource,
};
const channelMap = {
  [CaseCategory.TH_IHB_CTG01]: SubmissionChannel.Physical,
  [CaseCategory.TH_MC_CTG01]: null,
  [CaseCategory.TH_GC_CTG01]: null,
  default: SubmissionChannel.Digital,
};
const mapValue = (caseCategory: any, map: any) => {
  const temp = formUtils.queryValue(caseCategory);
  return lodash.has(map, temp) ? map?.[temp] : map.default;
};

const saveCaseInfo = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const temp = draftState;
    temp.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
    const { claimProcessData, claimEntities } = draftState;
    const { incidentList, caseCategory } = claimProcessData;
    temp.errorCount = 0;
    if (
      (!isPartialBill(formUtils.queryValue(caseCategory)) ||
        !isIDAC(formUtils.queryValue(caseCategory))) &&
      lodash.size(changedFields) === 1
    ) {
      const { treatmentListMap } = claimEntities;
      const treatmentItem = lodash.find(
        treatmentListMap,
        (item) => item.incidentId === incidentList[0]
      );
      temp.claimEntities.treatmentListMap[treatmentItem.id].dateOfAdmission = null;
    }

    if (!isIHB(formUtils.queryValue(caseCategory))) {
      draftState.claimProcessData.hospitalBillCoverPage = {
        coverPageNo: null,
        medicalProvider: null,
        coverPageDate: null,
        scanDate: null,
        totalCase: null,
        totalAmount: null,
        receivedDate: null,
      };
    }

    if (lodash.has(changedFields, 'caseCategory') && lodash.size(changedFields) === 1) {
      temp.claimProcessData.caseSource = mapValue(caseCategory, sourceMap);
      temp.claimProcessData.submissionChannel = mapValue(caseCategory, channelMap);
    }

    if (lodash.has(changedFields, 'caseCategory') && lodash.size(changedFields) === 1) {
      temp.claimProcessData.caseSource = mapValue(caseCategory, sourceMap);
      temp.claimProcessData.submissionChannel = mapValue(caseCategory, channelMap);
    }
  });

  return { ...nextState };
};

export default saveCaseInfo;
