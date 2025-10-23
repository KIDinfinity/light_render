import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { getAddressSubListV2 } from '@/services/miscCfgInquiryControllerService';
import { address } from '@/services/miscAddressInformationControllerService';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';

const AddressLevel = ['country', 'province', 'district'];
const addressLevelKeyMapping = {
  countryCode: 'countryCode',
  provinceCode: 'addressLine5',
  districtCode: 'addressLine4',
};
const addressChildMapping = (() => {
  const regionCode = tenant.region();
  if (regionCode === Region.PH) {
    return {
      country: 'province',
      province: 'city',
      city: 'zipCode',
    };
  }
  if (regionCode === Region.TH) {
    return {
      country: 'province',
      province: 'district',
      district: 'city',
      city: 'zipCode',
    };
  }
  if ([Region.MY].includes(regionCode)) {
    return {
      country: 'province',
      province: 'city',
    };
  }
  return {
    country: 'province',
    province: 'district',
    district: 'commune',
    commune: 'village',
    village: 'street',
  };
})();
export default ({ addressLevel, parentCode, transactionId }: any) => {
  const dispatch = useDispatch();
  const addressList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address);
  const policyAddr =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.policyAddr
    ) || [];
  return useEffect(() => {
    const level = lodash.findIndex(AddressLevel, (i) => i === addressLevel);
    const getAddressParams = (() => {
      const paramsMap = new Map();
      lodash.forEach(AddressLevel, (key, index) => {
        if (index <= level) {
          const value = formUtils.queryValue(
            lodash.get(policyAddr, addressLevelKeyMapping[`${key}Code`])
          );
          if (!!value) {
            paramsMap.set(`${key}Code`, value);
          }
        }
      });
      return Object.fromEntries(paramsMap);
    })();
    async function t() {
      if (parentCode) {
        if (tenant.isTH()) {
          const currentSubList = lodash.get(
            addressList,
            `${addressChildMapping[addressLevel]}.${parentCode}`
          );
          const isCurrentRegion =
            formUtils.queryValue(lodash.get(policyAddr, 'countryCode')) === Region.TH;
          if (
            !lodash.isEmpty(getAddressParams) &&
            lodash.isEmpty(currentSubList) &&
            isCurrentRegion
          ) {
            const response = await address(getAddressParams);
            const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
            const addressSubList = lodash.get(resultData, addressChildMapping[addressLevel]);
            if (success || !lodash.isEmpty(addressSubList)) {
              dispatch({
                type: `${NAMESPACE}/setAddress`,
                payload: {
                  parentCode,
                  addressLevel: addressChildMapping[addressLevel],
                  addressSubList,
                },
              });
            }
          }
        } else {
          const response = await getAddressSubListV2({
            parentCode,
          });
          if (lodash.isArray(response) || lodash.get(response, 'success')) {
            dispatch({
              type: `${NAMESPACE}/setAddress`,
              payload: {
                parentCode,
                addressLevel: addressChildMapping[addressLevel],
                addressSubList: response,
              },
            });
          }
        }
      }
    }
    t();
  }, [addressLevel, parentCode]);
};
