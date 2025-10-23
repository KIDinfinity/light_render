import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Section, { BenefitItemFields as Fields } from './Section';
import Service from './Service';
import Treament from './Treament';
import styles from './index.less';

const BenefitItemItem = ({ form, data, index, dispatch }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const benefitCategory = formUtils.queryValue(data?.benefitCategory) || '';
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
          <Fields.BenefitItemCode />
          <Fields.BenefitItemPayableAmount />
          <Fields.BenefitItemPayableDays />
          <Fields.BenefitItemBoosterAmount />
          <Fields.BenefitItemBoosterDays />
          <Fields.BillAmount />
          <Fields.CopayAmount />
          <Fields.UncoverAmount />
        </Section>
        {benefitCategory === eBenefitCategory.Reimbursement && (
          <Service benefitItemId={data?.id} listMap={data.listMap} />
        )}
        {benefitCategory !== eBenefitCategory.Reimbursement && (
          <Treament benefitItemId={data?.id} listMap={data.listMap} />
        )}
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
          type: `${NAMESPACE}/popUpPableUpdateBenefitItem`,
          payload: {
            changedFields,
            id: data.id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data }: any = props;
      return formUtils.mapObjectToFields(data);
    },
  })(BenefitItemItem)
);
