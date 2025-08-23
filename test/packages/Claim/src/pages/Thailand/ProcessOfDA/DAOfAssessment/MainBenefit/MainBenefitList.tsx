import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MAINBENEFITITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import MainBenefitItem from './MainBenefitItem';
import type { IMainBenefit } from '@/dtos/claim';
import styles from './MainBenefitList.less';
import { formUtils } from 'basic/components/Form';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  mainBenefitList: any;
  existMainBenefitItems: any;
  submited: any;
}

const mapStateToProps = (
  { daOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { treatmentId }: any
) => {
  const mainBenefitListMap = lodash.get(
    daOfClaimAssessmentController,
    'claimEntities.mainBenefitListMap'
  );
  const mainBenefitList = lodash.get(
    daOfClaimAssessmentController,
    `claimEntities.treatmentListMap.${treatmentId}.mainBenefitList`
  );
  const existMainBenefitItems = lodash
    .values(mainBenefitListMap)
    .filter((item: IMainBenefit) => lodash.compact(mainBenefitList).includes(item.id))
    .map((item) => formUtils.queryValue(item.mainBenefit));
  return {
    claimNo: lodash.get(daOfClaimAssessmentController, 'claimProcessData.claimNo'),
    mainBenefitList:
      daOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList,
    submited: formCommonController.submited,
    existMainBenefitItems,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};
@connect(mapStateToProps)
class MainBenefitList extends Component<IProps> {
  shouldComponentUpdate(nextProps: any) {
    const {
      mainBenefitList: nextMainBenefitList,
      submited: nextSubmited,
      existMainBenefitItems: nextExistMainBenefitItems,
    } = nextProps;
    const { mainBenefitList, submited, existMainBenefitItems } = this.props;

    return (
      !lodash.isEqual(nextMainBenefitList, mainBenefitList) ||
      !lodash.isEqual(nextSubmited, submited) ||
      !lodash.isEqual(nextExistMainBenefitItems, existMainBenefitItems)
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
      type: 'daOfClaimAssessmentController/addMainBenefitItem',
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
      existMainBenefitItems,
      submited,
      taskNotEditable,
    } = this.props;

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
