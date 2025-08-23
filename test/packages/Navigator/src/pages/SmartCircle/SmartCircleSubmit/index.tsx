import React from 'react';
import lodash from 'lodash';
import { Row, Col, Button, Form } from 'antd';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import navigator from 'navigator/api';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import styles from './SmartCircleSubmit.less';
import { SmartCircleKey } from 'navigator/enum/MachineKey';

let timer: any = null;
const SmartCircleSubmit = ({ form, searchValue }: any) => {
  const handleSearch = () => {
    if (searchValue !== '') {
      navigator.AdvancedQueryListener.send({
        type: 'trigger',
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <Row>
        <Col span={20}>
          <FormItemInput
            form={form}
            formName="searchValue"
            autoComplete="off"
            onPressEnter={handleSearch}
            className={styles.inputStyle}
          />
        </Col>
        <Col span={3} offset={1}>
          <Button icon="arrow-right" className={styles.button} onClick={handleSearch} />
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ workspaceAI, loading, workspaceSwitchOn }: any) => ({
  searchValue: workspaceAI.searchValue,
  loading,
  isShowAI: workspaceSwitchOn.isShow.isShowAI,
  machineKey: workspaceAI.machineKey,
}))(
  Form.create({
    onValuesChange: async (props: any, changedFields) => {
      const { machineKey, dispatch } = props;
      const { searchValue } = changedFields;

      await dispatch({
        type: 'workspaceAI/saveSearchValue',
        payload: {
          searchValue,
        },
      });

      // TODO:这里太多逻辑判断了,input输入框不应该公用,需要分开出来

      // 创建案件模块 + 输入不为空
      if (machineKey === SmartCircleKey.ButtonCreateCase && !lodash.isEmpty(searchValue)) {
        await dispatch({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: SmartCircleKey.ListSearch },
        });
        return;
      }

      // 未读信息列表 + 输入为空
      if (machineKey === SmartCircleKey.ListNote && lodash.isEmpty(searchValue)) {
        await dispatch({
          type: 'smartCircleNotification/searchListValue',
          payload: {
            searchValue,
          },
        });
        return;
      }
      // 未读信息列表 + 输入不为空
      if (machineKey === SmartCircleKey.ListNote && !lodash.isEmpty(searchValue)) {
        await dispatch({ type: 'smartCircleNotification/messageList' });
        return;
      }

      // 搜索列表 + 输入为空
      if (
        (machineKey === SmartCircleKey.ListSearch || lodash.isEmpty(machineKey)) &&
        lodash.isEmpty(searchValue)
      ) {
        await dispatch({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: '' },
        });
        return;
      }

      // 搜索列表 + 输入不为空
      if (
        (machineKey === SmartCircleKey.ListSearch || lodash.isEmpty(machineKey)) &&
        !lodash.isEmpty(searchValue)
      ) {
        await dispatch({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: SmartCircleKey.ListSearch },
        });
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
          const { caseCaseNoResult, caseBusinessResult, taskCaseNoResult, taskBusinessResult } =
            await dispatch({
              type: 'workspaceAI/queryListOfSmartCircle',
            });
          if (
            (caseCaseNoResult?.success && caseCaseNoResult?.resultData?.total > 0) ||
            (taskCaseNoResult?.success && taskCaseNoResult?.resultData?.total > 0)
          ) {
            tarckInquiryPoint(dispatch, {
              processInstanceId: searchValue,
              eventName: eEventName.smartCircle,
              eventOperation: eEventOperation.search,
            });
          }
          if (
            (caseBusinessResult?.success && caseBusinessResult?.resultData?.total > 0) ||
            (taskBusinessResult?.success && taskBusinessResult?.resultData?.total > 0)
          ) {
            tarckInquiryPoint(dispatch, {
              inquiryBusinessNo: searchValue,
              eventName: eEventName.smartCircle,
              eventOperation: eEventOperation.search,
            });
          }

          await dispatch({
            type: 'workspaceAI/queryListOfUserLast',
          });
        }, 300);
        return;
      }
    },
    mapPropsToFields: (props) => {
      const { searchValue }: any = props;

      return formUtils.mapObjectToFields({ searchValue });
    },
  })(SmartCircleSubmit)
);
