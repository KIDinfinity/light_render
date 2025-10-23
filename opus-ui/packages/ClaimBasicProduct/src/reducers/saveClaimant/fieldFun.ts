import lodash, { has, forEach, isFunction, get, findIndex, set, isString, pick } from 'lodash';
import { relationshipWithInsuredForHK, relationshipWithInsuredForJP } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { saveDefaultPayee } from 'claim/pages/utils/getPayeeDefaultData';
import { setClaimant, resetClaimant, getPrevious, getPolicyOwnerInfo } from './utils';
import { assignByKeys } from 'claim/pages/utils/fnObject';
import { calcAge } from '@/utils/utils';
import links from 'opus/Pages/Process/Claim/DataCapture/_models/links';
import { SourceSystem } from 'process/Enum';

const getBeneficiariesInfo = ({ policyBeneficiaryList = [], clientInfoList = [] }: any) => {
  return (
    lodash
      .chain(policyBeneficiaryList)
      .map((beneficiary: any) => {
        return {
          ...lodash.pick(beneficiary, 'policyId'),
          ...lodash.pick(beneficiary, 'beneficiaryType'),
          ...clientInfoList.find((client: any) => client.clientId === beneficiary.clientId),
        };
      })
      .compact()
      .uniqBy((info) => `${info.policyId}_${info.clientId}`)
      .value() || []
  );
};

const fieldFun = {
  relationshipWithInsured: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'relationshipWithInsured')) return;
    const preRelationshipWithInsured = getPrevious(
      state,
      'claimProcessData.claimant.relationshipWithInsured'
    );
    if (changedFields.relationshipWithInsured.value === 'SLF') {
      const keysInsured = [
        'firstName',
        'surname',
        'identityType',
        'identityNo',
        'phoneNo',
        'gender',
        'nationality',
        'dateOfBirth',
        'occupation',
        'email',
        'address',
      ];
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...assignByKeys(
          draftState.claimProcessData.claimant,
          draftState.claimProcessData.insured,
          keysInsured
        ),
      };
    } else if (
      changedFields.relationshipWithInsured.value !== 'SLF' &&
      preRelationshipWithInsured === 'SLF'
    ) {
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        firstName: null,
        surname: null,
        gender: null,
        identityType: null,
        identityNo: null,
        nationality: null,
        dateOfBirth: null,
        occupation: null,
        phoneNo: null,
        email: null,
        address: null,
      };
    }
  },
  claimant: ({ draftState, changedFields }: any) => {
    if (has(changedFields, 'claimant')) {
      if (changedFields.claimant.value === '02') {
        setClaimant(draftState);
      } else {
        resetClaimant(draftState);
      }
    }
  },
  relationshipWithInsuredForHK: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'relationshipWithInsured')) return;

    if (changedFields.relationshipWithInsured.value === relationshipWithInsuredForHK.self) {
      const keysInsured = [
        'nationality',
        'dateOfBirth',
        'occupation',
        'clientId',
        'dateOfBirth',
        'firstName',
        'surname',
        'middleName',
        'gender',
        'identityNo',
        'identityType',
        'contactType',
        'phoneNo',
        'email',
        'address',
        'sms',
        'postCode',
      ];
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...assignByKeys(
          draftState.claimProcessData.claimant,
          draftState.claimProcessData.insured,
          keysInsured
        ),
      };
    } else if (
      formUtils.queryValue(changedFields.relationshipWithInsured) ===
      relationshipWithInsuredForHK.policyOwner
    ) {
      const policyOwnerList = get(draftState, 'policyOwnerList', []);
      const policyId = formUtils.queryValue(
        get(draftState.claimProcessData.insured, 'policyId', '')
      );
      const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
      draftState.claimProcessData.claimant = {
        ...policyOwnerInfo,
        ...changedFields,
      };
    } else {
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        firstName: null,
        surname: null,
        gender: null,
        identityType: null,
        identityNo: null,
        nationality: null,
        dateOfBirth: null,
        occupation: null,
        phoneNo: null,
        email: null,
        address: null,
      };
    }
  },
  relationshipWithInsuredForPH: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'relationshipWithInsured')) return;

    if (changedFields.relationshipWithInsured.value === relationshipWithInsuredForHK.self) {
      const keysInsured = [
        'nationality',
        'dateOfBirth',
        'occupation',
        'clientId',
        'dateOfBirth',
        'firstName',
        'surname',
        'middleName',
        'gender',
        'identityNo',
        'identityType',
        'contactType',
        'phoneNo',
        'email',
        'address',
        'sms',
        'postCode',
      ];
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...assignByKeys(
          draftState.claimProcessData.claimant,
          draftState.claimProcessData.insured,
          keysInsured
        ),
      };
    } else if (
      formUtils.queryValue(changedFields.relationshipWithInsured) ===
      relationshipWithInsuredForHK.policyOwner
    ) {
      const policyOwnerList = get(draftState, 'policyOwnerList', []);
      const policyId = formUtils.queryValue(
        get(draftState.claimProcessData.insured, 'policyId', '')
      );
      const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
      draftState.claimProcessData.claimant = {
        ...policyOwnerInfo,
        ...changedFields,
      };
    } else if (
      formUtils.queryValue(changedFields.relationshipWithInsured) ===
        relationshipWithInsuredForHK.beneficiary &&
      draftState.beneficiariesInfo?.length
    ) {
      if (draftState.beneficiariesInfo.length === 1) {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...draftState.beneficiariesInfo[0],
        };
      } else {
        draftState.beneficiaryPopUp = true;
      }
    } else {
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        firstName: null,
        surname: null,
        gender: null,
        identityType: null,
        identityNo: null,
        nationality: null,
        dateOfBirth: null,
        occupation: null,
        phoneNo: null,
        email: null,
        address: null,
      };
    }
  },
  relationshipWithInsuredForPHAssessment: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'relationshipWithInsured')) return;

    const c360PolicyInfo = draftState.claimProcessData?.c360PolicyInfo || {};

    const beneficiariesInfo: any = getBeneficiariesInfo(c360PolicyInfo) || [];

    if (changedFields.relationshipWithInsured.value === relationshipWithInsuredForHK.self) {
      const keysInsured = [
        'nationality',
        'dateOfBirth',
        'occupation',
        'clientId',
        'dateOfBirth',
        'firstName',
        'surname',
        'middleName',
        'gender',
        'identityNo',
        'identityType',
        'contactType',
        'phoneNo',
        'email',
        'address',
        'sms',
        'postCode',
      ];
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...assignByKeys(
          draftState.claimProcessData.claimant,
          draftState.claimProcessData.insured,
          keysInsured
        ),
      };
    } else if (
      formUtils.queryValue(changedFields.relationshipWithInsured) ===
      relationshipWithInsuredForHK.policyOwner
    ) {
      const policyOwnerList = get(c360PolicyInfo, 'policyOwnerList', []);
      const policyId = formUtils.queryValue(
        get(draftState.claimProcessData.insured, 'policyId', '')
      );
      const policyOwner = policyOwnerList.find((item) => item?.policyId === policyId);
      if (policyOwner) {
        draftState.claimProcessData.claimant = {
          ...c360PolicyInfo.clientInfoList.find((item) => item.clientId === policyOwner.clientId),
          ...changedFields,
        };
      }
    } else if (
      formUtils.queryValue(changedFields.relationshipWithInsured) ===
        relationshipWithInsuredForHK.beneficiary &&
      beneficiariesInfo?.length
    ) {
      if (beneficiariesInfo.length === 1) {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...beneficiariesInfo[0],
        };
      } else {
        draftState.beneficiariesInfo = beneficiariesInfo;
        draftState.beneficiaryPopUp = true;
      }
    } else {
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        firstName: null,
        surname: null,
        gender: null,
        identityType: null,
        identityNo: null,
        nationality: null,
        dateOfBirth: null,
        occupation: null,
        phoneNo: null,
        email: null,
        address: null,
      };
    }
  },
  relationshipWithInsuredForJP: ({ state, draftState, changedFields }: any) => {
    const keysInsured = [
      'clientId',
      'dateOfBirth',
      'firstName',
      'surname',
      'middleName',
      'gender',
      'identityNo',
      'identityType',
      'contactType',
      'phoneNo',
      'email',
      'address',
      'sms',
      'postCode',
    ];
    const claimant = draftState.claimProcessData.claimant;
    const insured = draftState.claimProcessData.insured;
    if (has(changedFields, 'relationshipWithInsured') && lodash.size(changedFields) === 1) {
      const relationshipWithInsured = formUtils.queryValue(changedFields.relationshipWithInsured);
      const policyId = formUtils.queryValue(get(insured, 'policyId', ''));
      const policySource = get(insured, 'policySource', '');

      if (relationshipWithInsured === relationshipWithInsuredForJP.Self) {
        draftState.claimProcessData.claimant = {
          ...claimant,
          ...assignByKeys(claimant, insured, keysInsured),
          ...changedFields,
        };
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.PolicyOwner) {
        const policyOwnerList = get(draftState, 'policyOwnerList', []);

        const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
        draftState.claimProcessData.claimant = {
          ...policyOwnerInfo,
          ...changedFields,
        };
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.AgentClaimant) {
        const beneficiaries: any =
          getBeneficiariesInfo(draftState.claimProcessData?.c360PolicyInfo) || [];
        const beneficiaryCodes = ['4'];
        const beneficiary = lodash.find(
          beneficiaries,
          (item) => item.policyId === policyId && beneficiaryCodes.includes(item.beneficiaryType)
        );

        if (!lodash.isEmpty(beneficiary)) {
          const {
            firstName,
            surname,
            gender,
            beneficiaryGender,
            dateOfBirth,
            beneficiaryDateOfBirth,
            phoneNo,
            email,
            address,
            beneficiaryAddressLine1,
            beneficiaryAddressLine2,
            beneficiaryAddressLine3,
            beneficiaryAddressLine4,
            beneficiaryAddressLine5,
            postCode,
            beneficiaryPostCode,
          } = beneficiary;

          draftState.claimProcessData.claimant = {
            ...changedFields,
            firstName,
            surname,
            gender: beneficiaryGender || gender,
            dateOfBirth: beneficiaryDateOfBirth || dateOfBirth,
            phoneNo,
            email,
            address:
              address ||
              [
                beneficiaryAddressLine1,
                beneficiaryAddressLine2,
                beneficiaryAddressLine3,
                beneficiaryAddressLine4,
                beneficiaryAddressLine5,
              ]
                .filter((item) => !!item)
                .join(' ')
                .trim(),
            postCode: beneficiaryPostCode || postCode,
          };
        } else {
          draftState.claimProcessData.claimant = {
            ...claimant,
            ...changedFields,
            firstName: null,
            surname: null,
            gender: null,
            dateOfBirth: null,
            phoneNo: null,
            email: null,
            address: null,
            postCode: null,
            sms: null,
          };
        }
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.Beneficiary) {
        const beneficiaries: any =
          getBeneficiariesInfo(draftState.claimProcessData?.c360PolicyInfo) || [];
        const beneficiaryCodes = ['2'];
        const beneficiary = lodash.find(
          beneficiaries,
          (item) => item.policyId === policyId && beneficiaryCodes.includes(item.beneficiaryType)
        );

        if (!lodash.isEmpty(beneficiary)) {
          const {
            firstName,
            surname,
            gender,
            beneficiaryGender,
            dateOfBirth,
            beneficiaryDateOfBirth,
            phoneNo,
            email,
            address,
            beneficiaryAddressLine1,
            beneficiaryAddressLine2,
            beneficiaryAddressLine3,
            beneficiaryAddressLine4,
            beneficiaryAddressLine5,
            postCode,
            beneficiaryPostCode,
          } = beneficiary;

          draftState.claimProcessData.claimant = {
            ...changedFields,
            firstName,
            surname,
            gender: beneficiaryGender || gender,
            dateOfBirth: beneficiaryDateOfBirth || dateOfBirth,
            phoneNo,
            email,
            address:
              address ||
              [
                beneficiaryAddressLine1,
                beneficiaryAddressLine2,
                beneficiaryAddressLine3,
                beneficiaryAddressLine4,
                beneficiaryAddressLine5,
              ]
                .filter((item) => !!item)
                .join(' ')
                .trim(),
            postCode: beneficiaryPostCode || postCode,
          };
        } else {
          draftState.claimProcessData.claimant = {
            ...claimant,
            ...changedFields,
            firstName: null,
            surname: null,
            gender: null,
            dateOfBirth: null,
            phoneNo: null,
            email: null,
            address: null,
            postCode: null,
            sms: null,
          };
        }
      } else {
        draftState.claimProcessData.claimant = {
          ...claimant,
          ...changedFields,
          firstName: null,
          surname: null,
          gender: null,
          dateOfBirth: null,
          phoneNo: null,
          email: null,
          address: null,
          postCode: null,
          sms: null,
        };
      }

      // 添加age计算
      draftState.claimProcessData.claimant.age = calcAge(
        formUtils.queryValue(draftState.claimProcessData.claimant?.dateOfBirth),
        formUtils.queryValue(draftState.claimProcessData?.submissionDate)
      );

      const claimantId = draftState.claimProcessData.claimant.clientId;
      const clientInfo = draftState.clientInfoList?.find(({ clientId }) => clientId === claimantId);

      if (clientInfo && claimantId) {
        draftState.claimProcessData.claimant.customerRole = clientInfo.customerRole;
      } else {
        draftState.claimProcessData.claimant.customerRole = '';
      }

      const payeeTypeContain = [
        relationshipWithInsuredForJP.Self,
        relationshipWithInsuredForJP.PolicyOwner,
        relationshipWithInsuredForJP.Beneficiary,
        relationshipWithInsuredForJP.Others,
      ];
      const changedFieldsPayeeType = { payeeType: null };
      if (payeeTypeContain.includes(relationshipWithInsured))
        changedFieldsPayeeType.payeeType = relationshipWithInsured;

      const payeeListMap = get(draftState, 'claimEntities.payeeListMap');
      const payeeId = getDefaultPayeeId(payeeListMap);

      links.relateWithInsure_payeeType({
        draftState,
        changedFields: changedFieldsPayeeType,
        payeeId,
      });
    } else if (has(changedFields, 'sms') && lodash.size(changedFields) === 1) {
      const target = (() => {
        const relationshipWithInsured = formUtils.queryValue(
          draftState?.claimProcessData?.claimant?.relationshipWithInsured
        );
        switch (relationshipWithInsured) {
          case relationshipWithInsuredForJP.Self:
            return {
              list: {
                ...get(draftState, 'claimProcessData.insured'),
                sms: changedFields.sms.value,
              },
              path: 'claimProcessData.insured',
            };
          case relationshipWithInsuredForJP.PolicyOwner: {
            const policyId = get(insured, 'policyId', '');
            const policyOwnerList = get(draftState, 'policyOwnerList', []);
            const index = findIndex(policyOwnerList, (item) => item.policyId === policyId);
            const path = index !== -1 ? `policyOwnerList[${index}]` : `policyOwnerList[0]`;
            const ownerClientInfo = getPolicyOwnerInfo(policyId, policyOwnerList) || {};
            return {
              list: {
                ...get(draftState, path),
                policyId,
                ownerClientInfo: { ...ownerClientInfo, sms: changedFields.sms.value },
              },
              path,
            };
          }
          default:
            return null;
        }
      })();
      const { path, list } = pick(target, ['path', 'list']);
      if (isString(path)) {
        set(draftState, path, list);
      }
    } else if (has(changedFields, 'dateOfBirth') && lodash.size(changedFields) === 1) {
      draftState.claimProcessData.claimant = {
        ...claimant,
        ...changedFields,
        age: calcAge(
          formUtils.queryValue(changedFields.dateOfBirth),
          formUtils.queryValue(draftState.claimProcessData?.submissionDate)
        ),
        dobUpdateFlag: 'Y',
      };
    }

    const payeeListMapData = get(state, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMapData);
    const keys = lodash.keys(changedFields);
    const payeeItem = draftState.claimEntities.payeeListMap[payeeId];
    const isSameClient =
      formUtils.queryValue(claimant.firstName) === formUtils.queryValue(payeeItem?.firstName) &&
      formUtils.queryValue(claimant.surname) === formUtils.queryValue(payeeItem?.surname);

    if (isSameClient && !!payeeId && keys.length === 1 && keysInsured.includes(keys[0])) {
      const payeeTemp: any = saveDefaultPayee(
        {
          ...payeeItem,
          ...lodash.pick(claimant, keysInsured),
        },
        changedFields
      );

      payeeTemp.telNo = payeeTemp.phoneNo;

      draftState.claimEntities.payeeListMap[payeeId] = saveDefaultPayee(payeeTemp, changedFields);
    }
  },
  relationshipWithInsuredForJPNonSupport: ({ state, draftState, changedFields }: any) => {
    const keysInsured = [
      'clientId',
      'dateOfBirth',
      'firstName',
      'surname',
      'middleName',
      'gender',
      'identityNo',
      'identityType',
      'contactType',
      'phoneNo',
      'email',
      'address',
      'sms',
      'postCode',
    ];
    const claimant = draftState.businessData.claimant;
    const insured = draftState.businessData.insured;
    if (has(changedFields, 'relationshipWithInsured')) {
      const relationshipWithInsured = formUtils.queryValue(changedFields.relationshipWithInsured);
      const policyId = formUtils.queryValue(get(insured, 'policyId', ''));
      const policySource = get(insured, 'policySource', '');

      if (relationshipWithInsured === relationshipWithInsuredForJP.Self) {
        draftState.businessData.claimant = {
          ...claimant,
          ...assignByKeys(claimant, insured, keysInsured),
          ...changedFields,
        };
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.PolicyOwner) {
        const policyOwnerList = get(draftState, 'policyOwnerList', []);

        const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
        draftState.businessData.claimant = {
          ...policyOwnerInfo,
          ...changedFields,
        };
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.AgentClaimant) {
        const beneficiaries: any =
          getBeneficiariesInfo(draftState.businessData.c360PolicyInfo) || [];
        const beneficiaryCodes = ['4'];
        const beneficiary = lodash.find(
          beneficiaries,
          (item) => item.policyId === policyId && beneficiaryCodes.includes(item.beneficiaryType)
        );

        if (!lodash.isEmpty(beneficiary)) {
          const {
            firstName,
            surname,
            gender,
            beneficiaryGender,
            dateOfBirth,
            beneficiaryDateOfBirth,
            phoneNo,
            email,
            address,
            beneficiaryAddressLine1,
            beneficiaryAddressLine2,
            beneficiaryAddressLine3,
            beneficiaryAddressLine4,
            beneficiaryAddressLine5,
            postCode,
            beneficiaryPostCode,
          } = beneficiary;

          draftState.businessData.claimant = {
            ...changedFields,
            firstName,
            surname,
            gender: beneficiaryGender || gender,
            dateOfBirth: beneficiaryDateOfBirth || dateOfBirth,
            phoneNo,
            email,
            address:
              address ||
              [
                beneficiaryAddressLine1,
                beneficiaryAddressLine2,
                beneficiaryAddressLine3,
                beneficiaryAddressLine4,
                beneficiaryAddressLine5,
              ]
                .filter((item) => !!item)
                .join(' ')
                .trim(),
            postCode: beneficiaryPostCode || postCode,
          };
        } else {
          draftState.businessData.claimant = {
            ...claimant,
            ...changedFields,
            firstName: null,
            surname: null,
            gender: null,
            dateOfBirth: null,
            phoneNo: null,
            email: null,
            address: null,
            postCode: null,
          };
        }
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.Beneficiary) {
        const beneficiaries: any =
          getBeneficiariesInfo(draftState.businessData.c360PolicyInfo) || [];
        const beneficiaryCodes = ['2'];
        const beneficiary = lodash.find(
          beneficiaries,
          (item) => item.policyId === policyId && beneficiaryCodes.includes(item.beneficiaryType)
        );

        if (!lodash.isEmpty(beneficiary)) {
          const {
            firstName,
            surname,
            gender,
            beneficiaryGender,
            dateOfBirth,
            beneficiaryDateOfBirth,
            phoneNo,
            email,
            address,
            beneficiaryAddressLine1,
            beneficiaryAddressLine2,
            beneficiaryAddressLine3,
            beneficiaryAddressLine4,
            beneficiaryAddressLine5,
            postCode,
            beneficiaryPostCode,
          } = beneficiary;

          draftState.businessData.claimant = {
            ...changedFields,
            firstName,
            surname,
            gender: beneficiaryGender || gender,
            dateOfBirth: beneficiaryDateOfBirth || dateOfBirth,
            phoneNo,
            email,
            address:
              address ||
              [
                beneficiaryAddressLine1,
                beneficiaryAddressLine2,
                beneficiaryAddressLine3,
                beneficiaryAddressLine4,
                beneficiaryAddressLine5,
              ]
                .filter((item) => !!item)
                .join(' ')
                .trim(),
            postCode: beneficiaryPostCode || postCode,
          };
        } else {
          draftState.businessData.claimant = {
            ...claimant,
            ...changedFields,
            firstName: null,
            surname: null,
            gender: null,
            dateOfBirth: null,
            phoneNo: null,
            email: null,
            address: null,
            postCode: null,
          };
        }
      } else {
        draftState.businessData.claimant = {
          ...claimant,
          ...changedFields,
          firstName: null,
          surname: null,
          gender: null,
          dateOfBirth: null,
          phoneNo: null,
          email: null,
          address: null,
          postCode: null,
        };
      }
      const claimantId = draftState.businessData.claimant.clientId;
      const clientInfo = draftState.clientInfoList?.find(({ clientId }) => clientId === claimantId);

      draftState.businessData.claimant = {
        ...draftState.businessData.claimant,
        customerRole: clientInfo && claimantId ? clientInfo.customerRole : '',
        age: calcAge(
          formUtils.queryValue(draftState.businessData.claimant?.dateOfBirth),
          formUtils.queryValue(draftState.businessData?.submissionDate)
        ),
      };
    } else if (has(changedFields, 'dateOfBirth') && lodash.size(changedFields) === 1) {
      draftState.businessData.claimant.age = calcAge(
        formUtils.queryValue(changedFields.dateOfBirth),
        formUtils.queryValue(draftState.businessData?.submissionDate)
      );
      draftState.businessData.claimant.dobUpdateFlag = 'Y';
    }
  },
};

export default ({ state, draftState, changedFields, config }: any) => {
  const params = { state, draftState, changedFields };

  forEach(config, (item, key) => {
    switch (true) {
      case isFunction(item):
        item(params);
        break;
      case isFunction(fieldFun[key]):
        fieldFun[key](params);
        break;
      default:
        break;
    }
  });
};
