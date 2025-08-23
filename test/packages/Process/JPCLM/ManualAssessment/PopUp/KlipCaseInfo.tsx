import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Button } from 'antd';
import { formUtils, FormAntCard } from 'basic/components/Form';
import ShowHideButton from 'basic/components/Form/FormLayout/ShowHideButton';
import Section, { KlipCaseInfoFields as Fields } from './Section';
import { SourceSystem } from 'process/Enum';
import Lifej from './Lifej';
import RefundInfo from './RefundInfo';
import Klip7616 from './Klip7616';
import Klip7580 from './Klip7580';
import styles from './index.less';

const KlipCaseInfo = ({ form, item, existPolicy, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/klipCaseInfoDelete',
      payload: {
        id: item?.id,
        incidentId: item?.incidentId,
      },
    });
  };
  const configs = {
    [SourceSystem.Klip]: () => {
      return (
        <>
          <Klip7616 item={item} id={item?.id} />
          <Klip7580 item={item} id={item?.id} />
        </>
      );
    },
    [SourceSystem.Lifej]: () => {
      return (
        <>
          <Lifej item={item} id={item?.id} />
          <RefundInfo item={item} id={item?.id} policyId={formUtils.queryValue(item.policyId)} incidentId={incidentId} />
        </>
      );
    },
  };

  return (
    <div className={styles.caseInfo}>
      <div className={styles.tips}>{item.sourceSystem}</div>
      {editable && (
        <Button
          className={styles.deleteBtn}
          icon="close"
          size="small"
          type="primary"
          shape="circle"
          onClick={handleClick}
        />
      )}
      <div className={styles.content}>
        <FormAntCard>
          <Section form={form} editable={editable} section="PopUp.klipCaseInfo">
            <Fields.KlipClaimNo incidentId={incidentId} id={item.id} />
            <Fields.PolicyId existCodes={existPolicy} />
            <Fields.ClaimDecision />
            <Fields.TransactionNo />
            <Fields.PolicyPayoutAmount incidentId={incidentId} />
            <Fields.ForcedPaymentFlg />
          </Section>
          <ShowHideButton show={show} onChange={setShow} />
          {show && configs[item.sourceSystem || SourceSystem.Klip]({ item })}
        </FormAntCard>
      </div>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, item, incidentId } = props;
      const { id, policyId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'klipCaseInfoUpdate',
              payload: {
                changedFields,
                id,
                incidentId,
                policyId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'klipCaseInfoUpdate',
            payload: {
              changedFields,
              id,
              incidentId,
              policyId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(KlipCaseInfo)
);
