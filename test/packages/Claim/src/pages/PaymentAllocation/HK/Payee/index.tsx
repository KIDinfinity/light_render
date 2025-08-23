import { Provider } from '@/components/_store';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { VLD_000379 } from 'claim/pages/PaymentAllocation/_validators/fieldValidators';
import { SwitchEnum } from 'claim/pages/utils/claim';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import lodash from 'lodash';
import React, { PureComponent } from 'react';
import Panel from '../../_components/Panel';
import { EHasBankAccount, EPaymentMethod } from '../../_dto/Enums';
import type { PayeeModal } from '../../_dto/Models';
import { shallowEqual } from '../../_function';
import BankAccount from './BankAccount';
import ChequeRemark from './ChequeRemark';
import Contact from './Contact';
import Information from './Information';
import RedepositPolicy from './RedepositPolicy';
import styles from './styles.less';

interface IPaymentAllocation {
  payeeList?: PayeeModal[];
  taskNotEditable?: boolean;
  dispatch: Dispatch;
}

class Payee extends PureComponent<IPaymentAllocation> {
  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paymentAllocation/addPayee',
    });
  };

  handleClose = (payeeId?: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paymentAllocation/deletePayee',
      payload: {
        payeeId,
      },
    });
  };

  render() {
    const { payeeList, taskNotEditable } = this.props;
    const title = formatMessageApi({
      Label_BPM_Button: 'AddPayee',
    });
    const titleRedepositPolicy = formatMessageApi({
      Label_BIZ_Claim: 'RedepositPolicy',
    });

    const titleContact = formatMessageApi({
      Label_BIZ_Policy: 'ContactInfo',
    });

    const titleBankAccount = formatMessageApi({
      Label_BIZ_Claim: 'BankAccount',
    });

    const titleChequeRemark = formatMessageApi({
      Label_BIZ_Claim: 'ChequeRemarkSection',
    });

    const hasBankAccount = lodash.values(EHasBankAccount);

    return (
      <div className={styles.PayeeList}>
        <div className={styles.scrollWrap}>
          {lodash.map(payeeList, (payeeItem: PayeeModal, index: number) => {
            const paymentMethodVal = formUtils.queryValue(payeeItem.paymentMethod);
            const isCheck = paymentMethodVal === EPaymentMethod.ByCheck;
            const isBankAccount = hasBankAccount.includes(paymentMethodVal);
            const VLD000379Error = VLD_000379(payeeItem);
            const manualAdd =
              lodash.isString(payeeItem?.manualAdd) && payeeItem?.manualAdd === SwitchEnum.YES;

            return (
              <Panel
                className={styles.PayeeItem}
                title={`${title} ${index + 1}`}
                onClose={() => this.handleClose(payeeItem?.id)}
                closable={!taskNotEditable && manualAdd}
                key={`${payeeItem.id}-${index}`}
              >
                <Information payeeItem={payeeItem} />
                <Panel.LittleTitle title={titleRedepositPolicy} hasPoint>
                  <Provider data={{ payeeItem }}>
                    <RedepositPolicy payeeItem={payeeItem} />
                  </Provider>
                </Panel.LittleTitle>
                <Panel.LittleTitle title={titleContact} hasPoint>
                  <Provider data={{ payeeItem }}>
                    <Contact payeeItem={payeeItem} />
                  </Provider>
                </Panel.LittleTitle>
                {paymentMethodVal && isBankAccount && !isCheck && (
                  <Panel.LittleTitle
                    title={
                      <>
                        {titleBankAccount}
                        {!taskNotEditable && VLD000379Error && (
                          <ErrorTooltipManual
                            className="chequeRemarkErrorIcon"
                            manualErrorMessage={VLD000379Error}
                          />
                        )}
                      </>
                    }
                    hasPoint
                  >
                    <Panel.BackLine>
                      <Provider data={{ payeeItem }}>
                        <BankAccount
                          payeeBankAccountList={payeeItem.payeeBankAccountList}
                          payeeId={payeeItem.id}
                          payeeItem={payeeItem}
                        />
                      </Provider>
                    </Panel.BackLine>
                  </Panel.LittleTitle>
                )}
                {paymentMethodVal && isCheck && (
                  <Panel.LittleTitle title={titleBankAccount} hasPoint>
                    <BankAccount.BankCheckAccount payeeItem={payeeItem} />
                  </Panel.LittleTitle>
                )}
                <Panel.LittleTitle title={titleChequeRemark} hasPoint>
                  <Provider data={{ payeeItem }}>
                    <ChequeRemark />
                  </Provider>
                </Panel.LittleTitle>
              </Panel>
            );
          })}
          {!taskNotEditable && (
            <ButtonOfClaim
              handleClick={this.handleAdd}
              className={styles.AddPayee}
              buttonText={formatMessageApi({
                Label_BPM_Button: 'AddPayee',
              })}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ claimEditable, paymentAllocation, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeList: paymentAllocation.claimData.payeeList,
  validating: formCommonController.validating,
}))(React.memo(Payee, shallowEqual));
