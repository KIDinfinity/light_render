import { useMemo } from 'react';
import lodash from 'lodash';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const list = useGetClientDetailList();
  const currentClientinfo = lodash.find(list, (client: any) => client?.id === id);
  const cardIssuerCountry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList?.[0]?.cardIssuerCountry,
    shallowEqual
  );
  const customerNationality = lodash.get(currentClientinfo, 'nationality');
  const usTaxFlagIsN = formUtils.queryValue(lodash.get(currentClientinfo, 'usTaxFlag')) === 'N';
  const ctfCountryCode = lodash
    .chain(currentClientinfo)
    .get('crtInfoList')
    .find((crtInfo: any) => crtInfo?.type === 'P')
    .get('ctfCountryCode')
    .value();

  return useMemo(() => {
    const countryCodeList = lodash
      .chain(currentClientinfo)
      .get('contactInfoList')
      .map((contactInfo: any) => contactInfo?.countryCode)
      .compact()
      .value();
    const addressCountryList = lodash
      .chain(currentClientinfo)
      .get('addressList')
      .map((addressItem: any) => addressItem?.country)
      .compact()
      .value();

    const allIsRI = (() => {
      const countryList = [customerNationality, ctfCountryCode, ...addressCountryList];
      const cardIssuerCountryIsRI = lodash.isEmpty(cardIssuerCountry)
        ? true
        : cardIssuerCountry === 'RI';
      const countryListEveryRI = lodash.every(
        countryList,
        (item) => formUtils.queryValue(item) === 'RI'
      );
      const countryCodeListEveryRI = lodash.every(
        countryCodeList,
        (item) => formUtils.queryValue(item) === '055' || formUtils.queryValue(item) === '62'
      );
      return cardIssuerCountryIsRI && countryListEveryRI && countryCodeListEveryRI;
    })();
    return allIsRI ? false : usTaxFlagIsN;
  }, [cardIssuerCountry, ctfCountryCode, currentClientinfo, customerNationality, usTaxFlagIsN]);
};
