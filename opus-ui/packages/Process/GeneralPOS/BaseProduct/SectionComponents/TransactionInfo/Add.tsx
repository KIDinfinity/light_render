import React from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Add = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="TransactionInfo">
      <Fields.TransactionTypeCode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, formCommonController }: any) => ({
  validating: formCommonController.validating,
  transactionTypes: modelnamepsace.processData?.transactionTypes,
}))(
  Form.create({
    onValuesChange: async (props: any, changedValues: any) => {
      const { dispatch, validating } = props;
      if (!validating) {
        await dispatch({
          type: `${NAMESPACE}/transactionInfoAdd`,
          payload: {
            addServicingRequestInfo: {
              id: uuidv4(),
              // TODO
              isManualAdd: true,
              ...changedValues,
              // TODO
            },
          },
        });

        dispatch({
          type: `${NAMESPACE}/saveSnapshot`,
        });
      }
    },
    mapPropsToFields(props) {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
