import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { formUtils } from 'basic/components/Form';

export class FieldHandler {
  getKlipClaimNo = (claimRelationshipKlipClaimNoList: any[], params: any) => {
    if (!lodash.isArray(claimRelationshipKlipClaimNoList) || !lodash.isPlainObject(params)) return;
    const { incidentId, policyId } = formUtils.cleanValidateData(params);

    const current = lodash
      .chain(claimRelationshipKlipClaimNoList)
      .filter(
        (skipClaim: any) =>
          formUtils.queryValue(skipClaim.incidentId) === incidentId &&
          formUtils.queryValue(skipClaim.policyId) === policyId
      )
      .first()
      .value();

    return lodash.get(current, 'klipClaimNo');
  };

  setKlipClaimNo = (claimRelationshipKlipClaimNoList: any[], params: any): any => {
    if (!lodash.isPlainObject(params)) return [];

    const { incidentId, policyId } = formUtils.cleanValidateData(params);

    const ifExist = lodash
      .chain(formUtils.cleanValidateData(claimRelationshipKlipClaimNoList))
      .find({ incidentId, policyId })
      .size()
      .value();

    if (!ifExist) {
      if (!lodash.isArray(claimRelationshipKlipClaimNoList)) claimRelationshipKlipClaimNoList = [];
      return lodash
        .chain(claimRelationshipKlipClaimNoList)
        .push({ incidentId, policyId, ...(params || {}) })
        .value();
    }

    return lodash.map(claimRelationshipKlipClaimNoList, (klipClaim: any) => {
      if (
        formUtils.queryValue(klipClaim.incidentId) === incidentId &&
        formUtils.queryValue(klipClaim.policyId) === policyId
      ) {
        return { ...klipClaim, ...(params || {}) };
      }

      return klipClaim;
    });
  };

  setKlipCaseInfo = (klipCaseInfoList: any[], params: any): any => {
    if (!lodash.isPlainObject(params)) return [];

    const { incidentId, policyId, id } = formUtils.cleanValidateData(params);

    const ifExist = lodash
      .chain(formUtils.cleanValidateData(klipCaseInfoList))
      .find({ id })
      .size()
      .value();

    if (!ifExist) {
      if (!lodash.isArray(klipCaseInfoList)) klipCaseInfoList = [];
      return lodash
        .chain(klipCaseInfoList)
        .push({ incidentId, policyId, ...(params || {}), id: id || uuid(), deleted: 0 })
        .value();
    }

    return lodash.map(klipCaseInfoList, (klipCase: any) => {
      if (id && klipCase.id === id) {
        return { ...klipCase, ...(params || {}) };
      }

      return klipCase;
    });
  };

  delKlipClaimNo = (claimRelationshipKlipClaimNoList: any[], params: any): any => {
    if (!lodash.isArray(claimRelationshipKlipClaimNoList) || !lodash.isPlainObject(params))
      return [];
    const { incidentId, policyId } = formUtils.cleanValidateData(params);

    return lodash
      .chain(claimRelationshipKlipClaimNoList)
      .filter(
        (skipClaim: any) =>
          formUtils.queryValue(skipClaim.incidentId) !== incidentId &&
          (policyId ? formUtils.queryValue(skipClaim.policyId) === policyId : true)
      )
      .value();
  };
}

export default new FieldHandler();
