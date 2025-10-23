import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'basic/enum/CustomerRole';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import Section from './Section';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

interface IProps {
  clientId: string;
}

export default ({ clientId }: IProps) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerRole
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerType
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isExistRole = lodash.includes(formUtils.queryValue(customerRole), CustomerRole.Payor);
  const isShowSection =
    formUtils.queryValue(customerType) === CustomerType.Entity &&
    isExistRole &&
    retrieveExistCorpFromLAToggle;

  return isShowSection && <Section clientId={clientId} />;
};
