import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { tenant, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

const Item = (props: any) => {
  const { form, tableCollect } = props;

  const editable = useSectionEditable(EditSectionCodeEnum.ApplytoPolicies);

  return (
    <Section form={form} editable={editable} section="ApplytoPolicies" tableCollect={tableCollect}>
      <Fields.PolicySelection />
      <Fields.PolicyNo />
      <Fields.PolicyType />
      <Fields.RiskStatus />
      <Fields.InsuredName />
      <Fields.ContactAddr />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId, id }: any) => ({
  applyToPolicy: modelnamepsace.entities?.policyInfoBOListMap?.[id],
  applyToPolicyBOList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.applyToPolicyBOList,
  policyInfo: modelnamepsace.processData?.policyInfo,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id: cloneListId, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'applytoPoliciesUpdate',
          payload: {
            changedFields,
            cloneListId,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { applyToPolicy, applyToPolicyBOList, id, policyInfo } = props;
      const { policyDespatchAddressList, policyContractList, policyAddrList } = policyInfo || {};
      const contractType = policyContractList?.find(
        (item) => item?.policyId === applyToPolicy?.policyId
      )?.contractType;
      const isSelect = applyToPolicyBOList?.includes(id);

      const currentPolicyAddress = tenant.region({
        [Region.TH]: policyAddrList?.find((item) => item?.policyId === applyToPolicy?.policyId),
        notMatch: policyDespatchAddressList?.find(
          (item) => item?.policyId === applyToPolicy?.policyId
        ),
      });
      const policyDispatchAddr = {
        addressLine1: currentPolicyAddress?.addressLine1,
        addressLine2: currentPolicyAddress?.addressLine2,
        addressLine3: currentPolicyAddress?.addressLine3,
        addressLine4: currentPolicyAddress?.addressLine4,
        addressLine5: currentPolicyAddress?.addressLine5,
        zipCode: currentPolicyAddress?.zipCode,
        countryCode: formatMessageApi({
          Dropdown_CFG_Country: currentPolicyAddress?.countryCode,
        }),
      };
      const wholeAddress = tenant.region({
        [Region.TH]: lodash.compact(Object.values(policyDispatchAddr)).join(' '),
        notMatch: currentPolicyAddress?.wholeAddress,
      });

      return formUtils.mapObjectToFields({
        ...applyToPolicy,
        policyType: contractType,
        policyNo: applyToPolicy?.policyId,
        insuredName: applyToPolicy?.insuredFullName,
        contactAddr: wholeAddress,
        policySelection: isSelect ? 1 : 0,
      });
    },
  })(Item)
);
