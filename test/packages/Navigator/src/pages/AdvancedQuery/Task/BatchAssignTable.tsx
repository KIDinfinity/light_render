import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { notification, Table, Select, Button } from 'antd';
import { connect } from 'dva';
import styles from './BatchAssignTable.less';
import taskColumns from './BatchAssignColumns';
import ResizeModal from '@/components/ResizeModal';
import { tenant, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import Empty from '@/components/Empty';

const { Option } = Select;
const TaskTable = (props) => {
  const { currentActivityList, assigneeList, userId } = props;

  const hkSubmissionChannelList = getDrowDownList('Dropdown_COM_HKGeneralSubChannel');
  const submissionChannelList = getDrowDownList('Dropdown_COM_SubmissionChannel');
  const caseCategoryListColumn = getDrowDownList('Label_BPM_CaseCategory');
  const { Special_Label_BPM_CaseCategory: caseCategoryList }: any = getDrowDownList([
    'Special_Label_BPM_CaseCategory',
    'Label_BPM_Entity',
  ]);
  const businessTypeList = getDrowDownList('Dropdown_COM_BusinessType');

  const [assignee, setAssignee] = useState('');

  const taskStatus = [
    {
      dictCode: 'todo',
      dictName: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.to-do',
      }),
    },
    {
      dictCode: 'pending',
      dictName: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.pending',
      }),
    },
    {
      dictCode: 'completed',
      dictName: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.completed',
      }),
    },
    {
      dictCode: 'cancelled',
      dictName: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.cancelled',
      }),
    },
  ];
  const batchAssignDropDownAllList = useSelector(
    (state: any) => state.advancedQueryBatchAssign?.batchAssignDropDownAllList
  );
  const filterParams =
    useSelector((state: any) => state.advancedQueryBatchAssign.filterParams) || {};
  const currentList = lodash.filter(currentActivityList, { autoActivity: 0 });

  const submissionChannel = tenant.region({
    [Region.HK]: hkSubmissionChannelList || [],
    [Region.VN]:
      submissionChannelList?.filter((item) => ['Smart', 'E-COMMERCE'].includes(item.dictName)) ||
      [],
    notMatch: submissionChannelList || [],
  });

  const handleFilterDropdownList = (batchAssignDropDownList = [], oldDropDownList: any) => {
    return lodash.flatten(
      lodash.map(batchAssignDropDownList, (filterItem) =>
        lodash.filter(
          oldDropDownList,
          (item) =>
            lodash.toLower(item?.dictCode || item?.dictName) ===
            lodash.toLower(filterItem?.[Object.keys(filterItem)[0]]) //filterItem若存在dictcode,则拿出来与oldDropDownList里的dictcode去对比
        )
      )
    );
  };
  const handleFilterUserDropdownList = (batchAssignDropDownList = [], oldDropDownList: any) => {
    return lodash.flatten(
      lodash.map(batchAssignDropDownList, (filterItem) =>
        lodash.filter(
          oldDropDownList,
          (item) =>
            lodash.toLower(item?.userId) ===
            lodash.toLower(filterItem?.[Object.keys(filterItem)[0]]) //filterItem若存在dictcode,则拿出来与oldDropDownList里的dictcode去对比
        )
      )
    );
  };
  const filterObj = {
    caseCategory: handleFilterDropdownList(
      batchAssignDropDownAllList?.caseCategoryList,
      caseCategoryListColumn
    ),
    taskStatus: handleFilterDropdownList(batchAssignDropDownAllList?.statusList, taskStatus),

    submissionChannel:
      batchAssignDropDownAllList?.submissionChannelList?.map((item) => ({
        dictCode: item?.submissionChannel,
        dictName: formatMessageApi({ Dropdown_COM_SubmissionChannel: item?.submissionChannel }),
      })) || [],
    taskOwner: [
      { userId: 'unassigned', userName: 'unassigned' },
      ...(handleFilterUserDropdownList(batchAssignDropDownAllList?.assigneeList, assigneeList) ||
        []),
    ].map((item) => ({ dictCode: item.userId, dictName: item.userName })),

    businessType: handleFilterDropdownList(
      batchAssignDropDownAllList?.businessTypeList,
      businessTypeList
    ),

    activityName:
      Array.isArray(
        handleFilterDropdownList(batchAssignDropDownAllList?.activityNameList, currentList)
      ) &&
      handleFilterDropdownList(batchAssignDropDownAllList?.activityNameList, currentList)?.length >
        0
        ? handleFilterDropdownList(batchAssignDropDownAllList?.activityNameList, currentList)
        : [
            {
              dictCode: null,
              dictName: formatMessageApi({
                Label_COM_WarningMessage:
                  'app.navigator.taskDetail.inquireForm.label.activity-name-hint-words',
              }),
            },
          ],
  };

  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const dispatch = useDispatch();

  const useBatchAssign = useSelector((state: any) => state.advancedQueryBatchAssign.useBatchAssign);
  const assignTasks = useSelector((state: any) => state.advancedQueryBatchAssign.assignTasks);
  const assignList = useSelector((state: any) => state.advancedQueryBatchAssign.assignList);

  const currentPage = useSelector(
    (state: any) => state.advancedQueryBatchAssign.params?.currentPage
  );

  const params = useSelector((state: any) => state.advancedQueryBatchAssign.params?.params);
  const loading = useSelector(
    (state: any) => state.loading.effects['advancedQueryBatchAssign/getAssignTask']
  );
  const assignLoading = useSelector(
    (state: any) => state.loading.effects['advancedQueryBatchAssign/assign']
  );
  const orderObj = {
    ['submissionDate']: { sortOrder: 'descend' },
  };
  const taskColumnConfig = useSelector(
    (state: any) => state.configController.configuration?.task?.resultField || []
  );

  useEffect(() => {
    dispatch({
      type: 'advancedQueryBatchAssign/getAssignList',
    });
  }, []);
  useEffect(() => {
    return () => {
      dispatch({
        type: 'advancedQueryBatchAssign/clear',
      });
    };
  }, [useBatchAssign]);

  const updateParams = async (params) => {
    await dispatch({
      type: 'advancedQueryBatchAssign/updateParams',
      payload: { params },
    });
    await dispatch({
      type: 'advancedQueryBatchAssign/getAssignTask',
      payload: { params },
    });
  };
  const pagination = {
    ...assignTasks?.pagination,
    current: currentPage || 1,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page) => updateParams({ currentPage: page }),
    onShowSizeChange: (_, size) => updateParams({ pageSize: size, currentPage: 1 }),
  };

  // 点击后触发排序
  const handleHeaderCell = async (column) => {
    setSelectedRow([]);
    await dispatch({
      type: 'advancedQueryBatchAssign/saveSort',
      payload: {
        sortName: column.key,
      },
    });
    await dispatch({
      type: 'advancedQueryBatchAssign/getAssignTask',
    });
  };
  // 修改caseCategory
  const caseCategoryChange = async (value) => {
    if (value) {
      const params = {
        categoryCode: value,
        language: tenant.getLocaleLang(),
        regionCode: tenant.region(),
        typeCode: 'Dropdown_COM_BusinessType',
        isCase: false,
      };
      await dispatch({
        type: 'advancedQueryBatchAssign/getBusinessTypeList',
        payload: params,
      });
      dispatch({
        type: 'advancedQueryBatchAssign/findActivitiesByCaseCategory',
        payload: {
          caseCategory: value,
        },
      });
    } else {
      await dispatch({
        type: 'advancedQueryBatchAssign/saveFilterParams',
        payload: {
          changeValue: {
            activityName: '',
            businessType: '',
          },
        },
      });
      await dispatch({
        type: 'advancedQueryBatchAssign/saveCurrentActivityList',
        payload: {
          currentStatusList: [],
          isCase: false,
        },
      });
    }
  };
  // 修改 下拉的筛选条件
  const handleTitleChange = async (changeValue: any) => {
    if (!params.assignee) return;
    setSelectedRow([]);
    if ('caseCategory' in changeValue) {
      await caseCategoryChange(changeValue.caseCategory);
    }

    const [[changeKey, changeObjectValue]] = Object.entries(changeValue);
    let data = [];
    if ('caseCategory' in changeValue) {
      data = changeValue.caseCategory;
    } else if (lodash.isEmpty(changeObjectValue)) {
      data = [];
    } else {
      const originValue = filterParams?.[changeKey] || [];
      data = originValue?.includes(changeObjectValue)
        ? originValue.filter((item) => item !== changeObjectValue)
        : [...originValue, changeObjectValue];
      data = lodash.isEmpty(data) ? '' : data;
    }

    // 保存额外的参数
    await dispatch({
      type: 'advancedQueryBatchAssign/saveFilterParams',
      payload: {
        changeValue: {
          [changeKey]: data,
        },
      },
    });
    await dispatch({
      type: 'advancedQueryBatchAssign/getAssignTask',
    });
  };
  const handleSelectCaseCategoryChange = async (e) => {
    const changeValue = { caseCategory: e };
    if (params.assignee) {
      await handleTitleChange(changeValue);
      dispatch({
        type: 'advancedQueryBatchAssign/getBatchAssignDropDown',
        payload: { params: { assignee: params.assignee } },
      });
    } else {
      setSelectedRow([]);
      await caseCategoryChange(e);
      await dispatch({
        type: 'advancedQueryBatchAssign/saveFilterParams',
        payload: {
          changeValue,
        },
      });
    }
  };

  const closeModal = () => {
    dispatch({
      type: 'advancedQueryBatchAssign/saveUseBatchAssign',
      payload: {
        useBatchAssign: false,
      },
    });
  };
  const assigneeChange = async (e) => {
    await dispatch({
      type: 'advancedQueryBatchAssign/clear',
    });
    setAssignee(e);
    setSelectedRow([]);
    updateParams({ params: { assignee: e } });
    dispatch({
      type: 'advancedQueryBatchAssign/getBatchAssignDropDown',
      payload: { params: { assignee: e } },
    });
  };

  const assginHandle = async () => {
    if (lodash.isEmpty(selectedRow)) {
      handleMessageModal([{ content: 'Require!' }]);
      return;
    } else {
      const newSelectedRow = selectedRow.map((selectedRows): any => {
        return {
          ...selectedRows,
          currentAssignee: assignee,
          currentUserId: userId,
        };
      });
      const hasPermission = await dispatch({
        type: 'advancedQueryBatchAssign/getPermission',
        payload: newSelectedRow,
      });
      if (hasPermission.success) {
        const result = await dispatch({
          type: 'advancedQueryBatchAssign/assign',
          payload: { selectedRow },
        });
        if (result) {
          const assigneeName = lodash.find(
            assignList,
            (item) => item?.userId === params.assignee
          )?.userName;
          dispatch({
            type: 'auditLogController/addAuditLog',
            payload: {
              selectedRow,
              assigneeName,
            },
          });
          notification.success({
            message: 'Assign successfully!',
          });
        }
        setSelectedRow([]);
        await dispatch({
          type: 'advancedQueryBatchAssign/getAssignTask',
        });
      } else {
        notification.error({
          message: hasPermission?.promptMessages?.[0]?.content,
        });
      }
    }
  };
  return (
    <>
      <ResizeModal
        height={(document.body?.getBoundingClientRect()?.height + 130) * 0.8}
        width={1000}
        moveTop={56}
        className={styles.assignTask}
        visible={useBatchAssign}
        setVisible={closeModal}
      >
        <div className={styles.box}>
          <div className={styles.title}>Batch Assign</div>
          <div className={styles.selectbox}>
            <div className={styles.selectItem}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
              })}
              <Select
                className={styles.selectOption}
                onChange={handleSelectCaseCategoryChange}
                optionFilterProp="children"
                showSearch
                allowClear
                value={filterParams.caseCategory}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {(caseCategoryList || []).map((item) => (
                  <Option key={item.dictCode} value={item.dictCode}>
                    {item.dictName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.selectItem}>
              {formatMessageApi({
                Label_COM_Inquiry: 'targetAssignee',
              })}
              <Select
                className={styles.selectOption}
                onChange={assigneeChange}
                optionFilterProp="children"
                showSearch
                allowClear
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {assignList.map((item) => (
                  <Option key={item.userId} value={item.userId}>
                    {item.userName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        {params.assignee ? (
          <Table
            rowKey={(row) => row.taskId}
            loading={loading}
            locale={{
              emptyText: <Empty />,
            }}
            columns={taskColumns({
              orders: orderObj,
              config: taskColumnConfig,
              filterParams,
              filterObj,
              handleTitleChange,
              handleHeaderCell,
            })}
            dataSource={assignTasks?.list}
            pagination={pagination}
            scroll={{
              x: '80vh',
              y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 280 + 'px',
              scrollToFirstRowOnChange: true,
            }}
            onRow={(record, rowKey) => ({
              index: rowKey,
              record,
              sourcetype: 3,
              onClick: () => {
                if (selectedRow.includes(record.taskId)) {
                  setSelectedRow(selectedRow.filter((item) => item?.taskId !== record.taskId));
                } else {
                  setSelectedRow([...selectedRow, record]);
                }
              },
            })}
            rowSelection={{
              selectedRowKeys: selectedRow.map((item) => item?.taskId),
              onSelect: (record, selected) => {
                if (selected) {
                  setSelectedRow([...selectedRow, record]);
                } else {
                  setSelectedRow(selectedRow.filter((item) => item?.taskId !== record.taskId));
                }
              },
              onSelectAll: (selected, selectedRows) => {
                if (selected) {
                  setSelectedRow((e) => lodash.uniqBy([...e, ...selectedRows], 'taskId'));
                } else {
                  const list = assignTasks?.list?.map((item) => item?.taskId);
                  setSelectedRow((e) => e.filter((item) => !list?.includes(item?.taskId)));
                }
              },
            }}
          />
        ) : null}

        {!lodash.isEmpty(assignTasks?.list) && (
          <div className={styles.confirm}>
            <Button
              type="primary"
              style={{ width: '190px' }}
              onClick={assginHandle}
              loading={loading || assignLoading}
            >
              Confirm
            </Button>
          </div>
        )}
      </ResizeModal>
    </>
  );
};

export default connect(({ advancedQueryBatchAssign, user }: any) => ({
  businessTypeList: advancedQueryBatchAssign.businessTypeList,
  currentActivityList: advancedQueryBatchAssign.currentActivityList,
  userId: user.currentUser.userId,
}))(TaskTable);
