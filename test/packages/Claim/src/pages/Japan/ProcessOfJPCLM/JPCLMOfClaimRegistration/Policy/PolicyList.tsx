/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal from '@/utils/commonMessage';
import { VLD_000039 } from 'claim/pages/validators/sectionValidators';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import bpm from 'bpm/pages/OWBEntrance';
import { POLICY } from '../Utils/constant';
import PolicyListItem from './PolicyListItem';
import styles from './PolicyList.less';

const mapStateToProps = ({ JPCLMOfClaimRegistrationController, claimEditable }) => {
  const policyListMap = lodash.get(
    JPCLMOfClaimRegistrationController,
    'claimEntities.policyListMap'
  );
  const policyListEntries = policyListMap && Object.entries(policyListMap);
  const policyNoArray = [];

  let isPolicyRegistration = false; // 该当按钮是否可点击
  let policyCheckoutAmount = 0; // 保单该当的数量
  let policyNoCheckoutAmount = 0; // 保单非该当的数量
  lodash.map(policyListEntries, (item) => {
    policyNoArray.push(formUtils.queryValue(item[1].policyNo));
    if (formUtils.queryValue(item[1].confirmed) === 1) {
      isPolicyRegistration = true;
      policyCheckoutAmount += 1;
    } else {
      policyNoCheckoutAmount += 1;
    }
  });

  return {
    policyCheckoutAmount,
    policyNoCheckoutAmount,
    policyNoArray,
    isPolicyRegistration,
    claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
    parentClaimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.parentClaimNo'),
    policyList: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.policyList'),
    caseCategory: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.caseCategory'),
    insuredId: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.insured.insuredId'),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class PolicyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowWarnMsg: false,
    };
  }

  handleAdd = () => {
    const { dispatch, claimNo } = this.props;
    const addPolicyItem = {
      ...POLICY,
      claimNo,
      id: uuidv4(),
    };

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addPolicyItem',
      payload: {
        addPolicyItem,
      },
    });
  };

  handleIncidentRegistration = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'formCommonController/handleSubmited',
    });
    const errors = await dispatch({
      type: 'JPCLMOfClaimRegistrationController/validateFields',
    });

    if (!errors.length) {
      this.setState({
        isShowWarnMsg: true,
      });
    }
  };

  handleWarnMsgClose = () => {
    this.setState({
      isShowWarnMsg: false,
    });
  };

  handleModalDetailText = () => {
    const { policyCheckoutAmount, policyNoCheckoutAmount } = this.props;
    let policyCheckoutTip = '';
    if (policyNoCheckoutAmount) {
      policyCheckoutTip = formatMessageApi(
        { message: 'WRN_000002' },
        policyCheckoutAmount,
        policyNoCheckoutAmount,
        policyCheckoutAmount
      );
    } else {
      policyCheckoutTip = formatMessageApi({ Label_COM_WarningMessage: 'WRN_000001' });
    }
    return policyCheckoutTip;
  };

  handleWarnMsgConfirm = async () => {
    const { dispatch } = this.props;
    const response = await dispatch({
      type: 'JPCLMOfClaimRegistrationController/queryApplicationList',
    });
    this.setState({
      isShowWarnMsg: false,
    });
    bpm.reload();
    if (!response.success) {
      handleMessageModal(response.promptMessages);
    }
  };

  render() {
    const {
      policyList,
      isPolicyRegistration,
      parentClaimNo,
      policyNoArray,
      caseCategory,
      taskNotEditable,
      insuredId,
    } = this.props;
    const { isShowWarnMsg } = this.state;

    const VLD000039Errors = VLD_000039(policyList);
    // const duplicateList = VLD_000071(policyNoArray);
    // const duplicateString = duplicateList.join(',');

    return (
      <div className={styles.policy}>
        <Card
          title={
            <>
              {formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.title.policy-information',
              })}
              {caseCategory && VLD000039Errors && (
                <ErrorTooltipManual manualErrorMessage={VLD000039Errors} />
              )}
              {/* {!!duplicateList.length && (
                <ErrorTooltipManual
                  manualErrorMessage={formatMessageApi(
                    {
                      message: 'ERR_000064',
                    },
                    duplicateString
                  )}
                />
              )} */}
            </>
          }
        >
          {lodash.map(lodash.compact(policyList), (item) => (
            <PolicyListItem
              policyId={item}
              key={item}
              parentClaimNo={parentClaimNo}
              policyNoArray={policyNoArray}
            />
          ))}
          {!taskNotEditable && !parentClaimNo && (
            <div className={styles.buttonWrap}>
              <ButtonOfClaim
                handleClick={this.handleAdd}
                disabled={!insuredId}
                buttonText={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
                })}
                buttonStyle={{ height: '36px' }}
              />
            </div>
          )}
          {!taskNotEditable && !parentClaimNo && (
            <div className={styles.listButton}>
              <Button
                type="primary"
                disabled={!isPolicyRegistration}
                onClick={this.handleIncidentRegistration}
              >
                {formatMessageApi({
                  Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.accept',
                })}
              </Button>
            </div>
          )}
        </Card>
        <ModalWarnMessage
          visible={isShowWarnMsg}
          onCancel={this.handleWarnMsgClose}
          onOk={this.handleWarnMsgConfirm}
          labelId="app.navigator.task-detail-policy-information-warn.msg.title"
          modalDetailText={this.handleModalDetailText()}
        />
      </div>
    );
  }
}

export default PolicyList;
