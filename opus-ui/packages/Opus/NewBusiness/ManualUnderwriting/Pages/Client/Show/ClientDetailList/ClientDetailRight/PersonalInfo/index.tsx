import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/persionalInfoField';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';
import lodash from 'lodash';

const Personalinfo = ({ clientId, form }: any) => {
  const customerType = useSelector((state: any) =>
    lodash.get(state, `${NAMESPACE}.entities.clientMap.${clientId}.personalInfo.customerType`)
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isShowSection = retrieveExistCorpFromLAToggle
    ? formUtils.queryValue(customerType) !== CustomerType.Entity
    : true;

  return (
    isShowSection && <Section form={form} editable={false} clientId={clientId} spanMode="double" />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  personalInfoData: modelnamepsace.entities.clientMap?.[clientId]?.personalInfo,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { personalInfoData } = props;
      return formUtils.mapObjectToFields({ ...personalInfoData });
    },
  })(Personalinfo)
);
