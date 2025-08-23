import React from 'react';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { BenefitItemFields } from './Section';
import List from './List';
import styles from './index.less';

const BenefitItemItem = ({ form, data, dispatch }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/popUpPableRemoveBenefitItem`,
      payload: {
        id: data?.id,
      },
    });
  };

  return (
    <div style={styles.benetifItem}>
      <FormBorderCard
        button={{
          visiable: editable,
          callback: handleDelete,
        }}
      >
        <Section form={form} editable={editable} section="PopUpPayable.BenefitItem">
          <BenefitItemFields.BenefitItemCode />
          {/* <BenefitItemFields.BenefitItemPayableAmount /> */}
        </Section>
        <List benefitItemData={data} />
      </FormBorderCard>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableChangeBenefitItem`,
          payload: {
            changedFields,
            benefitItemId: data.id,
          },
        });
        if (lodash.has(changedFields, 'benefitItemCode') && lodash.size(changedFields) === 1) {
          dispatch({
            type: `${NAMESPACE}/getPopPayableExchangeRate`,
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { data }: any = props;
      return formUtils.mapObjectToFields(data);
    },
  })(BenefitItemItem)
);
