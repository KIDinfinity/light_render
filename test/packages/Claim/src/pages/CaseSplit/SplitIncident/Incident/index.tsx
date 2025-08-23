import React, { PureComponent } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import IncidentItem from './IncidentItem';
import type { ISeriesNoObject } from '../../_models/dto';

interface IProps {
  seriesNoData: ISeriesNoObject;
  incidentList: string[];
  className: string;
}

class IncidentList extends PureComponent<IProps> {
  render() {
    const { incidentList, seriesNoData, className } = this.props;
    if (!lodash.isArray(seriesNoData.incidentList) || !lodash.isEmpty(seriesNoData.incidentList)) {
      seriesNoData.incidentList = [];
    }

    return (
      <div className={classNames('split_list', className)}>
        {lodash.map(lodash.compact(incidentList), (incident, index) => {
          seriesNoData.incidentList.push({
            incidentNo: index + 1,
            treatmentList: [],
          });

          return (
            <IncidentItem
              key={`${incident}`}
              id={incident}
              seriesNoData={seriesNoData}
              incidentNo={index + 1}
            />
          );
        })}
      </div>
    );
  }
}

export default IncidentList;
