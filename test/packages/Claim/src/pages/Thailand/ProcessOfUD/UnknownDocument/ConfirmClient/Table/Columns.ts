import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

const dictIdentityType = lodash.get(window, 'dictionary.IdentityType', {});
const dictGender = lodash.get(window, 'dictionary.Gender', {});

const getTitle = (labelId: string) =>
  formatMessageApi({
    Label_BIZ_Claim: labelId,
  });

export default [
  {
    title: getTitle('venus_claim.label.identityType'),
    dataIndex: 'identityType',
    key: 'identityType',
    render: (identityType: string) =>
      identityType ? lodash.get(dictIdentityType, `${identityType}.en-US`) : '-',
  },
  {
    title: getTitle('venus_claim.label.identityNo'),
    dataIndex: 'identityId',
    key: 'identityId',
  },
  {
    title: getTitle('venus_claim.label.firstName'),
    dataIndex: 'givenName',
    key: 'givenName',
  },
  {
    title: getTitle('venus_claim.label.surname'),
    dataIndex: 'surName',
    key: 'surName',
  },
  {
    title: getTitle('app.usermanagement.basicInfo.label.gender'),
    dataIndex: 'sex',
    key: 'sex',
    render: (sex: string) => (sex ? lodash.get(dictGender, `${sex}.en-US`) : '-'),
  },
  {
    title: getTitle('venus_claim.label.dateOfBirth'),
    dataIndex: 'birthday',
    key: 'birthday',
    render: (birthday: any) => birthday || '-',
  },
  {
    title: getTitle('venus_claim.label.policyNo'),
    dataIndex: 'policyId',
    key: 'policyId',
  },
];
