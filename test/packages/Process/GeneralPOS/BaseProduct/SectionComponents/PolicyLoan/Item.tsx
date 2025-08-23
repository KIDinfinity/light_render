import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import Section, { Fields } from './Section';
import styles from './index.less';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { useSelector } from 'umi';
import lodash from 'lodash';
const Item = ({ form, policyLoan, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const policyLoanNumbertoFixed = lodash.mapValues(policyLoan, (value, key) => {
    return lodash.isNumber(value) && key !== 'deleted' ? value.toFixed(2) : value;
  });
  return (
    <>
      <Section form={form} editable={editable} section="PolicyLoan">
        <Fields.FastLoanIndicator />
        <Fields.LoanRequest transactionId={transactionId} />
        <Fields.LoanRequestAmount transactionId={transactionId} />
        <Fields.PayableAmount transactionId={transactionId} />
        <Fields.EffectiveDate transactionId={transactionId} />
      </Section>
      {!isDataCapture({ caseCategory, activityKey }) && (
        <div className={styles.policyLoan}>
          <div className={styles.policyLoanLeft}>
            <div className={styles.item}>
              <div className={styles.symbol} />
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'ContractSurrenderValue',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.contractSurrenderAmt}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.symbol}>{'-'}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'CurrentLoanAmount',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.currentLoanAmt}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.symbol}>{'-'}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'DuePremiumAmount',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.duePremiumAmt}</div>
            </div>
            <div className={styles.borderBox} />
            <div className={styles.item}>
              <div className={styles.symbol}>{'='}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_Policy: 'NetCV',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.netCv}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.symbol} />
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'LoanAmountAvailable',
                }) +
                  `( ${policyLoanNumbertoFixed?.loanAllowPerc * 100} ${formatMessageApi({
                    Label_BIZ_POS: '%ofLoanAllowable',
                  })} )`}
              </div>
              <div className={styles.loanAmountAvailable}>
                {policyLoanNumbertoFixed?.loanAvailableAmt}
              </div>
            </div>
          </div>
          <div className={styles.policyLoanRight}>
            <div className={styles.item}>
              <div className={styles.symbol} />
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'PayableAmount',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.loanAmountRequired}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.symbol}>{'-'}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'LoanDutyStamp',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.loanDutyStamp}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.symbol}>{'-'}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_Policy: 'CounterpatiesFee',
                })}
              </div>
              <div className={styles.value}>{policyLoanNumbertoFixed?.counterpartiesFee}</div>
            </div>
            <div className={styles.borderBox} />
            <div className={styles.item}>
              <div className={styles.symbol}>{'='}</div>
              <div className={styles.labelWidth}>
                {formatMessageApi({
                  Label_BIZ_POS: 'NetLoanAmountPaid',
                })}
              </div>
              <div className={styles.NetLoanAmountPaid}>
                {policyLoanNumbertoFixed?.netLoanAmtPaid}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  policyLoan: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.policyLoan,
  effectiveDate: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.effectiveDate,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'policyLoanUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyLoan, effectiveDate } = props;
      return formUtils.mapObjectToFields({
        ...policyLoan,
        effectiveDate,
        FastLoanIndicator: policyLoan?.FastLoanIndicator ?? 'N',
      });
    },
  })(Item)
);
