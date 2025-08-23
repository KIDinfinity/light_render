import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import classNames from './index.less';
import CountModel from './CountModel';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  remainingVisitsPerDay: lodash.get(treatmentCalculationDetail, 'remainingVisitsPerDay', 0),
  remainingVisitsPerDisability: lodash.get(
    treatmentCalculationDetail,
    'remainingVisitsPerDisability',
    0
  ),
  remainingVisitsPerPolicyYear: lodash.get(
    treatmentCalculationDetail,
    'remainingVisitsPerPolicyYear',
    0
  ),
  remainingVisits: lodash.get(treatmentCalculationDetail, 'remainingVisits', 0),
  resultType:
    parseInt(lodash.get(treatmentCalculationDetail, 'remainingVisits', 0), 10) === 0
      ? 'error'
      : 'success',
}))
class OutPatientHeader extends React.Component {
  render() {
    const {
      calculationType,
      remainingVisitsPerDay,
      remainingVisitsPerDisability,
      remainingVisitsPerPolicyYear,
      remainingVisits,
      resultType,
    } = this.props;

    return (
      <div className={classnames(classNames.headerContainer, classNames.outPatientHeader)}>
        <div className={classnames(classNames.calculationBox)}>
          <span className={classnames(classNames.calculationType)}>{calculationType}</span>
          <div className={classnames(classNames.elements)}>
            <CountModel
              amount={remainingVisitsPerDay}
              title="Remaining Visits / Day"
              name="Remaining_Visits_Day"
            />
            <CountModel
              amount={remainingVisitsPerDisability}
              title="Remaining Visits / Disability"
              name="Remaining_Visits_Disability"
            />
            <CountModel
              amount={remainingVisitsPerPolicyYear}
              title="Remaining Visits / Policy Year"
              name="Remaining_Visits_Policy_Year"
            />
          </div>
          <span className={classNames.computation}>=</span>
          <div className={classnames(classNames.result, classNames[resultType])}>
            <span className={classNames.result}>{remainingVisits}</span>
          </div>
        </div>
      </div>
    );
  }
}

OutPatientHeader.propsType = {
  calculationType: Proptypes.stirng,
};
OutPatientHeader.defaultProps = {
  calculationType: 'MIN',
};
export default OutPatientHeader;
