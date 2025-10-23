import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/contactInfoTable';

const ContactItem = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} readOnly />;
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { id }: any) => ({
  item: modelnamepsace.entities.contactInfoMap?.[id],
  loadingStatus: login.loadingStatus,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ContactItem)
);
