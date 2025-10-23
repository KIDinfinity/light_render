import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import Section, { KlipCaseInfoFields as Fields } from './Section';
import { SourceSystem } from 'process/Enum';
import { ReactComponent as IconPlus } from 'opus/Assets/icon-plus.svg';
import {
  formatMessageApi,
  formatMessageApiTypeCodeLabel_CLM_Opus as t,
} from '@/utils/dictFormatMessage';
import Lifej from './Lifej';
import RefundInfo from './RefundInfo';
import Klip7616 from './Klip7616';
import Klip7580 from './Klip7580';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const KlipCaseInfo = ({ form, item, existPolicy, incidentId, id, disableDelete }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const claimNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.claimNo
  );

  const handleAdd = () => {
    dispatch({
      type: `${NAMESPACE}/klipCaseInfoAdd`,
      payload: {
        incidentId,
        claimNo,
      },
    });
  };

  const handleClick = () => {
    dispatch({
      type: `${NAMESPACE}/klipCaseInfoDelete`,
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
          <Klip7616 item={item} id={item?.id} incidentId={incidentId} />
          <Klip7580 item={item} id={item?.id} incidentId={incidentId} />
        </>
      );
    },
    [SourceSystem.Lifej]: () => {
      return (
        <>
          <Lifej item={item} id={item?.id} incidentId={incidentId} />
          <RefundInfo
            item={item}
            id={item?.id}
            policyId={formUtils.queryValue(item.policyId)}
            incidentId={incidentId}
          />
        </>
      );
    },
  };

  return (
    <div className={styles.caseInfo}>
      <div className={styles.tips}>
        <div className={styles.tipsTitle}>
          {!item.sourceSystem
            ? formatMessageApi({ Label_BIZ_Policy: 'PolicySource' })
            : t(item.sourceSystem)}
        </div>
        <div className={styles.tipsActions}>
          {editable && <Icon component={IconPlus} onClick={handleAdd} />}
          {editable && !disableDelete && (
            <DeleteButton handleDelete={handleClick} disabled={disableDelete} />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.basic}>
          <Section form={form} editable={editable} section="PopUp.klipCaseInfo" id={id}>
            <Fields.KlipClaimNo incidentId={incidentId} id={item.id} />
            <Fields.PolicyId existCodes={existPolicy} />
            <Fields.NotificationOfLossDate />
            <Fields.ClaimDecision />
            <Fields.TransactionNo />
            <Fields.PolicyPayoutAmount incidentId={incidentId} />
            <Fields.ForcedPaymentFlg />
          </Section>
        </div>
        {configs?.[item.sourceSystem]?.({ item })}
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
              type: `${NAMESPACE}/saveEntry`,
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
            type: `${NAMESPACE}/saveFormData`,
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
