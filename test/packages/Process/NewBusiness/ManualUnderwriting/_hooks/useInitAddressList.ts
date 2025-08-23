import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

// TODO: 等配置的字段名改回address7后 删除
const convertFieldName = (subFieldName: string) => {
  const addressMap = { address7: 'country' };
  return lodash.has(addressMap, subFieldName) ? lodash.get(addressMap, subFieldName) : subFieldName;
};

export { convertFieldName };

const convertPolicyFieldName = (subFieldName: string) => {
  const addressMap = { address7: 'countryCode' };
  return lodash.has(addressMap, subFieldName) ? lodash.get(addressMap, subFieldName) : subFieldName;
};

export default (initState: boolean) => {
  const dispatch = useDispatch();

  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.addressInfoMap,
    shallowEqual
  );
  const policyAddressList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData.policyAddressList,
    shallowEqual
  );
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.clientMap,
    shallowEqual
  );
  const ctfCountryCodeList = useMemo(() => {
    return lodash.map(clientMap, (item) => item?.nationalityInfo.ctfCountryCode);
  }, [clientMap]);

  const handleCtfAddress = () => {
    lodash
      .chain(ctfCountryCodeList)
      .compact()
      .uniq()
      .value()
      .forEach((item) => {
        console.log(item);
        dispatch({
          type: `${NAMESPACE}/getAddressList`,
          payload: { parentCode: item, fieldName: 'address6' },
        });
      });
  };

  const handleAddress = async (parentCode?: string, fieldName?: string) => {
    const response: any = await dispatch({
      type: `${NAMESPACE}/getAddressList`,
      payload: { parentCode: parentCode, fieldName: fieldName },
    });

    if (lodash.size(response) > 0) {
      const subFieldName = convertFieldName(
        (lodash.head(response) as { subFieldName: string })?.subFieldName
      );
      const policySubFieldName = convertPolicyFieldName(
        (lodash.head(response) as { subFieldName: string })?.subFieldName
      );

      const params = lodash
        .chain(addressInfoMap)
        .map((addressInfo: any) => formUtils.queryValue(addressInfo?.[subFieldName]))
        .compact()
        .uniq()
        .value();

      const policyParams = lodash
        .chain(policyAddressList)
        .map((addressInfo: any) =>
          formUtils.queryValue(
            addressInfo?.[lodash.replace(subFieldName, 'address', 'addressLine')]
          )
        )
        .compact()
        .uniq()
        .value();

      // TODO：这个兼容是为了防止无限请求(后端应该修改配置)
      if (!lodash.includes(params, parentCode)) {
        lodash.forEach(params, (item) => handleAddress(item, subFieldName));
      }
      if (!lodash.includes(policyParams, parentCode)) {
        lodash.forEach(policyParams, (item) => handleAddress(item, policySubFieldName));
      }
    }
  };

  useEffect(() => {
    if (initState) {
      handleAddress();
      handleCtfAddress();
    }
  }, [initState]);
};
