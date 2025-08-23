import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/backgroudInfoField';

const BackgroundInfo = ({ clientId, form }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} spanMode="dobule" readOnly />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  backgroundInfoData: modelnamepsace.entities.clientMap?.[clientId]?.backgroundInfo,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { backgroundInfoData } = props;
      return formUtils.mapObjectToFields(backgroundInfoData);
    },
  })(BackgroundInfo)
);
