import React, { useEffect, useRef, useState } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Row, Col } from 'antd';
import dcCaseInquiryControllerService from '@/services/dcCaseInquiryControllerService';
import Empty from '@/components/Empty';

import { FormItemInput, FormItemSelect } from 'basic/components/Form';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import bpmCaseOperationInfoService from '@/services/bpmCaseOperationInfoService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import UserInfoBox from './UserInfoBox';
import { CaseStatus } from '@/enum';

function AuthorizedUser({ form, isExpand, setExpand, exportExcel, extraHeaderClassName, caseNo }) {
  const [listObj, setListObj] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { Dropdown_COM_AuthorizedUserForAction, activity } = getDrowDownList([
    'Dropdown_COM_AuthorizedUserForAction',
    'activity',
  ]);

  const userListMap = [
    {
      code: 'assignUserInfo',
      name: formatMessageApi({ Dropdown_COM_AuthorizedUserForAction: 'assign' }),
    },
    {
      code: 'submitUserInfo',
      name: formatMessageApi({ Dropdown_COM_AuthorizedUserForAction: 'submit' }),
    },
    {
      code: 'manualEscalateUserInfo',
      name: formatMessageApi({ Dropdown_COM_AuthorizedUserForAction: 'manualEscalate' }),
    },
    {
      code: 'autoEscalateUserInfo',
      name: formatMessageApi({ Dropdown_COM_AuthorizedUserForAction: 'autoEscalate' }),
    },
  ];

  const getCurrentActivityByCaseNoHandle = async () => {
    if (!form.getFieldsValue()?.caseNo || searchLoading) {
      return;
    }
    const response = await dcCaseInquiryControllerService.advSearch({
      params: {
        processInstanceId: form.getFieldsValue()?.caseNo,
        regionCode: tenant.region(),
      },
      currentPage: 1,
      pageSize: 10,
      sortName: 'procInstId',
      sortOrder: 'asc',
      sortOrders: [],
      defaultSortName: 'inquiryBusinessNo',
    });
    if (response?.success) {
      const currentTaskDetail = response?.resultData?.rows?.[0];
      setListObj([]);
      let newCurrentActivityKey = currentTaskDetail?.currentActivityKey;
      if (
        [
          CaseStatus.COMPLETED,
          CaseStatus.CANCELLED,
          CaseStatus.WITHDRAWAL,
          CaseStatus.OVERDUE,
          CaseStatus.NTU,
          CaseStatus.HANDLEDINLOCALSYSTEM,
          CaseStatus.HANDLEDINHKLOCALSYSTEM,
          CaseStatus.HANDLEDINJPLOCALSYSTEM,
          CaseStatus.HANDLEDINTHLOCALSYSTEM,
          CaseStatus.HANDLEDINPHLOCALSYSTEM,
        ].includes(currentTaskDetail?.status)
      ) {
        newCurrentActivityKey = formatMessageApi({
          Dropdown_CAS_CurrentActivity: currentTaskDetail?.status,
        });
      }

      form.setFieldsValue({ currentActivityKey: newCurrentActivityKey });
      return currentTaskDetail;
    }
    if (!response?.success) {
      return false;
    }
  };

  const getAuthorizedUserListByTaskId = async () => {
    setSearchLoading(true);

    const currentTaskDetail = await getCurrentActivityByCaseNoHandle();

    if (!currentTaskDetail || !['todo', 'pending'].includes(currentTaskDetail?.status)) {
      setSearchLoading(false);
      return;
    }

    const params = {
      ...form.getFieldsValue(),
      businessNo: currentTaskDetail?.inquiryBusinessNo,
      caseCategory: currentTaskDetail?.caseCategory,
      currentTaskId: currentTaskDetail?.currentTaskId,
    };
    params.actionList = lodash.isEmpty(params?.actionList)
      ? Dropdown_COM_AuthorizedUserForAction.map((item) => item.dictCode)
      : params.actionList;
    const response = await bpmCaseOperationInfoService.findActionUserInfoList(params);
    if (response?.success) {
      if (lodash.isEmpty(response?.resultData)) {
        setListObj({});
      } else {
        let lastData = lodash.sortBy(
          userListMap
            .map((item) => {
              if (response?.resultData?.[item.code] === null) {
                return null;
              }
              const teamSum =
                lodash.uniqBy(
                  response?.resultData?.[item.code]?.teamList?.reduce(
                    (acc, obj) => acc.concat(obj?.teamGroupUserList || []),
                    []
                  ),
                  'userId'
                )?.length || 0;

              const sum =
                response?.resultData?.[item.code]?.havePermissionUserInfoList?.length || 0;
              if (teamSum === 0 && sum === 0) {
                return { ...item, isTeam: false, sum: 0, list: [] };
              }
              if (teamSum != 0) {
                return {
                  ...item,
                  sum: teamSum,
                  list: lodash.sortBy(
                    response?.resultData?.[item.code]?.teamList?.map((teamItem) => ({
                      ...teamItem,
                      teamGroupUserList: lodash.sortBy(
                        teamItem?.teamGroupUserList || [],
                        'userName'
                      ),
                    })),
                    'teamName'
                  ),
                  isTeam: true,
                };
              }
              if (sum !== 0) {
                return {
                  ...item,
                  sum,
                  list: lodash.sortBy(
                    response?.resultData?.[item.code]?.havePermissionUserInfoList,
                    'userName'
                  ),
                  isTeam: false,
                };
              }
              return item;
            })
            .filter((item) => item),
          [
            function (o) {
              return o.sum <= 0;
            },
          ]
        );
        if (lodash.every(lastData, (item) => !(item?.sum > 0))) {
          lastData = [];
        }
        setListObj(lastData);
      }
    }
    setSearchLoading(false);
  };

  const clearDataHandler = (e) => {
    setListObj([]);
    form.resetFields();
    form.setFieldsValue({ caseNo: `${e.target.value}` });
  };

  const previousCaseNo = useRef(null);

  useEffect(() => {
    if (caseNo && caseNo !== previousCaseNo.current) {
      form.setFieldsValue({ caseNo });
      previousCaseNo.current = caseNo;
      getAuthorizedUserListByTaskId();
    }
  }, [caseNo, form]);
  return (
    <div className={styles.AuthorizedUser}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'AuthorizedUser' })}
        click={() => setExpand?.(!isExpand)}
        displayExpand={false}
        extraHeaderClassName={extraHeaderClassName}
      >
        <div className={styles.activeIssusBox}>
          <div className={styles.searchBox}>
            <div className={styles.fieldBox}>
              <Row gutter={[10, 0]}>
                <Col span={24}>
                  <FormItemInput
                    form={form}
                    formName="caseNo"
                    labelId="CaseNo"
                    labelTypeCode="Label_COM_MonitorCenter"
                    required
                    onBlur={clearDataHandler}
                  />
                </Col>
                <Col span={24}>
                  <FormItemSelect
                    form={form}
                    formName="currentActivityKey"
                    labelId="CurrentActivity"
                    labelTypeCode="Label_COM_MonitorCenter"
                    dicts={activity}
                    disabled
                  />
                </Col>
                <Col span={24}>
                  <FormItemSelect
                    form={form}
                    mode="multiple"
                    formName="actionList"
                    labelId="Action"
                    labelTypeCode="Label_COM_MonitorCenter"
                    dicts={Dropdown_COM_AuthorizedUserForAction}
                    className="integrationCode"
                    autoClearSearchValue={false}
                  />
                </Col>
                <Col span={24}>
                  <FormItemInput
                    form={form}
                    formName="userId"
                    labelId="userId"
                    labelTypeCode="Label_COM_MonitorCenter"
                  />
                </Col>
              </Row>
            </div>
            <div className={styles.buttonBox}>
              <Button
                type="primary"
                block
                className={styles.button}
                onClick={getAuthorizedUserListByTaskId}
                loading={searchLoading}
              >
                {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
              </Button>
            </div>
          </div>

          {lodash.isEmpty(listObj) ? <Empty /> : <UserInfoBox isExpand={isExpand} list={listObj} />}
        </div>
      </Commonbox>
    </div>
  );
}

export default Form.create()(AuthorizedUser);
