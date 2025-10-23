import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/DirectorInfoField';
import CompanyCode from 'opus/NewBusiness/Enum/CompanyCode';

const DirectorItem = ({ clientId, form }: any) => {
  return (
    <Section form={form} editable={false} clientId={clientId} itemTable readOnly>
      <Fields.CustomerRole />
      <Fields.CustomerEnFirstName />
      <Fields.CustomerEnSurname />
      <Fields.IdentityNo />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { id }: any) => ({
  clientInfo: modelnamepsace.entities?.clientMap?.[id],
  loadingStatus: login.loadingStatus,
  taskDetail: modelnamepsace.taskDetail,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { clientInfo, taskDetail } = props;
      const { personalInfo } = clientInfo;
      return formUtils.mapObjectToFields({
        ...personalInfo,
        companyCode: taskDetail?.companyCode || CompanyCode.LA,
      });
    },
  })(DirectorItem)
);
