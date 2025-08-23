import Section, { Fields } from '../Section';
import { Form } from 'antd';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import React from 'react';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import styles from './index.less';

const BankSection = ({ form, id }: any) => {
  const rejected = useGetRejected();
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );

  return (
    <Section form={form} editable={!rejected && !taskNotEditable} required={true}>
      <Fields.Bankname />
      <Fields.FactoryHouse />
      <Fields.Accountnumber />
      <Fields.BankAcctName />
      <Fields.EffectiveDate />
      <Fields.ExpiryDate />
      <Fields.AccountHolderType id={id} />
      <Fields.RelationshipWithInsured />
    </Section>
  );
};

const BankinfoFields = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'handleChangeBankInfo',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'handleChangeBankInfo',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(BankSection)
);

const BankinfoInput = ({ data, id }: { data: any; id: string }) => {
  return (
    <div className={styles.bankInfoDivOriginal}>
      <BankinfoFields data={data} id={id} />
    </div>
  );
};

export default BankinfoInput;
