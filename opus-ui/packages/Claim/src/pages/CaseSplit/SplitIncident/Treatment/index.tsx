import React, { PureComponent } from 'react';
import lodash, { isArray, isEmpty } from 'lodash';
import TreatmentItem from './TreatmentItem';
import type { ISeriesNoObject } from '../../_models/dto';
import styles from './treatment.less';

interface IProps {
  seriesNoData: ISeriesNoObject;
  incidentNo: number;
  treatmentList: string[];
}

class Treatment extends PureComponent<IProps> {
  treatmentList = [];

  // componentDidMount() {
  //   this.updateSeriesNoData();
  // }

  // componentDidUpdate() {
  //   // this.updateSeriesNoData();
  // }

  // updateSeriesNoData = () => {
  //   // const { seriesNoData, incidentNo } = this.props;
  //   // seriesNoData.incidentList[incidentNo - 1].treatmentList = this.treatmentList;
  // };

  render() {
    const { incidentNo, treatmentList = [] } = this.props;
    if (!isArray(this.treatmentList) || !isEmpty(this.treatmentList)) {
      this.treatmentList = [];
    }
    return (
      <div className={styles.streatment_list}>
        <div className="treatment_list">
          {lodash.map(lodash.compact(treatmentList), (treatmentId: string, index: number) => {
            this.treatmentList.push({
              // @ts-ignore
              incidentNo,
              // @ts-ignore
              treatmentNo: index + 1,
            });
            return (
              <TreatmentItem
                treatmentNo={index + 1}
                key={`${treatmentId}-${index}`}
                id={treatmentId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Treatment;
