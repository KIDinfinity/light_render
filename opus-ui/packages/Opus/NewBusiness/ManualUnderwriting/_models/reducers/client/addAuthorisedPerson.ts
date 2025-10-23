import { formUtils } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';
import { AddressType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import { AddressTypeEnum } from 'process/GeneralPOS/common/Enum';
import { v4 as uuidv4 } from 'uuid';

const CLIENTINFO = {
  personalInfo: {
    customerRole: [CustomerRole.AuthorisedSignatory],
  },
  nationalityInfo: {},
  newClientFlag: BooleanEnum.Yes,
};

const personalInfoFields = [
  'customerEnFirstName',
  'customerEnSurname',
  'dateOfBirth',
  'identityNo',
  'gender',
];

const nationalityInfoFields = ['nationality'];

export default (state: any, { payload }: any) => {
  const { withInsured = false } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const addressId = uuidv4();
    let clientInfo = { ...CLIENTINFO, id, addressInfoList: [addressId] };
    let addressInfo = { id: addressId, addrType: AddressTypeEnum.Residence };

    const clientMap = lodash.get(draftState, 'modalData.entities.clientMap', {});
    const insuredInfo = lodash
      .values(clientMap)
      .find((client: any) =>
        formUtils.queryValue(client.personalInfo?.customerRole)?.includes(CustomerRole.Insured)
      );
    const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []);
    draftState.modalData.processData.clientInfoList = lodash.compact([id].concat(clientInfoList));
    if (withInsured && insuredInfo) {
      const { personalInfo, nationalityInfo } = insuredInfo;
      clientInfo = {
        ...clientInfo,
        personalInfo: {
          ...lodash.pick(personalInfo ?? {}, ...personalInfoFields),
          ...clientInfo.personalInfo,
        },
        nationalityInfo: { ...lodash.pick(nationalityInfo ?? {}, ...nationalityInfoFields) },
      };
      const addressInfoMap = lodash.get(draftState, 'modalData.entities.addressInfoMap', {});
      const insuredAddressId = lodash.find(
        insuredInfo.addressInfoList,
        (addrId: string) =>
          formUtils.queryValue(addressInfoMap[addrId]?.addrType) === AddressType.Residence
      );
      const insuredAddressInfo = addressInfoMap[insuredAddressId] ?? {};

      addressInfo = { ...insuredAddressInfo, ...addressInfo };
    }
    draftState.modalData.entities.clientMap[id] = clientInfo;
    draftState.modalData.entities.addressInfoMap[addressId] = addressInfo;
  });

  return { ...nextState };
};
