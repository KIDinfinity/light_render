import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const FundCode = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <SectionDafault
      form={form}
      editable={editable}
      section="ChangeCustomerInformation"
      tableCollect={() => {}}
    >
      <Fields.ClientName transactionId={transactionId} />
    </SectionDafault>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
    validating: formCommonController.validating,
    changeCustomerInfoList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeCustomerInfoList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, validating }: any = props;
      if (
        formUtils.shouldUpdateState(changedFields) &&
        lodash.hasIn(changedFields, 'clientName') &&
        !lodash.isEmpty(formUtils.queryValue(changedFields.clientName)) &&
        !validating
      ) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'changeCustomerInfoUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.ADD,
          },
        });
      }
    },

    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields({
        clientName: '',
      });
    },
  })(FundCode)
);
