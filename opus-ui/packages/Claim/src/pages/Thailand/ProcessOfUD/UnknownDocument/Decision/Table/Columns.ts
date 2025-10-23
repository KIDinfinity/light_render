import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import lodash from 'lodash';

const getTitle = (labelId: string) => {
  if (labelId === 'BusinessNo') {
    return formatMessageApi({
      Label_BIZ_Claim: labelId,
    });
  }
  return formatMessageApi({
    Label_BIZ_Claim: labelId,
  });
};

const dictCaseCategory = lodash.get(window, 'dictionary.APDACaseCategory', {});
const dictClaimType = lodash.get(window, 'dictionary.APDAClaimType', {});

export default [
  {
    title: getTitle('venus_claim.label.caseCategory'),
    dataIndex: 'caseCategory',
    key: 'caseCategory',
    render: (CaseCategory: string) =>
      CaseCategory ? lodash.get(dictCaseCategory, `${CaseCategory}.en-US`) : '-',
  },
  {
    title: getTitle('venus_claim.label.claimType'),
    dataIndex: 'claimType',
    key: 'claimType',
    render: (ClaimType: string) =>
      ClaimType ? lodash.get(dictClaimType, `${ClaimType}.en-US`) : '-',
  },
  {
    title: getTitle('BusinessNo'),
    dataIndex: 'claimNo',
    key: 'claimNo',
  },
  {
    title: getTitle('venus_claim.label.caseNo'),
    dataIndex: 'caseNo',
    key: 'caseNo',
  },
  {
    title: getTitle('venus_claim.label.claimStatus'),
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => status || '-',
  },
  {
    title: getTitle('venus_claim.label.visitOrAdmitDate'),
    dataIndex: 'admissionDate',
    key: 'admissionDate',
    render: (admissionDate: any) => (admissionDate ? moment(admissionDate).format('L') : '-'),
  },
  {
    title: getTitle('venus_claim.label.disChargeDays'),
    dataIndex: 'dischargeDate',
    key: 'policyNo',
    render: (dischargeDate: any) => (dischargeDate ? moment(dischargeDate).format('L') : '-'),
  },
  {
    title: getTitle('venus_claim.label.pendingDoc'),
    dataIndex: 'pendingDocumentList',
    key: 'pendingDocumentList',
    render: (item: any) => (item && item.length ? item.join(',') : '-'),
  },
];
