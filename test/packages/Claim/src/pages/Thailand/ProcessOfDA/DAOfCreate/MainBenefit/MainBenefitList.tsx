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

@connect(({ daProcessController, formCommonController }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(daProcessController, 'claimProcessData.claimNo'),
  mainBenefitList: daProcessController.claimEntities.treatmentListMap[treatmentId]?.mainBenefitList,
  mainBenefitListMap: daProcessController.claimEntities.mainBenefitListMap,
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
      type: 'daProcessController/addMainBenefitItem',
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
      <div className={styles.mainBenefitCard}>
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
        <ButtonOfClaim
          handleClick={this.handleAdd}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'venus-claim-label-mainBenefit',
          })}
        />
      </div>
    );
  }
}

export default MainBenefitList;
