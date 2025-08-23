import { tenant } from '@/components/Tenant';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Item = ({ form, transactionId, caseCategory, contactInfo }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};
  const submissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.submissionChannel
  );
  const applyToDicts = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_POS_ChangeApplyTo
  );
  const { mainPolicyId, mainOwnerClientId } = policyInfo || {};

  const clientContact = tenant.isTH()
    ? policyInfo?.clientContactList?.find((item) => item?.clientId === mainOwnerClientId) || {}
    : policyInfo?.policyDespatchAddressList?.find((item) => item?.policyId === mainPolicyId) || {};

  const recoverObj =
    lodash.isEmpty(contactInfo) && submissionChannel === 'OMNE'
      ? {}
      : {
          homeNo: clientContact?.residenceTelNo,
          phoneNo: tenant.isTH() ? clientContact?.phoneNo : clientContact?.mobilePhoneNo,
          workNo: clientContact?.businessOfficeNo,
          email: clientContact?.email,
          countryCodeOfPhoneNo: clientContact?.countryCodeOfPhoneNo,
        };
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  const OnRecover = (e: any) => {
    dispatch({
      type: `${NAMESPACE}/contactChangeInfoRecover`,
      payload: {
        transactionId,
        recoverItem: e,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/contactChangeInfoInit`,
      payload: {
        transactionId,
        dicts: applyToDicts,
        caseCategory,
      },
    });
  }, [servicingInit, applyToDicts]);

  return (
    <div>
      {tenant.isMY() && (
        <div>
          <Section form={form} editable={editable} section="ContactChangeInfo">
            <Fields.CountryCodeOfPhoneNo />
            <Fields.PhoneNo
              recoverObj={recoverObj}
              OnRecover={OnRecover}
              transactionId={transactionId}
            />
            <Fields.Email
              recoverObj={recoverObj}
              OnRecover={OnRecover}
              transactionId={transactionId}
            />
          </Section>
        </div>
      )}

      <Section form={form} editable={editable} section="ContactChangeInfo">
        {!tenant.isMY() ? (
          <Fields.Email
            recoverObj={recoverObj}
            OnRecover={OnRecover}
            transactionId={transactionId}
          />
        ) : (
          <></>
        )}
        <Fields.HomeNo recoverObj={recoverObj} OnRecover={OnRecover} />
        {!tenant.isMY() ? (
          <Fields.PhoneNo
            recoverObj={recoverObj}
            OnRecover={OnRecover}
            transactionId={transactionId}
          />
        ) : (
          <></>
        )}
        {!tenant.isMY() ? <Fields.CountryCodeOfPhoneNo /> : <></>}
        <Fields.WorkNo recoverObj={recoverObj} OnRecover={OnRecover} />
        <Fields.ApplyTo transactionId={transactionId} />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    caseCategory: processTask?.getTask?.caseCategory,
    contactInfo: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.contactInfo,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'contactChangeInfoUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { contactInfo } = props;
      return formUtils.mapObjectToFields(contactInfo);
    },
  })(Item)
);
