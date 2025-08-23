import lodash, { has, forEach, isFunction, get } from 'lodash';
import { relationshipWithInsuredForHK, relationshipWithInsuredForJP } from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { saveDefaultPayee } from 'claim/pages/utils/getPayeeDefaultData';
import { setClaimant, resetClaimant, getPrevious, getPolicyOwnerInfo } from './utils';
import { assignByKeys } from 'claim/pages/utils/fnObject';
import { calcAge } from '@/utils/utils';
// import links from 'process/JPCLM/DataCapture/_models/links';

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
      const policyId = get(draftState.claimProcessData.insured, 'policyId', '');
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
      const policyId = get(draftState.claimProcessData.insured, 'policyId', '');
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
        const companyName = draftState.beneficiariesInfo?.[0]?.companyName || '';
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...draftState.beneficiariesInfo[0],
          companyName: draftState.beneficiariesInfo?.[0]?.companyName,
          originCompanyName: companyName,
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

    // PH 的 assessment 也放开来允许用户修改relationship，但此时获取c360的方式与原本不同，而且也没有了data capture在获取c360后顺便做的处理逻辑，需要在这里补上
    const c360PolicyInfo = draftState.claimProcessData?.c360PolicyInfo;

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
    } else {
      if(c360PolicyInfo) {
        if (
          formUtils.queryValue(changedFields.relationshipWithInsured) ===
          relationshipWithInsuredForHK.policyOwner
        ) {
          const policyOwnerList = get(c360PolicyInfo, 'policyOwnerList', []);
          const policyId = get(draftState.claimProcessData.insured, 'policyId', '');
          const policyOwner = policyOwnerList.find((item) => item?.policyId === policyId);
          if (policyOwner) {
            draftState.claimProcessData.claimant = {
              ...c360PolicyInfo.clientInfoList.find((item) => item.clientId === policyOwner.clientId),
              ...changedFields,
            };
            return;
          }
        } else if (
          formUtils.queryValue(changedFields.relationshipWithInsured) ===
            relationshipWithInsuredForHK.beneficiary
        ) {
          const beneficiariesInfo = lodash
            .chain(c360PolicyInfo.policyBeneficiaryList)
            .map((beneficiary: any) => {
              const clientInfo = c360PolicyInfo.clientInfoList?.find(
                (client: any) => client.clientId === beneficiary.clientId
              );
              return {
                ...lodash.pick(beneficiary, 'policyId'),
                ...clientInfo,
              };
            })
            .compact()
            .uniqBy((info) => `${info.policyId}_${info.clientId}`)
            .value();

          if (beneficiariesInfo.length === 1) {
            draftState.claimProcessData.claimant = {
              ...draftState.claimProcessData.claimant,
              ...beneficiariesInfo[0],
            };
            return;
          } else if(beneficiariesInfo.length > 1){
            draftState.beneficiariesInfo = beneficiariesInfo;
            draftState.beneficiaryPopUp = true;
          }
        }
      }
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
      'age',
    ];
    const claimant = draftState.claimProcessData.claimant;
    const insured = draftState.claimProcessData.insured;
    if (has(changedFields, 'relationshipWithInsured')) {
      const relationshipWithInsured = formUtils.queryValue(changedFields.relationshipWithInsured);
      if (relationshipWithInsured === relationshipWithInsuredForJP.Self) {
        draftState.claimProcessData.claimant = {
          ...claimant,
          ...assignByKeys(claimant, insured, keysInsured),
          ...changedFields,
        };
      } else if (relationshipWithInsured === relationshipWithInsuredForJP.PolicyOwner) {
        const policyOwnerList = get(draftState, 'policyOwnerList', []);
        const policyId = get(insured, 'policyId', '');

        const policyOwnerInfo = getPolicyOwnerInfo(formUtils.queryValue(policyId), policyOwnerList);
        draftState.claimProcessData.claimant = {
          ...policyOwnerInfo,
          ...changedFields,
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
        };
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

      // links.relateWithInsure_payeeType({
      //   draftState,
      //   changedFields: changedFieldsPayeeType,
      //   payeeId,
      // });
    }
    const payeeListMapData = get(state, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMapData);
    const keys = lodash.keys(changedFields);
    const payeeItem = draftState.claimEntities.payeeListMap[payeeId];
    const isSameClient =
      formUtils.queryValue(claimant.firstName) === formUtils.queryValue(payeeItem.firstName) &&
      formUtils.queryValue(claimant.surname) === formUtils.queryValue(payeeItem.surname);

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
  dateOfBirth: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'dateOfBirth')) return;
    lodash.set(
      draftState,
      'claimProcessData.claimant.age',
      calcAge(
        changedFields?.dateOfBirth?.value,
        formUtils.queryValue(draftState.claimProcessData?.submissionDate)
      )
    );
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
