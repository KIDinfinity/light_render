import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import styles from './index.less';

const AddSection = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return editable ? (
    <div className={styles.addSection}>
      <SectionDafault
        form={form}
        editable={editable}
        section="PartialWithdrawal"
        tableCollect={() => {}}
      >
        <Fields.FundCode transactionId={transactionId} isAdd />
      </SectionDafault>
    </div>
  ) : (
    <></>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  partialWithdrawalFundList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
      ?.partialWithdrawalFundList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, isNotDataCapture }: any = props;

      if (
        formUtils.shouldUpdateState(changedFields) &&
        lodash.hasIn(changedFields, 'fundCode') &&
        !lodash.isEmpty(formUtils.queryValue(changedFields.fundCode))
      ) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'partialWithdrawalUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.ADD,
            isNotDataCapture,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields({
        fundCode: '',
      });
    },
  })(AddSection)
);
