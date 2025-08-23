import React, { useEffect } from 'react';
import { FormAntCard } from 'basic/components/Form';
import Item from './Item';
import { SectionTitle } from './Section';
import styles from './index.less';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch } from 'dva';

const USTaxDeclarations = ({ transactionId, form }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/uSTaxDeclarationsInit`,
      payload: {
        transactionId,
      },
    });
  }, []);

  return (
    <FormAntCard
      title={
        <div className={styles.label}>
          <SectionTitle />
          <Section form={form} editable={false} section="uSTaxDeclarations">
            <Fields.USTaxDeclarations transactionId={transactionId} />
          </Section>
        </div>
      }
      className={styles.checklistBox}
    >
      <Item transactionId={transactionId} />
    </FormAntCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  usTaxDeclarations:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.usTaxInformation
      ?.usTaxDeclarations,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveEntry`,
          target: 'uSTaxDeclarationsUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { usTaxDeclarations }: any = props;

      return formUtils.mapObjectToFields({ usTaxDeclarations });
    },
  })(USTaxDeclarations)
);
