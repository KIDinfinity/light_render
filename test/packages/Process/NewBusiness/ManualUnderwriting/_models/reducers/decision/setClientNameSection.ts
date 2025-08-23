import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import ApplicableToRole from 'process/NewBusiness/Enum/ApplicableToRole';
import CustomerRole from 'enum/CustomerRole';

export default (state: any, action: any) => {
  const { insuredId, coverageId, changedFields } = lodash.pick(action?.payload, [
    'insuredId',
    'coverageId',
    'changedFields',
  ]);
  const { entities, planProductConfig } = state;
  const coverageList = lodash.get(state, 'modalData.processData.coverageList');
  const clientMap = lodash.get(entities, 'clientMap', []);
  const clientId = formUtils.queryValue(lodash.get(changedFields, 'clientId'));
  const index = lodash.findIndex(coverageList, (item: any) => item?.id === coverageId);
  const coverage = lodash.find(coverageList, (item: any) => item?.id === coverageId);
  const insuredList = lodash
    .chain(coverageList)
    .find((item: any) => item?.id === coverageId)
    .get('coverageInsuredList')
    .value();
  const insuredIndex = lodash.findIndex(insuredList, (item: any) => item.id === insuredId);
  const finalInsuredItem = lodash.find(insuredList, (item: any) => item.id === insuredId);
  const insuredSeqNum =
    formUtils.queryValue(
      lodash.chain(clientMap).get(clientId).get('clientInfo.customerSeqNo').value()
    ) || '';

  const roleSet = new Set();
  lodash
    .chain(coverage)
    .get('coverageInsuredList', [])
    .map((insured: any) => insured?.clientId)
    .forEach((_clientId: string) => {
      if (_clientId)
        lodash
          .chain(clientMap)
          .get(_clientId)
          .get('clientInfo.roleList', [])
          .filter((roleData) => !roleData.deleted)
          .forEach((roleItem: any) => {
            roleSet.add(roleItem?.customerRole);
          })
          .value();
    })
    .value();

  const roles = Array.from(roleSet);

  const productionConfigLocation =
    coverage?.isMain === 'Y' ? 'basicPlanProductFeatureList' : 'otherPlanProductFeatureList';

  const applicableToRole = lodash
    .chain(planProductConfig)
    .get(productionConfigLocation)
    .find(
      (productItem: any) => productItem?.productCode === formUtils.queryValue(coverage?.coreCode)
    )
    .get('applicableToRole')
    .split(',')
    .filter((configItem: any) => !!configItem)
    .value();

  let pickData = false;

  if (lodash.isEmpty(applicableToRole)) {
    pickData = true;
  }
  lodash
    .chain(applicableToRole)
    .forEach((configItem: any) => {
      if (configItem === ApplicableToRole.PO) {
        if (lodash.includes(roles, CustomerRole.PolicyOwner)) {
          pickData = true;
        }
      }
      if (configItem === ApplicableToRole.PI) {
        if (coverage?.isMain === 'Y') {
          pickData = true;
        }
      }
      if (configItem === ApplicableToRole.SI) {
        if (!lodash.includes(roles, CustomerRole.PolicyOwner)) {
          pickData = true;
        }
      }
    })
    .value();
  const coreCode = (() => {
    if (!pickData) {
      return '';
    }
    return coverage?.coreCode;
  })();
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      `modalData.processData.coverageList[${index}].coverageInsuredList[${insuredIndex}]`,
      {
        ...finalInsuredItem,
        ...changedFields,
        insuredSeqNum,
        coreCode,
      }
    );
  });
  return {
    ...nextState,
  };
};
