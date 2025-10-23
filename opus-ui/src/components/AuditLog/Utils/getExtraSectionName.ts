import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { ActionType } from '../Enum';
import CustomerRole from 'basic/enum/CustomerRole';

interface IParams {
  path: string;
  targetPath: string;
  fieldName: string;
  currentController: string;
  target: string;
  oldClaimData?: any;
  newClaimData?: any;
  diffMap: any;
  type: ActionType;
}

const UBORoles = [
  CustomerRole.AuthorisedSignatory,
  CustomerRole.Director,
  CustomerRole.ControllingPerson,
  CustomerRole.UBO,
];

export default ({
  type,
  targetPath,
  target,
  path,
  oldClaimData,
  newClaimData,
  diffMap,
}: IParams) => {
  if (targetPath === 'clientInfoList' && target === 'title') {
    const clientInfoList =
      type === ActionType.Remove
        ? oldClaimData?.clientInfoList || []
        : newClaimData?.clientInfoList || [];
    const clientIdPath = path.replace(/\[(.*?)\]/g, '[$1[1]].id');
    const clientId = diffMap?.[clientIdPath];
    const client = lodash.find(clientInfoList, (c) => c.id === clientId);

    if (client && client?.personalInfo) {
      const { customerEnFirstName, customerEnSurname, customerRole } = client.personalInfo;
      const roleLabel = lodash.reduce(
        customerRole,
        (out: string, role: string, index: number) => {
          const roleTypeCode = lodash.includes(UBORoles, role)
            ? 'Dropdown_CLM_UBORole'
            : 'Dropdown_CLM_CustomerRole';
          return `${out}${index === 0 ? '' : ','}${formatMessageApi({ [roleTypeCode]: role })}`;
        },
        ''
      );
      const nameLabel = `${customerEnFirstName ?? ''} ${customerEnSurname ?? ''}`;

      return `${roleLabel} - ${nameLabel}`;
    }
  }

  return '';
};
