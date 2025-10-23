import React, { Component } from 'react';
import lodash from 'lodash';
import { Card, Table } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { defaultSystem } from 'navigator/utils';

@connect(({ workspaceCases }) => ({
  activityLogList: workspaceCases?.activityLogList,
  infoData: workspaceCases?.infoData || {},
}))
class CaseDeteailLogs extends Component {
  getColumns = (caseCategory: any) => {
    return [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.caseDetail.table-column.creation-time',
        }),
        name: 'startTime',
        dataIndex: 'startTime',
        render(text) {
          return moment(text).format('L LT');
        },
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.caseDetail.table-column.completed-time',
        }),
        name: 'completedTime',
        dataIndex: 'completedTime',
        render(text) {
          return text ? moment(text).format('L LT') : '---';
        },
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.activity-name',
        }),
        name: 'activityName',
        dataIndex: 'activityName',
        render: (text, item) =>
          formatMessageApi({ activity: item.taskDefKey, caseCategory }) || text,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.assignee',
        }),
        name: 'assignee',
        dataIndex: 'assignee',
        render: (text: any, item: any) =>
          lodash.get(item, 'assigneeName') || lodash.get(item, 'assignee') || defaultSystem(text),
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'assignBy',
        }),
        name: 'assignBy',
        dataIndex: 'assignBy',
        render: (text: any, item: any) =>
          lodash.get(item, 'assignByName') || lodash.get(item, 'assignBy') || defaultSystem(text),
      },
      {
        title: formatMessageApi({
          Label_COM_General: 'assignFrom',
        }),
        name: 'assignFrom',
        dataIndex: 'assignFrom',
        render: (text: any, item: any) =>
          lodash.get(item, 'assignFromName') ||
          lodash.get(item, 'assignFrom') ||
          defaultSystem(text),
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.caseDetail.table-column.meet-task-sla',
        }),
        name: 'sla',
        dataIndex: 'sla',
        render(text, item) {
          if (item.taskStatus?.toLowerCase?.() !== 'completed') {
            return '---';
          }

          return item?.sla > 100
            ? formatMessageApi({
                Label_BPM_Button: 'app.navigator.drawer.messager.button.no',
              })
            : formatMessageApi({
                Label_BPM_Button: 'app.navigator.drawer.messager.button.yes',
              });
        },
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.status',
        }),
        name: 'taskStatus',
        dataIndex: 'taskStatus',
        render: (text, record) => {
          if (record.inError) return 'inError';
          return formatMessageApi({ Label_BPM_TaskActivity: text }) || text;
        },
      },
    ];
  };

  fnOnRowClick = async (record: any) => {
    const { dispatch }: any = this.props;
    /**
     * 初始化用户操作状态
     */
    await dispatch({
      type: 'advancedQueryController/initStateOfSearch',
    });
    dispatch({
      type: 'advancedQueryController/initSearchObj',
    });
    // 动查定暂时不让点击
    if (
      lodash.includes(['JP_CA_ACT001', 'autoAssessment', 'CP_ACT002'], record?.taskDefKey) ||
      lodash.isEmpty(record?.assignee) ||
      record?.assignee === 'SYSTEM'
    ) {
      return;
    }
    dispatch({
      type: 'global/visitTaskDetail',
      payload: {
        taskId: record?.taskId,
        taskDefKey: record?.taskDefKey,
      },
    });
  };

  render() {
    const { activityLogList = [], infoData } = this.props;
    return (
      <Card style={{ marginTop: '24px' }} bordered={false}>
        <Table
          columns={this.getColumns(infoData?.caseCategory)}
          dataSource={activityLogList}
          rowKey="taskId"
          onRow={(record) => ({
            onClick: () => this.fnOnRowClick(record),
          })}
        />
      </Card>
    );
  }
}

export default CaseDeteailLogs;
