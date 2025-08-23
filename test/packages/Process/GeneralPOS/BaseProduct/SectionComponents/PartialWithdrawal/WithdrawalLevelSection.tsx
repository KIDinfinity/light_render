import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum, StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const WithdrawalLevelSection = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <SectionDafault
      form={form}
      editable={editable}
      section="PartialWithdrawal"
      tableCollect={() => {}}
    >
      <Fields.WithdrawalLevel />
    </SectionDafault>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    withdrawalLevel:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.withdrawalLevel,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, isNotDataCapture }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'partialWithdrawalUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.UPDATE,
            isNotDataCapture,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { withdrawalLevel } = props;

      return formUtils.mapObjectToFields({
        withdrawalLevel:
          withdrawalLevel || defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALLEVEL),
      });
    },
  })(WithdrawalLevelSection)
);
