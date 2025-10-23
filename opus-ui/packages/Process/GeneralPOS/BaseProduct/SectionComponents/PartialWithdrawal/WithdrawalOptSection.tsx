import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import {
  OperationTypeEnum,
  StateSectionEnum,
  EditSectionCodeEnum,
} from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const WithdrawalOptSection = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div className={styles.checkoutBox}>
      <SectionDafault
        form={form}
        editable={editable}
        section="PartialWithdrawal"
        tableCollect={() => {}}
      >
        <Fields.WithdrawalOpt />
      </SectionDafault>
    </div>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace, processTask }: any,
    { transactionId }: any
  ) => ({
    validating: formCommonController.validating,
    withdrawalOpt:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.withdrawalOpt,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, validating, isNotDataCapture }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (!validating) {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'partialWithdrawalUpdate',
            payload: {
              changedFields,
              transactionId,
              type: OperationTypeEnum.COVER,
              isNotDataCapture,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { withdrawalOpt } = props;

      return formUtils.mapObjectToFields({
        withdrawalOpt:
          withdrawalOpt || defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION),
      });
    },
  })(WithdrawalOptSection)
);
