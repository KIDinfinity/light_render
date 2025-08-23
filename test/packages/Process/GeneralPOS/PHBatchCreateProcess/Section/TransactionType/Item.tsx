import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Item = ({ form }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PosRequestInfo">
      <Fields.TransactionTypes />
    </Section>
  );
};

export default connect(({ PHBatchCreateProcessController, claimEditable }: any) => ({
  transactionTypes: PHBatchCreateProcessController?.processData?.transactionTypes,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, transactionTypes }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        const nowSelected = formUtils.queryValue(changedFields.transactionTypes);
        const nowSelectedLength = lodash.get(nowSelected, 'length', 0);
        const cleanTransactionTypes = lodash.map(transactionTypes, (item) =>
          formUtils.queryValue(item?.transactionTypeCode)
        );

        const originSelectedLength = lodash.get(cleanTransactionTypes, 'length', 0);
        const isAdd = nowSelectedLength > originSelectedLength;
        const id = isAdd
          ? lodash.difference(nowSelected, cleanTransactionTypes)
          : lodash.difference(cleanTransactionTypes, nowSelected);

        dispatch({
          type: 'PHBatchCreateProcessController/saveFormData',
          target: 'changeTransactionTypes',
          payload: {
            isAdd,
            id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { transactionTypes } = props;
      return formUtils.mapObjectToFields({
        transactionTypes: lodash.map(transactionTypes, (item) => item?.transactionTypeCode),
      });
    },
  })(Item)
);
