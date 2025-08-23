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
          <Fields.LapseDate transactionId={transactionId} />
          <Fields.LapseDuration transactionId={transactionId} />
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

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  transactionType: modelnamepsace.entities?.transactionTypesMap?.[transactionId],
  policyInfoBOListMap: modelnamepsace.entities?.policyInfoBOListMap,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
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
      const { transactionType = {}, policyInfoBOListMap } = props;
      const { id, policyId } = transactionType;
      // Lapse Date/Lapse Duration为policy层级字段
      const { lapseDate, lapseDuration } = policyInfoBOListMap?.[`${id}____${policyId}`] || {};

      return formUtils.mapObjectToFields({
        ...transactionType,
        lapseDate,
        lapseDuration,
      });
    },
  })(EffectiveItem)
);
