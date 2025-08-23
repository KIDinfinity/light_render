import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const PPY = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PaymentMethod);

  return editable ? (
    <SectionDafault form={form} editable={editable} section="PaymentMethod" tableCollect={() => {}}>
      <Fields.BankCode bankNewAdd transactionId={transactionId} />
    </SectionDafault>
  ) : (
    <></>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  txPmBankList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0]
      ?.txPmBankList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;
      if (
        formUtils.shouldUpdateState(changedFields) &&
        lodash.hasIn(changedFields, 'bankCode') &&
        !lodash.isEmpty(formUtils.queryValue(changedFields.bankCode))
      ) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentMethodUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.ADD,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const newData = {
        bankCode: '',
      };
      return formUtils.mapObjectToFields({ ...newData });
    },
  })(PPY)
);
