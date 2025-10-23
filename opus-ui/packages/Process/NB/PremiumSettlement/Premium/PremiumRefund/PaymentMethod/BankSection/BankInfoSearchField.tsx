import Section, { Fields } from '../Section';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import React from 'react';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import styles from './index.less';
import { Button } from 'antd';
import RegionType from 'process/NB/Enum/RegionType';

const BankSection = ({ form, handleCallback }: any) => {
  const rejected = useGetRejected();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const regionCode = tenant.region();
  const changedFields = {
    bankAcctNo: form.getFieldValue('bankAcctNo'),
    bankCode: form.getFieldValue('bankCode'),
  };

  const handlePress = () => {
    handleCallback(changedFields);
  };
  const handleClear = () => {
    form.resetFields();
    handleCallback({});
  };
  return lodash.isEqual(regionCode, RegionType.KH) ? (
    <>
      <Section
        form={form}
        editable={!rejected || editable}
        disabled={!rejected}
        required={false}
        layoutName="search-layout"
      >
        <Fields.Bankname />
        <Fields.Accountnumber />
      </Section>
      <div className={styles.btn}>
        <Button className={styles.yes} onClick={handlePress}>
          Search
        </Button>
        <Button className={styles.no} onClick={handleClear}>
          <span>Reset</span>
        </Button>
      </div>
    </>
  ) : (
    <>
      <Section form={form} editable={!rejected || editable} disabled={!rejected} required={false}>
        <Fields.Bankname />
        <Fields.FactoryHouse />
        <Fields.Accountnumber />
        <Fields.BankAcctName />
        <Fields.EffectiveDate />
        <Fields.ExpiryDate />
      </Section>
    </>
  );
};

const BankinfoSearchfield = connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { validating, handleCallback }: any = props;
      const regionCode = tenant.region();
      if (formUtils.shouldUpdateState(changedFields)) {
        if (!validating) {
          if (regionCode !== RegionType.KH) {
            handleCallback(changedFields);
          }
        }
      }
    },
    mapPropsToFields(props: any) {
      const { searchQuery } = props;
      return formUtils.mapObjectToFields(searchQuery);
    },
  })(BankSection)
);

export default BankinfoSearchfield;
