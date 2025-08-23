import React from 'react';
import { Form } from 'antd';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { getPopUpPolicyInfo } from 'claim/pages/utils/getPopUpPolicyInfo';
import Section, { Policy as Fields } from './Section';
import styles from './index.less';

const PolicyInfo = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.policyInfo}>
      <Section form={form} editable={editable} section="PopUp.policyInfo">
        <Fields.AnnouncementDate />
        <Fields.CertnCn />
        <Fields.ExaminationContents />
        <Fields.NextAppropriationMonth />
        <Fields.OneTimePremium />
        <Fields.PaidToDate />
        <Fields.PolicyId />
        <Fields.ReduceInsuranceAmount />
        <Fields.SpecialContractType />
        <Fields.SpecialObstacleCode />
      </Section>
      {/* <UninsuredPartInfo uninsuredInfoList={item?.uninsuredInfoList}/> */}
    </div>
  );
};

export default Form.create<any>({
  mapPropsToFields(props: any) {
    const { item } = props;
    const policyInfo = getPopUpPolicyInfo(item);
    return formUtils.mapObjectToFields(policyInfo);
  },
})(PolicyInfo);
