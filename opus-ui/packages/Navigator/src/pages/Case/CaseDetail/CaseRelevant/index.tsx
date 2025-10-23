import React from 'react';
import { connect } from 'dva';
import { history, useParams } from 'umi';
import urlParse from 'url-parse';
import queryString from 'query-string';
import lodash from 'lodash';
import { Card, Select, Table, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getColumns from '../CaseRelevantColumns';
import styles from './index.less';

const { Option } = Select;
const PAGESIZE = 5;

@connect(({ loading, workspaceCases, configController }) => ({
  loading: loading.effects['workspaceCases/getCaseRelationship'],
  caseRelationship: workspaceCases.caseRelationship,
  configuration: configController.configuration,
  infoData: workspaceCases?.infoData || {},
}))
class CaseRelevant extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      pageSize: PAGESIZE,
      currentPage: 1,
      params: {
        procInstId: props?.match?.params?.id,
      },
      sortName: null,
      sortOrder: null,
    };
  }

  componentDidMount = () => {
    this.getCaseRelationship(this.state);
  };

  shouldComponentUpdate(nextProps: any) {
    const {
      caseRelationship: nextCaseRelationship,
      loading: nextLoading,
      configuration: nextConfiguration,
      processInstanceId: nextProcessInstanceId,
    } = nextProps;
    const { caseRelationship, loading, configuration, processInstanceId }: any = this.props;
    if (!lodash.isEqual(nextProcessInstanceId, processInstanceId)) {
      this.setState({
        params: {
          procInstId: nextProcessInstanceId,
        },
      });
      this.getCaseRelationship({
        ...this.state,
        params: {
          ...this.state.params,
          procInstId: nextProcessInstanceId,
        },
      });
    }
    return (
      !lodash.isEqual(nextCaseRelationship, caseRelationship) ||
      !lodash.isEqual(nextLoading, loading) ||
      !lodash.isEqual(nextConfiguration, configuration)
    );
  }

  getCaseRelationship = (params: any) => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'workspaceCases/getCaseRelationship',
      payload: params,
    });
  };

  handleChange = (value: any) => {
    this.setState((preState) => {
      const nParams = {
        ...preState,
        params: {
          ...preState.params,
          relationship: value === 'All' ? '' : value,
        },
      };
      this.getCaseRelationship(nParams);
      return nParams;
    });
  };

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let sortOrder = null;
    if (sorter?.order === 'descend') {
      sortOrder = 'desc';
    } else if (sorter?.order === 'ascend') {
      sortOrder = 'asc';
    }

    const { params }: any = this.state;
    const nParams = {
      params: {
        ...filters,
        ...params,
      },
      currentPage: pagination?.current,
      pageSize: pagination?.pageSize,
      total: pagination?.total,
      sortName: sortOrder ? sorter?.field : null,
      sortOrder,
    };

    this.setState({
      ...nParams,
    });
    this.getCaseRelationship(nParams);
  };

  itemRender = (current: any, type: any, originalElement: any) => {
    if (type === 'prev') {
      return (
        <Button>
          {formatMessageApi({
            Label_BPM_Button: 'component.button.back',
          })}
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button>
          {formatMessageApi({
            Label_BPM_Button: 'component.button.next',
          })}
        </Button>
      );
    }

    return originalElement;
  };

  fnOnRowClick = async (record: any) => {
    if (record?.targetPage && lodash.isString(record?.targetPage)) {
      const { dispatch }: any = this.props;
      const locationObj = urlParse(record.targetPage);
      const isInquiry = locationObj.pathname === '/navigator/advancedquery';
      const query = queryString.parse(locationObj.query);
      const routerObj = {
        pathname: locationObj.pathname,
      };
      if (isInquiry) {
        query.saveStateOfSearch = true;
        routerObj.state = query;
      } else {
        routerObj.query = query;
      }
      /**
       * 初始化用户操作状态
       */
      await dispatch({
        type: 'advancedQueryController/initStateOfSearch',
      });
      dispatch({
        type: 'advancedQueryController/initSearchObj',
      });
      history.push(routerObj);
    }
  };

  render() {
    const { caseRelationship, loading, configuration, infoData }: any = this.props;

    const { relationship } = caseRelationship?.params || {};

    return (
      <div className={styles.case_relevant}>
        <Card>
          <div className="relevant_select">
            <Select
              placeholder={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.caseDetail.relationship-filter',
              })}
              style={{ width: 200 }}
              onChange={this.handleChange}
            >
              <Option key="All">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.all',
                })}
              </Option>
              {Array.isArray(relationship) &&
                lodash.map(relationship, (item, index) => (
                  <Option key={item + index} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="relevant_table">
            <Table
              className={styles.relationship_table}
              id="relationship_table"
              rowKey="taskId"
              loading={loading}
              pagination={{
                current: caseRelationship?.currentPage || 1,
                pageSize: PAGESIZE,
                total: caseRelationship?.total,
                itemRender: this.itemRender,
              }}
              onChange={this.handleTableChange}
              columns={getColumns(configuration, infoData?.caseCategory)}
              dataSource={caseRelationship?.rows}
              onRow={(record) => ({
                onClick: () => this.fnOnRowClick(record),
              })}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default (props) => {
  const params = useParams();
  return <CaseRelevant {...props} match={{params}}/>;
};
