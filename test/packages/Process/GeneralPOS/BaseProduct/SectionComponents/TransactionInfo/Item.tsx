import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId, index }: any) => {
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
    <FormBorderCard marginBottom className={styles.itemClass}>
      <Section form={form} editable={editable} section="TransactionInfo">
        <Fields.TransactionTypeCode index={index} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  transcationType: modelnamepsace.entities?.transactionTypesMap?.[transactionId],
}))(
  Form.create({
    async onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        await dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'transactionInfoUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
        dispatch({
          type: `${NAMESPACE}/saveSnapshot`,
        });
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType } = props;
      return formUtils.mapObjectToFields({
        ...transcationType,
        // remark不可编辑，只做国际化转换
        remark: formUtils
          .queryValue(transcationType?.remark)
          ?.replace?.(/(\w+)/g, (remark: string) =>
            formatMessageApi({
              Servicing_Deny_Reason: remark,
            })
          ),
      });
    },
  })(Item)
);
