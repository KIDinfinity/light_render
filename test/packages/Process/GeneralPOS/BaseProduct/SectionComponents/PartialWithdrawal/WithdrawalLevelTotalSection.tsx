import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import classNames from 'classnames';

const WithdrawalLevelSection = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div className={classNames(styles.checkoutBox, styles.mt12)}>
      <SectionDafault
        form={form}
        editable={editable}
        section="PartialWithdrawal"
        tableCollect={() => {}}
      >
        <Fields.RequestTotalAmount />
        <Fields.RequestTotalPerc />
      </SectionDafault>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    requestTotalAmount:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.requestTotalAmount,
    requestTotalPerc:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.requestTotalPerc,
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
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { requestTotalPerc, requestTotalAmount } = props;

      return formUtils.mapObjectToFields({
        requestTotalPerc,
        requestTotalAmount,
      });
    },
  })(WithdrawalLevelSection)
);
