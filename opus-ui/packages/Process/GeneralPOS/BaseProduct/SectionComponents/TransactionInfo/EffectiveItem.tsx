import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const EffectiveItem = ({ form, transactionId, index }: any) => {
  const dispatch = useDispatch();

  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/transactionInfoInit`,
      payload: {
        id: transactionId,
      },
    });
  }, [servicingInit]);

  return (
    <>
      <FormBorderCard marginBottom className={styles.itemClass}>
        <Section form={form} editable={editable} section="TransactionInfo">
          <Fields.EffectiveDate index={index} transactionId={transactionId} />
          <Fields.BackDateFlag transactionId={transactionId} />
          <Fields.MoniesDate transactionId={transactionId} />
        </Section>
      </FormBorderCard>
      <div className={styles.requestDate}>
        <Section form={form} editable={editable} section="TransactionInfo">
          <Fields.RequestDate transactionId={transactionId} />
        </Section>
      </div>
    </>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    transcationType: modelnamepsace.entities?.transactionTypesMap?.[transactionId],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId }: any = props;
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'transactionInfoUpdate',
            payload: {
              changedFields,
              transactionId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'transactionInfoUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType } = props;

      return formUtils.mapObjectToFields({
        ...transcationType,
      });
    },
  })(EffectiveItem)
);
