import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

interface IParams {
  form: any;
  showOnly: boolean;
}
const Basic = ({ form, showOnly }: IParams) => {
  return (
    <Section
      form={form}
      showOnly={showOnly}
      register={!showOnly}
      editable={false}
      section="EPFInformation-Field"
      formId="EPFInformation-Field"
    >
      <Fields.Epfmembernumber />
      <Fields.EpfWithdrawalRefId />
      <Fields.Masterpolicynumber />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
