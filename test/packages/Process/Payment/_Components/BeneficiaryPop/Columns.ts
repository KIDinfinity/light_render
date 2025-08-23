import { formatMessageApi } from '@/utils/dictFormatMessage';
export default [{
  title: formatMessageApi({Label_BIZ_Policy: 'PolicyNo'}),
  dataIndex: 'policyNo'
}, {
  title: formatMessageApi({Label_BIZ_Policy: 'PolicyOwnerID'}),
  dataIndex: 'clientId',
}, {
  title: formatMessageApi({Label_BIZ_Individual: 'FirstName'}),
  dataIndex: 'firstName',
}, {
  title: formatMessageApi({Label_BIZ_Individual: 'MiddleName'}),
  dataIndex: 'middleName',
}, {
  title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.surname' }),
  dataIndex: 'surname',
}, {
  title: formatMessageApi({ Label_BIZ_Individual: 'Gender' }),
  dataIndex: 'gender',
}, {
  title: formatMessageApi({ Label_BIZ_Individual: 'IdentityType' }),
  dataIndex: 'idType',
}, {
  title: formatMessageApi({ Label_BIZ_Individual: 'ContactAddr' }),
  dataIndex: 'address',
}]
