import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { getAddressSubListV3 } from '@/services/miscCfgInquiryControllerService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ addressLevel }: any) => {
  const dispatch = useDispatch();
  const regionCode = tenant.region();
  return useCallback(
    async (parentCode: any) => {
      if (!parentCode) {
        return false;
      }
      const response = await getAddressSubListV3({
        parentCode,
      });
      const addressChildMapping = (() => {
        if (regionCode === Region.PH) {
          return {
            country: 'province',
            province: 'city',
            city: 'zipCode',
          };
        }
        if (regionCode === Region.VN) {
          return {
            country: 'city',
            city: 'district',
            district: 'commune',
            commune: 'village',
            village: 'street',
          };
        }
        if (regionCode === Region.KH) {
          return {
            country: 'province',
            province: 'district',
            district: 'commune',
            commune: 'village',
            village: 'street',
          };
        }
        if (regionCode === Region.ID) {
          return {
            country: 'province',
            province: 'city',
            city: 'zipCode',
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
      if (lodash.isArray(response)) {
        dispatch({
          type: `${NAMESPACE}/setAddress`,
          payload: {
            parentCode,
            addressLevel: addressChildMapping[addressLevel],
            addressSubList: response,
          },
        });
      }
    },
    [addressLevel]
  );
};
