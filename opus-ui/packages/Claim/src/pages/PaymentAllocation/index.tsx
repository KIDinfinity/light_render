import React, { PureComponent, lazy, Suspense } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import { Modal, Spin, Icon, Button } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import bpm from 'bpm/pages/OWBEntrance';
import lodash from 'lodash';
import classsNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import DataLayout from '@/components/DataLayout';
import { Provider } from '@/components/_store';
import CommonModal from 'basic/components/CommonModal';
import Panel from './_components/Panel';
import styles from './styles.less';
import PHAllocation from './PH/index';
import BeneficiaryPop from './BeneficiaryPop';
import classnames from 'classnames';
// @ts-ignore
import { ReactComponent as backIcon } from 'bpm/assets/back.svg';
import { errorMessageModal } from '../utils/popModel';
import { requestHandleType } from 'bpm/enum';

interface IPaymentAllocation {
  modalOption?: ModalProps;
  opened?: boolean;
  userId?: string;
  dispatch?: Dispatch;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onError?: () => Promise<Record<string, string>[]>;
  onDataChannel?: Function;
  loading?: boolean;
  validating?: boolean;
  isShowConfirm?: any;
}
const PolicyBenefits = lazy(() => import('./BasicUI/PolicyBenefits'));
const Payee = lazy(() => import('./BasicUI/Payee'));

const PolicyBenefitsHK = lazy(() => import('./HK/PolicyBenefits'));
const PayeeHK = lazy(() => import('./HK/Payee'));

const PolicyBenefitsTH = lazy(() => import('./TH/PolicyBenefits'));
const PayeeTH = lazy(() => import('./TH/Payee'));

const PolicyBenefitsID = lazy(() => import('./ID/PolicyBenefits'));
const PayeeID = lazy(() => import('./ID/Payee'));

const PolicyBenefitsJP = lazy(() => import('./JP/PolicyBenefits'));
const PayeeJP = lazy(() => import('./JP/Payee'));

class PaymentAllocation extends PureComponent<IPaymentAllocation> {
  componentDidMount() {
    const { dispatch, onDataChannel } = this.props;
    // 获取select 下拉数据
    if (lodash.isFunction(dispatch)) {
      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: [
          'Gender',
          'Relationship',
          'Dropdown_POL_PolicyType',
          'Dropdown_POL_PayableType',
          'Dropdown_CLM_PayToType',
          'Dropdown_CLM_PayTo',
          'Dropdown_CLM_PaymentMethod',
          'Dropdown_CLM_PaymentMethod_General',
          'Dropdown_CLM_PaymentMethod_Reimbursement',
          'Dropdown_POL_IdentityType',
          'Dropdown_POL_ContactNoType',
          'Dropdown_CLM_SMS',
          'Dropdown_CLM_PaymentType',
          'Dropdown_CLM_TransferAccount',
          'Dropdown_POS_SrcBank_Check',
          'Dropdown_POS_SrcBank_Bank',
          'Dropdown_CLM_AccountType',
          'Dropdown_CFG_Currency',
          'Dropdown_CFG_AccountType',
          'Dropdown_PAY_RelationshipWithPayee',
          'Dropdown_CLM_PaymentMode',
          'Dropdown_CLM_BankType',
          'Dropdown_CLM_subPaymentMethod',
          'Label_CLM_printingDestination',
          'Dropdown_POS_SrcBank_Check',
        ],
      });
    }

    if (lodash.isFunction(onDataChannel)) {
      onDataChannel();
    }
  }

  handleCancel = async (e: any) => {
    const { dispatch, onCancel, onError } = this.props;
    if (lodash.isFunction(onError)) {
      const errorMessages = await onError();
      if (errorMessages?.length && errorMessages.length > 0) {
        await errorMessageModal(errorMessages, requestHandleType.break);
        return;
      }
    }
    if (lodash.isFunction(dispatch)) {
      dispatch({
        type: 'paymentAllocation/toggleModal',
        payload: { opened: false },
      });

      dispatch({
        type: 'paymentAllocation/updateErrors',
      });
    }

    if (lodash.isFunction(onCancel)) {
      setTimeout(() => {
        onCancel(e);
      });
    }
    bpm.buttonAction('save');
  };

  regionalDiversion = () => {
    return tenant.region({
      [Region.HK]: {
        PolicyBenefits: PolicyBenefitsHK,
        Payee: PayeeHK,
      },
      [Region.JP]: {
        PolicyBenefits: PolicyBenefitsJP,
        Payee: PayeeJP,
      },
      [Region.TH]: {
        PolicyBenefits: PolicyBenefitsTH,
        Payee: PayeeTH,
      },
      [Region.ID]: {
        PolicyBenefits: PolicyBenefitsID,
        Payee: PayeeID,
      },
      notMatch: { PolicyBenefits, Payee },
    });
  };

  onPHConfirm = async (e: any) => {
    const { dispatch, onCancel } = this.props;
    if (lodash.isFunction(dispatch)) {
      const errors = await dispatch({
        type: 'paymentAllocation/validateCertainTab',
        payload: { isSubmit: true },
      });

      if (errors?.length) {
        return;
      }

      dispatch({
        type: 'paymentAllocation/toggleModal',
        payload: { opened: false },
      });
    }

    if (typeof onCancel === 'function') {
      onCancel(e);
    }
  };

  render() {
    const { modalOption, opened, userId, loading, validating, dispatch, onCancel, isShowConfirm } =
      this.props;
    const { bodyStyle } = modalOption || {};

    const defBodyStyle = {
      height: `calc(80vh)`,
    };

    const defOptions = {
      returnAuth: true,
      onReturn: this.handleCancel,
      forceRender: true,
      closable: false,
      footer: null,
      width: '90%',
      zIndex: 999,
      className: styles.PaymentAllocation,
      bodyStyle: lodash.merge(defBodyStyle, bodyStyle),
    };

    if (tenant.isPH()) {
      const buttonList = [
        {
          label: 'venus_claim.button.confirm',
          iconType: 'check-circle',
          show: isShowConfirm,
          handler: this.onPHConfirm,
        },
        {
          label: 'return',
          icon: backIcon,
          show: true,
          handler: (e: any) => {
            if (typeof onCancel === 'function') {
              onCancel(e);
            }
          },
        },
      ];

      return (
        <>
          <Modal
            visible={opened}
            centered
            footer={null}
            className={classnames(styles.commonModal, styles.PaymentAllocation)}
            width={'70%'}
            closable={false}
            forceRender={true}
            zIndex={999}
            bodyStyle={lodash.merge(defBodyStyle, bodyStyle)}
          >
            <div className={styles.container}>
              <div className={styles.buttonGroup}>
                {lodash.map(buttonList, (buttonConfig: any) => {
                  return (
                    buttonConfig.show && (
                      <Button onClick={buttonConfig.handler} key={buttonConfig.label}>
                        <span>
                          {formatMessageApi({
                            [buttonConfig.typeCode || 'Label_BPM_Button']: buttonConfig.label,
                          })}
                        </span>
                        {buttonConfig.icon ? (
                          <Icon component={buttonConfig.icon} className={buttonConfig.className} />
                        ) : (
                          <Icon type={buttonConfig.iconType} />
                        )}
                      </Button>
                    )
                  );
                })}
              </div>
              <div className={styles.content}>
                <div className={styles.PHPaymentAllocationTitle}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'Payment Maintenance',
                  })}
                </div>
                <PHAllocation loading={loading || validating} />
              </div>
            </div>
          </Modal>
          <BeneficiaryPop />
        </>
      );
    }

    const title = formatMessageApi({
      Label_BIZ_Claim: 'PolicyBenefits',
    });

    const Component = this.regionalDiversion();

    return (
      <CommonModal {...defOptions} visible={opened}>
        <div className={styles.PaymentAllocationTitle}>
          {formatMessageApi({
            Label_BIZ_Claim: 'PayeeInfo',
          })}
        </div>
        {loading || validating ? (
          <Spin className={styles.Loading} />
        ) : (
          <Provider data={{ userId }}>
            <DataLayout span={12} rowProps={{ gutter: 12 }} style={{ height: 'calc(100% - 35px)' }}>
              <Panel
                title={title}
                className={styles.PolicyBenefits}
                styleContent={{ paddingBottom: 0 }}
              >
                <div className={classsNames(styles.scrollWrap, styles.PolicyBenefitsWrap)}>
                  <Suspense fallback={null}>
                    <Component.PolicyBenefits />
                  </Suspense>
                </div>
              </Panel>
              <Suspense fallback={null}>
                <Component.Payee />
              </Suspense>
            </DataLayout>
          </Provider>
        )}
      </CommonModal>
    );
  }
}
// reAllocations
export default connect(
  ({ paymentAllocation, user, loading, formCommonController, claimEditable }: any) => ({
    opened: paymentAllocation.opened,
    userId: lodash.get(user, 'currentUser.userId'),
    loading: loading.effects['paymentAllocation/reAllocations'],
    validating: formCommonController?.validating,
    isShowConfirm: !claimEditable.taskNotEditable,
  })
)(PaymentAllocation);
