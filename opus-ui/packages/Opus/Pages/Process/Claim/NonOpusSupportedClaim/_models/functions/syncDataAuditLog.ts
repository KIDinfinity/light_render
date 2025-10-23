import { Action, ActionType } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

// pre-fill addAuditLog params
export default (businessData: any, changedFields: any) => {
  const keys = Object.keys(changedFields);
  const newData: any = {
    businessNo: businessData?.inquiryClaimNo,
    action: Action.Save,
    inquiryBusinessNo: businessData?.inquiryClaimNo,
  };
  // hostClaimNo auditLog
  if (keys.includes('hostClaimNo')) {
    newData.content = [
      {
        path: 'claimDecision',
        fieldName: 'hostClaimNo',
        label: formatMessageApi({
          Label_CLM_Opus: 'hostClaimNo',
        }),
        newValue: changedFields?.hostClaimNo || '',
        oldValue: businessData?.claimDecision?.hostClaimNo || '',
        section: formatMessageApi({
          Label_CLM_Opus: 'BusinessDecision',
        }),
        titleSection: '',
        type: ActionType.Update,
      },
    ];

    return newData;
  } else if (keys.includes('hostClaimStatus')) {
    newData.content = [
      {
        path: 'claimDecision',
        fieldName: 'claimStatus',
        label: formatMessageApi({
          Label_COM_OPUS: 'claimStatus',
        }),
        newValue:
          changedFields?.dicts?.find(
            (i: any) => i?.dictCode === String(changedFields?.hostClaimStatus)
          )?.dictName ||
          changedFields?.hostClaimStatus ||
          '',
        oldValue:
          changedFields?.dicts?.find(
            (i: any) => i?.dictCode === String(businessData?.claimDecision?.hostClaimStatus)
          )?.dictName ||
          businessData?.claimDecision?.hostClaimStatus ||
          '',
        section: formatMessageApi({
          Label_CLM_Opus: 'BusinessDecision',
        }),
        titleSection: '',
        type: ActionType.Update,
      },
    ];

    return newData;
  } else if (keys.includes('submissionDate')) {
    newData.content = [
      {
        path: '',
        fieldName: 'submissionDate',
        label: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
        }),
        newValue: changedFields?.submissionDate
          ? moment(changedFields?.submissionDate).format('YYYY/MM/DD')
          : '',
        oldValue: businessData?.submissionDate
          ? moment(businessData?.submissionDate).format('YYYY/MM/DD')
          : '',
        section: '',
        titleSection: '',
        type: ActionType.Update,
      },
    ];
  } else if (keys.includes('sms')) {
    newData.content = [
      {
        path: 'claimant',
        fieldName: 'sms',
        label: formatMessageApi({
          Label_BIZ_Claim: 'SMS',
        }),
        newValue:
          changedFields?.dicts?.find((i: any) => i?.dictCode === String(changedFields?.sms))
            ?.dictName ||
          changedFields?.sms ||
          '',
        oldValue:
          changedFields?.dicts?.find(
            (i: any) => i?.dictCode === String(businessData?.claimant?.sms)
          )?.dictName ||
          businessData?.claimant?.sms ||
          '',
        section: formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
        }),
        titleSection: '',
        type: ActionType.Update,
      },
    ];
  } else if (keys.includes('agencyDisclosureFlag')) {
    newData.content = [
      {
        path: 'claimant',
        fieldName: 'agencyDisclosureFlag',
        label: formatMessageApi({
          Label_COM_OPUS: 'agencyDisclosureFlag',
        }),
        newValue:
          changedFields?.dicts?.find(
            (i: any) => i?.dictCode === String(changedFields?.agencyDisclosureFlag)
          )?.dictName ||
          changedFields?.agencyDisclosureFlag ||
          '',
        oldValue:
          changedFields?.dicts?.find(
            (i: any) => i?.dictCode === String(businessData?.claimant?.agencyDisclosureFlag)
          )?.dictName ||
          businessData?.claimant?.agencyDisclosureFlag ||
          '',
        section: formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
        }),
        titleSection: '',
        type: ActionType.Update,
      },
    ];
  }

  return newData;
};
