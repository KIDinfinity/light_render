import React, { PureComponent } from 'react';
import lodash, { isArray, isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TreatmentItem from './TreatmentItem';
import type { ISeriesNoObject } from '../../_models/dto';
import styles from './treatment.less';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

interface IProps {
  seriesNoData: ISeriesNoObject;
  incidentNo: number;
  treatmentList: string[];
  dispatch: Dispatch<any>;
}

class Treatment extends PureComponent<IProps> {
  treatmentList = [];

  componentDidMount() {
    this.updateSeriesNoData();
  }

  componentDidUpdate() {
    this.updateSeriesNoData();
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    return !lodash.isEqual(nextProps.seriesNoData, this.props.seriesNoData);
  }

  updateSeriesNoData = () => {
    const { seriesNoData, incidentNo, dispatch } = this.props;
    const newSeriesNoData = lodash.cloneDeep(seriesNoData);
    newSeriesNoData.incidentList[incidentNo - 1].treatmentList = this.treatmentList;
    dispatch({
      type: 'caseSplitIncidentController/saveSeriesNoOriginData',
      payload: {
        seriesNoOrigin: newSeriesNoData,
      },
    });
  };

  render() {
    const { incidentNo, treatmentList = [] } = this.props;
    if (!isArray(this.treatmentList) || !isEmpty(this.treatmentList)) {
      this.treatmentList = [];
    }
    return (
      <div className={styles.streatment_list}>
        <div className={styles.streatment_title}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.taskDetail.splitCase.treatment-information',
          })}
        </div>
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

export default connect(() => ({}))(Treatment);
