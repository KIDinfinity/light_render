import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};
  const applyToDicts = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_POS_ChangeApplyTo
  );
  const mainPolicyId = policyInfo?.mainPolicyId;

  const clientContact =
    policyInfo?.policyDespatchAddressList?.find((item) => item?.policyId === mainPolicyId) || {};

  const recoverObj = {
    addressLine1: clientContact?.dispatchAddress01,
    addressLine2: clientContact?.dispatchAddress02,
    addressLine3: clientContact?.dispatchAddress03,
    addressLine4: clientContact?.dispatchAddress04,
    addressLine5: clientContact?.dispatchAddress05,
    zipCode: clientContact?.dispatchZipCode,
    preferredMailingAddress: clientContact?.preferredMailingAddress,
    email: clientContact?.emailAddress,
  };

  const OnRecover = (e: any) => {
    dispatch({
      type: `${NAMESPACE}/addressChangeInfoRecover`,
      payload: {
        transactionId,
        recoverItem: e,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/addressChangeInfoInit`,
      payload: {
        transactionId,
        dicts: applyToDicts,
      },
    });
  }, [servicingInit, applyToDicts]);

  return (
    <Section form={form} editable={editable} section="AddressChangeInfo">
      <Fields.AddressLine1 recoverObj={recoverObj} OnRecover={OnRecover} />
      <Fields.AddressLine2 recoverObj={recoverObj} OnRecover={OnRecover} />
      <Fields.AddressLine3
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        transactionId={transactionId}
      />
      <Fields.AddressLine4
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        transactionId={transactionId}
      />
      <Fields.AddressLine5
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        transactionId={transactionId}
      />
      <Fields.CountryCode
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        transactionId={transactionId}
      />
      <Fields.ZipCode recoverObj={recoverObj} OnRecover={OnRecover} transactionId={transactionId} />
      <Fields.Email recoverObj={recoverObj} OnRecover={OnRecover} transactionId={transactionId} />
      <Fields.PreferredMailingAddress
        recoverObj={recoverObj}
        OnRecover={OnRecover}
        transactionId={transactionId}
      />
      <Fields.ApplyTo transactionId={transactionId} />
      <Fields.AddressType transactionId={transactionId} />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  policyAddr: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.policyAddr,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'addressChangeInfoUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyAddr } = props;
      return formUtils.mapObjectToFields(policyAddr);
    },
  })(Item)
);
