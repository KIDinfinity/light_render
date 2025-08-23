import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section/CoverageSection';
import styles from './index.less';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

const Item = ({ form, transactionId, tableCollect, readyOnly }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.AddNewRiders) && !readyOnly;
  const sclale = 0.88;
  useEffect(() => {
    form.resetFields();
  }, [form]);
  return (
    <div className={styles.coverageItem}>
      <SectionDafault
        form={form}
        editable={editable}
        section="AddNewRiders-Coverage"
        tableCollect={tableCollect}
        sclale={sclale}
      >
        <Fields.Decision transactionId={transactionId} sclale={sclale} newCoverage />
        <Fields.ClientId transactionId={transactionId} sclale={sclale} newCoverage />
      </SectionDafault>
    </div>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        const cleanValidateChangedFields = formUtils.cleanValidateData(changedFields || {});
        const isAddNewRidersChangedFields = Object.fromEntries(
          lodash
            .chain(cleanValidateChangedFields)
            .entries()
            .filter(([key, value]) => lodash.isString(value))
            .value() || []
        );
        if (!lodash.isEmpty(isAddNewRidersChangedFields)) {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'addNewRidersUpdate',
            payload: {
              type: OperationTypeEnum.ADD,
              modalType: 'coverage',
              changedFields: isAddNewRidersChangedFields,
              transactionId,
              newAddFlag: 'Y',
            },
          });
        }
      }
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Item)
);
