import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/nationalityInfoField';

const NationalityInfo = ({ clientId, form }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} spanMode="dobule" />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  nationalityInfoData: modelnamepsace.entities.clientMap?.[clientId]?.nationalityInfo,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { nationalityInfoData } = props;
      return formUtils.mapObjectToFields(nationalityInfoData);
    },
  })(NationalityInfo)
);
