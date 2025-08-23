import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MAINBENEFITITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import MainBenefitItem from './MainBenefitItem';
import type { IMainBenefit } from '@/dtos/claim';
import styles from './MainBenefitList.less';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formUtils } from 'basic/components/Form';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  mainBenefitList: any;
  mainBenefitListMap: any;
  submited: any;
}

@connect(
  (
    { daOfClaimCaseController, formCommonController, claimEditable }: any,
    { treatmentId }: any
  ) => ({
    claimNo: lodash.get(daOfClaimCaseController, 'claimProcessData.claimNo'),
    mainBenefitList:
      daOfClaimCaseController.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList,
    mainBenefitListMap: daOfClaimCaseController.claimEntities.mainBenefitListMap,
    submited: formCommonController.submited,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class MainBenefitList extends Component<IProps> {
  shouldComponentUpdate(nextProps: any) {
    const { mainBenefitList: nextMainBenefitList, submited: nextSubmited } = nextProps;
    const { mainBenefitList, submited } = this.props;

    return (
      !lodash.isEqual(nextMainBenefitList, mainBenefitList) ||
      !lodash.isEqual(nextSubmited, submited)
    );
  }

  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const addMainBenefitItem = {
      ...MAINBENEFITITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'daOfClaimCaseController/addMainBenefitItem',
      payload: {
        treatmentId,
        addMainBenefitItem,
      },
    });
  };

  render() {
    const {
      mainBenefitList,
      treatmentId,
      mainBenefitListMap,
      submited,
      taskNotEditable,
    } = this.props;
    const existMainBenefitItems = lodash
      .values(mainBenefitListMap)
      .filter((item: IMainBenefit) => lodash.compact(mainBenefitList).includes(item.id))
      .map((item) => formUtils.queryValue(item.mainBenefit));

    const isShow = lodash.compact(mainBenefitList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.mainBenefitCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'venus-claim-label-mainBenefit',
              })}
            </h3>
            {submited && lodash.isEmpty(mainBenefitList) && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi(
                  { Label_COM_WarningMessage: 'ERR_000011' },
                  'Main Benefit'
                )}
              />
            )}
            {lodash.map(lodash.compact(mainBenefitList), (item: any) => (
              <MainBenefitItem
                treatmentId={treatmentId}
                existMainBenefitItems={existMainBenefitItems}
                mainBenefitId={item}
                key={item}
              />
            ))}
          </div>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'venus-claim-label-mainBenefit',
            })}
          />
        )}
      </div>
    );
  }
}

export default MainBenefitList;
