import React from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import styles from './index.less';

const AddNewRidersField = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.AddNewRiders);

  return (
    <div className={styles.header}>
      <div className={styles.flex1}>
        <Section form={form} editable={editable} section="AddNewRiders-Field">
          <Fields.campaignCode transactionId={transactionId} />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  uwPolicy: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'addNewRidersUpdate',
          payload: {
            type: OperationTypeEnum.UPDATE,
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      return formUtils.mapObjectToFields(props?.uwPolicy);
    },
  })(AddNewRidersField)
);
