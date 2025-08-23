import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import Section, { BenefitTypeFields as Files } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import getOriginData from '../../_models/functions/adjustmentMapUtils';

const Remark = ({ form, basicItem, isLabel, isPayableEditable }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;

  return (
    (!isLabel && (
      <div className={styles.extraField}>
        <Section form={form} editable={editable} section="SummaryPayable">
          <Files.Remark />
          <Files.DenyCode />
          <Files.DenyReason />
          <Files.ExGratiaCode />
          <Files.PolicyDuration />
          <Files.ExGratiaReason />
          <Files.RedFlg />
          <Files.DenyWithRescissionCheck />
          <Files.RefundBasis />
          <Files.BeyondNel />
          <Files.ContestableClaim />
          <Files.Holiday />
        </Section>
      </div>
    )) || <></>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, basicItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'totalBenefitTypeBasicUpdate',
          payload: {
            changedFields,
            id: basicItem?.id,
            boosterId: basicItem?.boosterId,
            validating: lodash.size(changedFields) > 1,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      let { basicItem } = props;
      if(basicItem.isPayableAdjusted) {
        basicItem = getOriginData(basicItem)
      }

      return formUtils.mapObjectToFields({ ...basicItem, item: basicItem });
    },
  })(Remark)
);
