import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Item = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <>
      <Section form={form} editable={editable} section="PolicySurrender">
        <Fields.AddrContactChangeInd />
        <Fields.CVDate transactionId={transactionId} />
        <Fields.SurrenderReasonCode transactionId={transactionId} />
        <Fields.DueDateForRetention transactionId={transactionId} />
        <Fields.OtherReason transactionId={transactionId} />
      </Section>
    </>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    policySurrender:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.policySurrender,
    task: processTask?.getTask,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, task }: any = props;
      const { caseCategory } = task || {};
      const isDataCaptureCase = isDataCapture({ caseCategory });

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'policySurrenderUpdate',
          payload: {
            changedFields,
            transactionId,
            isDataCapture: isDataCaptureCase,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policySurrender } = props;

      return formUtils.mapObjectToFields(policySurrender);
    },
  })(Item)
);
