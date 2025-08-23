import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/paymentTrackDetailInit`,
      payload: {
        transactionId,
      },
    });
  }, [transactionId]);

  return (
    <FormBorderCard marginBottom className={styles.itemClass}>
      <Section form={form} editable={editable} section="PaymentTrack" formId={'PaymentTrack'}>
        <Fields.PaymentStatus />
        <Fields.PayoutDate />
        <Fields.PaymentNo />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  transactionTypesMap: modelnamepsace.entities.transactionTypesMap,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentTrackDetailUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { transactionTypesMap, transactionId } = props;
      return formUtils.mapObjectToFields(transactionTypesMap?.[transactionId]?.paymentTrack || {});
    },
  })(Item)
);
