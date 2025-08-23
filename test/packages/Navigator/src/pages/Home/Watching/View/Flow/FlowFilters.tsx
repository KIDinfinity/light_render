import React, { Component } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { Form, Select, TreeSelect, Spin } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltip from '@/components/ErrorTooltip';
import { Hotkey } from '@/components/Hotkey/home';
import { formUtils } from 'basic/components/Form';
import flowFilterDark from 'navigator/assets/flow-filter-dark.svg';
import lodash from 'lodash';
import styles from './FlowFilters.less';
import { px2rem } from '@/utils/responsiveUtils';

let filterChangeAbort = new AbortController();

interface IComponentProps {
  form?: any;
  dispatch?: any;
  filters?: any;
  assigneeList?: any;
  userOrganization?: any;
}

@connect(({ loading, homeTaskFlowFilter, homeTaskFlow, workspaceUser, theme, user }: any) => ({
  userId: lodash.get(user, 'currentUser.userId'),
  filters: homeTaskFlowFilter.filters,
  assigneeList: homeTaskFlowFilter.assigneeList,
  userOrganization: workspaceUser.userOrganization,
  activeTheme: theme.activeTheme,
  multiple: homeTaskFlow.flowData.length > 1,
  loading:
    loading.effects['homeTaskFlowFilter/filterInit'] ||
    loading.effects['homeTaskFlow/fetchFlowData'],
}))
@Form.create({
  onValuesChange(props, changeValues) {
    filterChangeAbort.abort();
    filterChangeAbort = new AbortController();
    const { dispatch } = props;

    dispatch({
      type: 'homeTaskFlowFilter/filterChange',
      payload: {
        changeValues,
      },
      signal: filterChangeAbort.signal,
    });
  },
  mapPropsToFields(props) {
    const { filters } = props;
    if (lodash.isString(filters?.group)) {
      return formUtils.mapObjectToFields({
        ...filters,
        group: [filters.group]
      })
    }
    return formUtils.mapObjectToFields(filters);
  },
})
class TaskFlowFilters extends Component<IComponentProps> {
  abortController = new AbortController();

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'workspaceUser/getUserOrganization',
      payload: {},
      signal: this.abortController.signal,
    });
  };

  componentWillUnmount = () => {
    this.abortController.abort();
    filterChangeAbort.abort();
  };

  render() {
    const { form, assigneeList, userOrganization, loading, activeTheme, userId, multiple } =
      this.props;

    const errorToolTipStyle = {
      fontSize: px2rem(20),
      color: '#fff',
    };

    const flowFilter = (
      // activeTheme === 'dark' ? (
      <img src={flowFilterDark} className={styles.flowFilterPng} alt="" />
    );
    // ) : (
    // <img src={flowFilterLight} className={styles.flowFilterPng} alt="" />
    // );

    return (
      <div
        className={classNames(styles.filtersPosition, {
          [styles.paddingLeft]: !multiple,
        })}
      >
        <div className={styles.filtersBg}>
          <div className={styles.filterItem}>
            {lodash.startCase(
              lodash.toLower(
                formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.index.mode.flow.advanced-search',
                })
              )
            )}
          </div>
          <div className={styles.filterItem}>
            <Hotkey id="group" />
            <Form layout="horizontal" hideRequiredMark>
              <Form.Item
                label={
                  <ErrorTooltip
                    style={errorToolTipStyle}
                    form={form}
                    formName="group"
                    title={formatMessageApi({
                      Label_COM_General: 'OrganizationName',
                    })}
                  />
                }
              >
                {form.getFieldDecorator('group')(
                  // <Cascader
                  //   changeOnSelect
                  //   style={{ width: 200, fontSize: 15, textAlign: 'left' }}
                  //   expandTrigger="hover"
                  //   fieldNames={{ label: 'title', value: 'value', children: 'children' }}
                  //   options={userOrganization}
                  // />
                  <TreeSelect
                    style={{ width: 200 }}
                    dropdownStyle={{ maxHeight: 400 }}
                    treeData={userOrganization}
                    treeDefaultExpandAll
                    allowClear
                    multiple
                    treeCheckable
                    // showCheckedStrategy = SHOW_PARENT
                  />
                )}
              </Form.Item>
            </Form>
          </div>
          <div className={styles.filterItem}>
            <Form layout="horizontal" hideRequiredMark>
              <Form.Item
                label={
                  <ErrorTooltip
                    style={errorToolTipStyle}
                    form={form}
                    formName="assignee"
                    title={formatMessageApi({
                      Label_COM_General: 'Assignee',
                    })}
                  />
                }
              >
                {form.getFieldDecorator('assignee')(
                  <Select
                    // style={{ fontSize: 15, width: 120 }}
                    // className={styles.assigneeSelect}
                    showSearch
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option key="all" value="all">
                      {formatMessageApi({
                        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.all',
                      })}
                    </Select.Option>
                    {lodash
                      .chain(assigneeList)
                      ?.sort((a: any, b: any) => {
                        if (a.userId === userId) {
                          return -1;
                        }
                        if (b.userId === userId) {
                          return 1;
                        }
                        if (a.userName < b.userName) {
                          return -1;
                        }
                        if (a.userName > b.userName) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((item: any) => (
                        <Select.Option key={item.userId} value={item.userId}>
                          {item.userName}
                        </Select.Option>
                      ))
                      .value()}
                  </Select>
                )}
              </Form.Item>
            </Form>
          </div>

          <div
            className={styles.filterItem}
            style={{ flex: `0 0 ${px2rem(150)}`, borderTopRightRadius: px2rem(18) }}
          >
            {loading ? (
              <div className={styles.loading}>
                <Spin />
              </div>
            ) : (
              flowFilter
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TaskFlowFilters;
