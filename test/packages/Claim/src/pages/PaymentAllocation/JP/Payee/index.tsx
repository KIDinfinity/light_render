import React, { PureComponent } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { VLD_000379 } from 'claim/pages/PaymentAllocation/_validators/fieldValidators';
import { Provider } from '@/components/_store';
import { SwitchEnum } from 'claim/pages/utils/claim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import Panel from '../../_components/Panel';
import Information from './Information';
import BankAccount from './BankAccount';
import Contact from './Contact';
import type { PayeeModal } from '../../_dto/Models';
import { EPaymentMethod, EHasBankAccount } from '../../_dto/Enums';
import { shallowEqual } from '../../_function';
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

    const titleContact = formatMessageApi({
      Label_BIZ_Policy: 'ContactInfo',
    });

    const titleBankAccount = formatMessageApi({
      Label_BIZ_Claim: 'BankAccount',
    });

    const hasBankAccount = lodash.values(EHasBankAccount);

    return (
      <div className={styles.PayeeList}>
        <div className={styles.scrollWrap}>
          {lodash.map(payeeList, (payeeItem: PayeeModal, index: number) => {
            const paymentMethodVal = formUtils.queryValue(payeeItem.paymentMethod);
            const isCheck = paymentMethodVal === EPaymentMethod.ByCheck;
            const isBankAccount = hasBankAccount.includes(paymentMethodVal);
            const isPrem = paymentMethodVal === EPaymentMethod.PremiumAccount;

            const VLD000379Error = VLD_000379(payeeItem);
            const manualAdd =
              lodash.isString(payeeItem?.manualAdd) && payeeItem?.manualAdd === SwitchEnum.YES;
            const payeeBankAccounts = lodash
              .chain(payeeItem.payeeBankAccountList)
              .compact()
              .value();

            return (
              <Panel
                className={styles.PayeeItem}
                title={`${title} ${index + 1}`}
                onClose={() => this.handleClose(payeeItem?.id)}
                closable={!taskNotEditable && manualAdd}
                key={`${payeeItem.id}-${index}`}
              >
                <Information payeeItem={payeeItem} />
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
                        {!taskNotEditable && VLD000379Error && !isPrem && (
                          <ErrorTooltipManual
                            className="chequeRemarkErrorIcon"
                            manualErrorMessage={VLD000379Error}
                          />
                        )}
                      </>
                    }
                    hasPoint
                  >
                    {((isPrem && !lodash.isEmpty(payeeBankAccounts)) || !isPrem) && (
                      <Panel.BackLine>
                        <Provider data={{ payeeItem }}>
                          <BankAccount
                            payeeBankAccountList={payeeBankAccounts}
                            paymentMethod={paymentMethodVal}
                            payeeId={payeeItem.id}
                          />
                        </Provider>
                      </Panel.BackLine>
                    )}
                  </Panel.LittleTitle>
                )}
                {paymentMethodVal && isCheck && (
                  <Panel.LittleTitle title={titleBankAccount} hasPoint>
                    <BankAccount.BankCheckAccount payeeItem={payeeItem} />
                  </Panel.LittleTitle>
                )}
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
