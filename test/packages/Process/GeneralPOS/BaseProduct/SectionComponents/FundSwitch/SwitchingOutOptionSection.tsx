import React from 'react';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const SwitchingOutOption = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div className={styles.checkoutBox}>
      <SectionDafault
        form={form}
        editable={editable}
        section="FundSwitching"
        tableCollect={() => {}}
      >
        <Fields.SwitchingOutOption />
      </SectionDafault>
    </div>
  );
};
1;
export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  switchingOutOption:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
      ?.switchingOutOption,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'fundSwitchUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.COVER,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { switchingOutOption } = props;
      return formUtils.mapObjectToFields({
        switchingOutOption,
      });
    },
  })(SwitchingOutOption)
);
