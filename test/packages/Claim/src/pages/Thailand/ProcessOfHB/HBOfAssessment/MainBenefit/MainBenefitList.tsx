import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MAINBENEFITITEM } from '@/utils/claimConstant';
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
  mainBenefitListMap: any;
  submited: any;
}

@connect(({ hbOfClaimAssessmentController, formCommonController }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.claimNo'),
  mainBenefitList:
    hbOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].mainBenefitList,
  mainBenefitListMap: hbOfClaimAssessmentController.claimEntities.mainBenefitListMap,
  submited: formCommonController.submited,
}))
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
      type: 'hbOfClaimAssessmentController/addMainBenefitItem',
      payload: {
        treatmentId,
        addMainBenefitItem,
      },
    });
  };

  render() {
    const { mainBenefitList, treatmentId, mainBenefitListMap, submited } = this.props;
    const existMainBenefitItems = lodash
      .values(mainBenefitListMap)
      .filter((item: IMainBenefit) => lodash.compact(mainBenefitList).includes(item.id))
      .map((item) => formUtils.queryValue(item.mainBenefit));

    return (
      <div className={lodash.isEmpty(mainBenefitList) ? '' : styles.mainBenefitCard}>
        <div>
          {!lodash.isEmpty(mainBenefitList) && (
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'venus-claim-label-mainBenefit',
              })}
            </h3>
          )}
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
      </div>
    );
  }
}

export default MainBenefitList;
