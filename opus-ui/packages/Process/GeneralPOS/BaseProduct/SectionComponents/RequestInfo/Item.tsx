import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.Transaction, false, 'RequestInfo');

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/requestInfoInit`,
    });
  }, [servicingInit]);

  return (
    <FormBorderCard marginBottom className={styles.itemClass}>
      <Section form={form} editable={editable} section="RequestInfo" formId={'RequestInfo'}>
        <Fields.Decision />
        <Fields.DeclineReason />
        <Fields.EditDeclineReason />
        <Fields.RequestDate />
        <Fields.TransactionRemark />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  transactionTypesMap: modelnamepsace.entities.transactionTypesMap,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'requestInfoUpdate',
              payload: {
                changedFields,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'requestInfoUpdate',
            payload: {
              changedFields,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { transactionTypesMap } = props;
      const [transactionId] = Object.keys(transactionTypesMap || {});

      return formUtils.mapObjectToFields(transactionTypesMap?.[transactionId] || []);
    },
  })(Item)
);
