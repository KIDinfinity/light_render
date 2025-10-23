import React, { useContext } from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useSelector, useDispatch } from 'dva';

import Section, { Fields } from './Section';
import useGetDividendICPIdCard from 'opus/Pages/Process/NewBusiness/DataEntry/_hooks/useGetDividendICPIdCard';
import useGetDividendICPAccountName from 'opus/Pages/Process/NewBusiness/DataEntry/_hooks/useGetDividendICPAccountName';

const DividendICP = ({ form }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(
    (state: any) =>
      state.claimEditable.taskNotEditable ||
      state[NAMESPACE]?.processData?.submissionChannel === 'Omne'
  );
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section form={form} editable={editable} sectionId={sectionId}>
      <Fields.DividendICPPaymentOption />
      <Fields.BankName />
      <Fields.AccountNumber />
      <Fields.AccountName />
      <Fields.IdCard />
    </Section>
  );
};
const DividendICPWrapper = (props: any) => {
  const idCard = useGetDividendICPIdCard();
  const accountName = useGetDividendICPAccountName();
  const EnhancedForm = Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveDividendICP',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data, idCard, accountName } = props;
      const finalData = { ...data, idCard, accountName };
      return formUtils.mapObjectToFields(finalData || {});
    },
  })(DividendICP);

  return <EnhancedForm {...props} idCard={idCard} accountName={accountName} />;
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.dividendIcp,
}))(DividendICPWrapper) as React.ComponentType<any>;
