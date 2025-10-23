import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { BenefitItemFields } from './Section';
import List from './List';

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
    <>
      <Section form={form} editable={editable} section="PopUpPayable.BenefitItem">
        <BenefitItemFields.BenefitItemCode />
      </Section>
      <List benefitItemData={data} />
    </>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'popUpPableChangeBenefitItem',
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
