import { calcAge } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';

function klipCaseDataMapping(payload: any, businessData: any) {
  const keys = Object.keys(payload);
  const newData = JSON.parse(JSON.stringify(businessData));
  if (keys.includes('hostClaimNo')) {
    newData.incidentList = [
      {
        ...newData?.incidentList?.[0],
        ['klipCaseInfoList']: [
          {
            ...(newData?.incidentList?.[0]?.klipCaseInfoList?.[0] || {}),
            policyId: newData?.insured?.policyId,
            klipClaimNo: payload?.hostClaimNo,
          },
        ],
      },
    ];

    return newData;
  } else if (keys.includes('hostClaimStatus')) {
    newData.incidentList = [
      {
        ...newData?.incidentList?.[0],
        ['klipCaseInfoList']: [
          {
            ...(newData?.incidentList?.[0]?.klipCaseInfoList?.[0] || {}),
            policyId: newData?.insured?.policyId,
            hostClaimStatus: payload?.hostClaimStatus,
          },
        ],
      },
    ];

    return newData;
  } else if (keys.includes('sms')) {
    newData.claimant = {
      ...newData?.claimant,
      sms: payload?.sms,
    };

    return newData;
  } else if (keys.includes('agencyDisclosureFlag')) {
    newData.claimant = {
      ...newData?.claimant,
      agencyDisclosureFlag: payload?.agencyDisclosureFlag,
    };

    return newData;
  } else if (keys.length === 1 && keys.includes('submissionDate')) {
    newData.submissionDate = formUtils.queryValue(payload?.submissionDate);

    newData.insured = {
      ...newData?.insured,
      age: calcAge(
        formUtils.queryValue(newData?.insured?.dateOfBirth),
        formUtils.queryValue(payload?.submissionDate)
      ),
    };

    newData.claimant = {
      ...newData?.claimant,
      age: calcAge(
        formUtils.queryValue(newData?.claimant?.dateOfBirth),
        formUtils.queryValue(payload?.submissionDate)
      ),
    };

    return newData;
  } else {
    return { ...(newData || {}), ...(payload || {}) };
  }
}

export default klipCaseDataMapping;
