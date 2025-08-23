import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import DataLayout from '@/components/DataLayout';
import CaseInfoItem from './CaseInfoItem';
import type { CaseInfoModal } from '../_dto/Models';
import { getAppealRelateCaseList } from '../_functions/getAppealRelateCaseList';
import styles from './styles.less';

interface IProps {
  caseInformations: CaseInfoModal[];
  hasInquiryClaimNo?: boolean;
}
class CaseInformation extends PureComponent<IProps> {
  componentDidUpdate() {
    const { appealRelateCase, claimAppealInfo, selectedCase, dispatch } = this.props;
    const appealRelateCaseList = getAppealRelateCaseList(appealRelateCase, claimAppealInfo);
    if (
      !lodash.some(appealRelateCaseList, (item) => item?.caseNo === selectedCase) &&
      selectedCase
    ) {
      dispatch({ type: 'MaAppealCaseController/saveSelectedCase', payload: null });
      dispatch({ type: 'MaAppealCaseController/saveClaimAppealOriginalCase', payload: {} });
    }
  }

  get appealRelateCaseList() {
    const { appealRelateCase, claimAppealInfo } = this.props;
    return getAppealRelateCaseList(appealRelateCase, claimAppealInfo);
  }

  handleClick = (item) => {
    const { dispatch, hasInquiryClaimNo } = this.props;
    if (hasInquiryClaimNo) return;
    dispatch({ type: 'MaAppealCaseController/saveSelectedCase', payload: item?.caseNo });
    dispatch({ type: 'MaAppealCaseController/copyOriginalCase', payload: item });
    dispatch({
      type: 'MaAppealCaseController/saveClaimAppealInfo',
      payload: {
        changedFields: {
          claimType: lodash.chain(item.claimType).split(',').compact().value(),
          originalCaseCategory: item.originalCaseCategory,
        },
      },
    });
  };

  render() {
    const { selectedCase, hasInquiryClaimNo } = this.props;
    return (
      <DataLayout className={styles.caseInformation} rowProps={{ justify: 'start' }} span={6}>
        {lodash.map(this.appealRelateCaseList, (item: CaseInfoModal) => (
          <CaseInfoItem
            caseItem={item}
            onClick={this.handleClick}
            selected={selectedCase === item.caseNo || hasInquiryClaimNo}
            key={item.caseNo}
          />
        ))}
      </DataLayout>
    );
  }
}

export default connect(({ MaAppealCaseController, claimEditable }: any) => ({
  appealRelateCase: MaAppealCaseController?.appealRelateCase,
  claimAppealInfo: MaAppealCaseController?.claimAppealInfo,
  selectedCase: MaAppealCaseController?.selectedCase,
  taskNotEditable: claimEditable.taskNotEditable,
}))(CaseInformation);
