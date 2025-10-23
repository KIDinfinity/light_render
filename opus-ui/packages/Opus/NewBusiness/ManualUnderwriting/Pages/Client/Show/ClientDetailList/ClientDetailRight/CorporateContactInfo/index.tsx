import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from './Section';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

interface IProps {
  clientId: string;
}

export default ({ clientId }: IProps) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.entities.clientMap[clientId].personalInfo.customerRole
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.entities.clientMap[clientId].personalInfo.customerType
  );
  const isExistRole = !lodash.isEmpty(formUtils.queryValue(customerRole));
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isShowSection =
    formUtils.queryValue(customerType) === CustomerType.Entity &&
    isExistRole &&
    retrieveExistCorpFromLAToggle;

  return isShowSection && <Section clientId={clientId} />;
};
