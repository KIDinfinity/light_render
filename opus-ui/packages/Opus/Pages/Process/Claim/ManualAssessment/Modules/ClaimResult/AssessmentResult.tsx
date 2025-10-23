import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import Section, { Fields } from './Section';
import { Form, Icon, Button } from 'antd';
import { ReactComponent as fileSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleFile.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import styles from './AssessmentResult.less';

@connect(({ [NAMESPACE]: modelnamespace, claimEditable }: any) => ({
  claimDecision: lodash.get(modelnamespace, 'claimProcessData.claimDecision'),
  taskNotEditable: claimEditable.taskNotEditable,
}))
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveClaimDecision',
        payload: {
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props) {
    const { claimDecision }: any = props;

    return formUtils.mapObjectToFields(claimDecision);
  },
})
class AssessmentResult extends PureComponent {
  handleAllocationOpen = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: `${NAMESPACE}/showPaymentModal`,
      payload: { NAMESPACE },
    });
  };

  render() {
    const { form, taskNotEditable }: any = this.props;
    // const payoutCurrency = claimDecision?.payoutCurrency;
    return (
      <div className={styles.result}>
        <div className={styles.titleRow}>
          <Icon component={fileSvg} />
          {formatMessageApi({ Label_CLM_Opus: 'BusinessDecision' })}
          <div className={styles.gap} />
          <Button className={styles.btn} onClick={this.handleAllocationOpen}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          </Button>
        </div>
        <div className={styles.innerCard}>
          <Section form={form} editable={!taskNotEditable} section="ClaimResult">
            <Fields.ClaimPayableAmount />
            <Fields.PayoutAmount />
            <Fields.AssessmentDecision />
          </Section>
        </div>
      </div>
    );
  }
}

export default AssessmentResult;
