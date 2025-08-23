import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import lodash, { every, get, some, filter, includes, compact } from 'lodash';
import { Card, Button, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { withContextData } from '@/components/_store';
import Treatment from '../Treatment';
import IncidentInfo from './IncidentInfo';
import type { IIncident, ITreatment } from '@/dtos/claim';
import type { ISeriesNoObject } from '../../_models/dto';
import { ReactComponent as IconMove } from '../../_static/move.svg';
import { ReactComponent as IconReverse } from '../../_static/reverse.svg';

import styles from '../../caseSplit.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incident: IIncident;
  originIncidentList: string[];
  targetIncidentList: string[];
  seriesNoData: ISeriesNoObject;
  incidentNo: number;
  baseClaimTypeArray: any[];
  treatmentList: ITreatment[];
  config: any;
  withData?: any;
  id: string;
  splitByIncidentIds: string[];
}

interface IState {}

class Incident extends Component<IProps, IState> {
  componentDidMount() {
    const {
      config,
      dispatch,
      withData,
      incident: { id },
    } = this.props;
    const {
      incident: { incident: incidentConfig, treatment: treatmentConfig },
    } = config;

    // if (
    //   !get(incidentConfig, 'isOption') ||
    //   (get(incidentConfig, 'isOption') && !get(treatmentConfig, 'isOption'))
    // ) {
    //   if (withData?.isOrigin) {
    //     dispatch({
    //       type: 'caseSplitIncidentController/selectOriginIncident',
    //       payload: { id, checked: true },
    //     });
    //   } else {
    //     dispatch({
    //       type: 'caseSplitIncidentController/selectTargetIncident',
    //       payload: { id, checked: true },
    //     });
    //   }
    // }
  }

  fnSelectIncident = (e: any, id: string) => {
    const {
      target: { checked },
    } = e;
    const { dispatch, withData } = this.props;
    if (withData?.isOrigin) {
      dispatch({
        type: 'caseSplitIncidentController/selectOriginIncident',
        payload: { id, checked },
      });
    } else {
      dispatch({
        type: 'caseSplitIncidentController/selectTargetIncident',
        payload: { id, checked },
      });
    }
  };

  fnMove = async () => {
    const {
      dispatch,
      treatmentList = [],
      incident: { id },
      originIncidentList,
      targetIncidentList,
    } = this.props;

    if (lodash.isEmpty(treatmentList)) {
      await dispatch({
        type: 'caseSplitIncidentController/addTargetClaimIncident',
        payload: {
          id,
        },
      });

      return;
    }

    if (every(treatmentList, (item) => !item.selected) && lodash.size(targetIncidentList) === 0) {
      await dispatch({
        type: 'caseSplitIncidentController/addTargetClaimDataByIncident',
        payload: {
          id,
        },
      });
      return;
    }

    if (compact(treatmentList).length > 0 && every(treatmentList, (item) => !item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus.claim.select-move-item-necessary',
        }),
      });
      return;
    }

    if (originIncidentList.length === 1 && every(treatmentList, (item) => item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'ERR_000133',
        }),
      });
      return;
    }

    await dispatch({
      type: 'caseSplitIncidentController/addTargetClaimData',
      payload: {
        id,
      },
    });
    await dispatch({
      type: 'caseSplitIncidentController/deleteOriginClaimData',
      payload: {
        id,
      },
    });
  };

  fnReverse = async () => {
    const {
      dispatch,
      treatmentList,
      incident: { id },
      splitByIncidentIds,
    } = this.props;

    if (lodash.isEmpty(treatmentList)) {
      await dispatch({
        type: 'caseSplitIncidentController/deleteTargetClaimIncident',
        payload: {
          id,
        },
      });

      return;
    }

    if (lodash.includes(splitByIncidentIds, id)) {
      await dispatch({
        type: 'caseSplitIncidentController/deleteTargetClaimDataByIncident',
        payload: {
          id,
        },
      });
      return;
    }
    if (compact(treatmentList).length > 0 && every(treatmentList, (item) => !item.selected)) {
      notification.warning({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus.claim.select-reverse-item-necessary',
        }),
      });
      return;
    }
    await dispatch({
      type: 'caseSplitIncidentController/addOriginClaimData',
      payload: {
        id,
      },
    });
    await dispatch({
      type: 'caseSplitIncidentController/deleteTargetClaimData',
      payload: {
        id,
      },
    });
  };

  get renderCardTitle() {
    const { config, incident = {}, treatmentList }: any = this.props;
    const selectAll = every(treatmentList, (item) => item.selected);
    const selectParts = some(treatmentList, (item) => item.selected);

    const {
      incident: { incident: incidentConfig, treatment: treatmentConfig },
    } = config;

    let checked;
    let indeterminate;
    if (get(incidentConfig, 'isOption') && !get(treatmentConfig, 'isOption')) {
      checked = true;
      indeterminate = false;
    } else {
      checked = selectAll;
      indeterminate = selectAll ? false : selectParts;
    }

    return (
      <div>
        <span>
          {`${formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
          })} No. ${incident.incidentNo}`}
        </span>
      </div>
    );
  }

  get renderExtraManual() {
    const { withData, config } = this.props;
    const {
      incident: { incident: incidentConfig, treatment: treatmentConfig },
    } = config;
    return withData?.isOrigin
      ? [
          // <Button key="copy" size="small" shape="circle" onClick={this.fnCopy}>
          //   <IconCopy className="icon_split icon_copy" />
          // </Button>,
          (get(incidentConfig, 'isOption') || get(treatmentConfig, 'isOption')) && (
            <Button key="move" size="small" shape="circle" onClick={this.fnMove}>
              <IconMove className="icon_split icon_move" transform="rotate(-90)" />
            </Button>
          ),
        ]
      : [
          <Button key="reverse" size="small" shape="circle" onClick={this.fnReverse}>
            <IconReverse className="icon_split icon_reverse" />
          </Button>,
        ];
  }

  render() {
    const { incident, incidentNo, seriesNoData }: any = this.props;

    return (
      <div className={styles.split_card}>
        <Card title={this.renderCardTitle} bordered={false} extra={this.renderExtraManual}>
          <IncidentInfo incident={incident} />
          <Treatment
            seriesNoData={seriesNoData}
            incidentNo={incidentNo}
            treatmentList={incident.treatmentList}
          />
        </Card>
      </div>
    );
  }
}

export default withContextData(
  connect(({ caseSplitController, caseSplitIncidentController }: any, { withData, id }: any) => {
    const incident = withData?.incidentListMap[id];
    const treatmentListMap = withData?.treatmentListMap;
    // console.log(withData, 'withData')
    return {
      caseSplitIncidentController,
      incident,
      config: caseSplitController.config,
      originIncidentList: caseSplitIncidentController.originClaimProcessData.incidentList,
      targetIncidentList: caseSplitIncidentController.targetClaimProcessData.incidentList,
      treatmentList: filter(treatmentListMap, (item) => includes(incident.treatmentList, item.id)),
      splitByIncidentIds: caseSplitIncidentController.splitByIncidentIds,
    };
  })(Incident)
);
