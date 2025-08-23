import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../../Utils/normalizrUtils';
import { getDocuments } from '@/services/claimJpclmClaimControllerService';

export default function* getDocumentsByPolicy({ payload }: any, { select, call, put }: any) {
  const { applicationId, policyNoArray } = payload;

  // 証券番号不为空policyNoArray
  if (!lodash.isEmpty(policyNoArray)) {
    const claimProcessData = yield select(
      (state) => state.JPCLMOfClaimRegistrationController.claimProcessData
    );
    const claimEntities = yield select(
      (state) => state.JPCLMOfClaimRegistrationController.claimEntities
    );
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const claimDataValue = formUtils.cleanValidateData(denormalizedData);
    const { policyList } = claimDataValue;
    const policyPullAt = lodash.filter(policyList, (policy) => {
      return lodash.indexOf(policyNoArray, policy.policyNo) !== -1;
    });
    // 根据选择的policyNoArray过滤policyList，只传选中的policy。获取对应的默认document
    const getDocumentsVo = {
      agentRequest: lodash.get(claimDataValue, 'agentRequest'),
      medicalCertificateGuideline: lodash.get(claimDataValue, 'medicalCertificateGuideline'),
      incidentList: lodash.get(claimDataValue, 'incidentList'),
      policyList: policyPullAt,
    };

    const response = yield call(getDocuments, getDocumentsVo);
    if (response.success && response.resultData) {
      const documentTypeArray = response.resultData;
      if (!lodash.isEmpty(documentTypeArray)) {
        const fields = {};

        const documentArray =
          claimEntities.applicationListMap[applicationId].documentTypeArray || [];
        fields.pendingToRole = documentTypeArray[0].pendingToRole;
        fields.pendingToRoles = documentTypeArray[0].pendingToRoles;

        let temp: any = [];

        lodash.forEach(documentTypeArray, (document) => {
          temp = [...temp, ...document.documentList];
        });
        temp = lodash.uniq(temp);

        if (lodash.get(policyList, 'length') > lodash.get(policyPullAt, 'length')) {
          fields.documentTypeArray = temp;
        } else {
          fields.documentTypeArray = lodash.uniq([...temp, ...documentArray]);
        }

        yield put({
          type: 'saveApplicationItem',
          payload: {
            changedFields: fields,
            applicationId,
          },
        });
      }
    }
  }
}
