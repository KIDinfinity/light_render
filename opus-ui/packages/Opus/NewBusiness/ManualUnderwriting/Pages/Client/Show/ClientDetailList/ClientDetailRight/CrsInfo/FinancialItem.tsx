import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from '../../../../_section/financialInfoTable';

const FinancialItem = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} readOnly />;
};

export default connect(({ login }: any) => ({
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(FinancialItem)
);
