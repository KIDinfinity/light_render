import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000064, VLD_000038 } from 'claim/pages/validators/sectionValidators';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { APPLICATION } from '../Utils/constant';
import ApplicationListItem from './ApplicationListItem';
import styles from './ApplicationList.less';

const mapStateToProps = ({
  JPCLMOfClaimRegistrationController,
  formCommonController,
  claimEditable,
}) => {
  const policyListMap = lodash.get(
    JPCLMOfClaimRegistrationController,
    'claimEntities.policyListMap'
  );
  const applicationListMap = lodash.get(
    JPCLMOfClaimRegistrationController,
    'claimEntities.applicationListMap'
  );
  const errors = VLD_000064(applicationListMap);
  const applicationListEntries = applicationListMap && Object.entries(applicationListMap);
  const existPolicyNoList = [];

  lodash.map(applicationListEntries, (item) => {
    existPolicyNoList.push({ policyNoArray: formUtils.queryValue(item[1].policyNoArray) });
  });

  const policyListEntries = policyListMap && Object.entries(policyListMap);
  const policyNoList = [];

  lodash.map(policyListEntries, (item) => {
    if (formUtils.queryValue(item[1].confirmed) === 1) {
      policyNoList.push({ policyNo: formUtils.queryValue(item[1].policyNo) });
    }
  });

  return {
    errors,
    policyNoList,
    existPolicyNoList,
    applicationList: lodash.get(
      JPCLMOfClaimRegistrationController,
      'claimProcessData.applicationList'
    ),
    claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
    submited: formCommonController.submited,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class ApplicationList extends Component {
  handleAdd = () => {
    const { dispatch, claimNo, applicationList = [] } = this.props;
    const applicationNo = (lodash.compact(applicationList).length + 1).toString().padStart(3, '0');
    const addApplicationItem = {
      ...APPLICATION,
      applicationNo,
      claimNo,
      id: uuidv4(),
    };

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addApplicationItem',
      payload: {
        addApplicationItem,
      },
    });
  };

  render() {
    const {
      applicationList,
      policyNoList,
      existPolicyNoList,
      errors,
      submited,
      taskNotEditable,
    } = this.props;
    const noIncludePolicyList = VLD_000038(policyNoList, existPolicyNoList);
    const policyNoString = noIncludePolicyList.join(',');

    return (
      <div className={styles.application}>
        <Card
          title={
            <>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.claim.apcrTitle',
              })}
              {(!!errors || (submited && !!noIncludePolicyList.length)) && (
                <ErrorTooltipManual
                  manualErrorMessage={
                    <>
                      {!!noIncludePolicyList.length && (
                        <p>
                          {formatMessageApi(
                            { Label_COM_WarningMessage: 'ERR_000061' },
                            policyNoString
                          )}
                        </p>
                      )}
                      {!!errors && (
                        <p>
                          {formatMessageApi({ Label_COM_WarningMessage: 'ERR_000114' }, errors)}
                        </p>
                      )}
                    </>
                  }
                />
              )}
            </>
          }
        >
          {lodash.map(lodash.compact(applicationList), (item, index) => (
            <ApplicationListItem
              policyNoList={policyNoList}
              applicationId={item}
              applicationNo={index + 1}
              key={item}
            />
          ))}
          {!taskNotEditable && (
            <div className={styles.buttonWrap}>
              <ButtonOfClaim
                handleClick={this.handleAdd}
                buttonText={formatMessageApi({
                  Label_BIZ_Claim: 'venus.claim.application-form',
                })}
                buttonStyle={{ height: '36px' }}
              />
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default ApplicationList;
