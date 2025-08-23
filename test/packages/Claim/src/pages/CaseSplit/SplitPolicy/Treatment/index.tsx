import React, { Component } from 'react';
import { connect } from 'dva';
import memorizeOne from 'memoize-one';
import lodash from 'lodash';
import { fnTransTreatmentPayable } from 'claim/pages/CaseSplit/_models/functions';
import TreatmentItem from './TreatmentItem';
import type { ITreatmentPayable } from '@/dtos/claim';
import { withContextData } from '@/components/_store';

interface IProps {
  treatmentPayables: ITreatmentPayable[];
  treatmentListMap: any;
  policyNo: string;
  withData?: any;
}

const fnTransTreatmentPayableMemorized = memorizeOne(fnTransTreatmentPayable);

class TreatmentList extends Component<IProps> {
  render() {
    const { treatmentPayables, policyNo, withData } = this.props;

    const fnTransTreatmentPayable = fnTransTreatmentPayableMemorized(
      treatmentPayables,
      withData?.treatmentListMap
    );

    return (
      <div>
        {lodash.map(fnTransTreatmentPayable, (transTreatmentPayable, index: number) => {
          const { treatmentPayable, treatment } = transTreatmentPayable;
          return (
            <TreatmentItem
              key={`${treatmentPayable.id}-${index}`}
              treatment={treatment}
              treatmentPayable={treatmentPayable}
              policyNo={policyNo}
            />
            // <div key={`${treatmentPayable.id}-${index}`}>9494198496486</div>
          );
        })}
      </div>
    );
  }
}

export default connect(({ caseSplitController }: any, { withData }: any) => ({
  config: caseSplitController.config,
  treatmentListMap: withData?.treatmentListMap,
}))(withContextData(TreatmentList));
