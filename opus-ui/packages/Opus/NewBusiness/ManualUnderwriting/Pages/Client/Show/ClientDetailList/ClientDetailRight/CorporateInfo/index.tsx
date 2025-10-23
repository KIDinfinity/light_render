import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/corporateInfoField';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import lodash from 'lodash';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

const Personalinfo = ({ clientId, form }: any) => {
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

  return isShowSection && <Section form={form} editable={false} clientId={clientId} readOnly />;
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  personalInfo: modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { personalInfo } = props;
      return formUtils.mapObjectToFields({ ...personalInfo });
    },
  })(Personalinfo)
);
