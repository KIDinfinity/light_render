import React, { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Card, Button } from 'antd';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import useLoadInformationAddConfig from 'bpm/pages/Information/_hooks/useLoadInformationAddConfig';
import useAutoSaveSnapshot from 'bpm/pages/Information/_hooks/useAutoSaveSnapshot';
import Record from './Record';
import Count from '@/components/Count';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

export default ({ authInfoEditable, processData }: any) => {
  const dispatch = useDispatch();
  const { addInformations } = useSelector(
    (state: any) => ({
      addInformations: state.navigatorInformationController.addInformations,
    }),
    shallowEqual
  );
  const loading = useSelector(
    (state: any) => state.loading.effects['navigatorInformationController/getSnapshot']
  );
  const loadingData = useSelector(
    (state: any) => state.loading.effects['navigatorInformationController/loadInformationInitData']
  );
  const newTaskStatus = useSelector((state: any) => state?.processTask?.getTask?.taskStatus);
  const taskStatus = useSelector((state: any) => state?.navigatorInformationController?.taskStatus);
  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const { taskId, processInstanceId: caseNo } = lodash.pick(processData, [
    'processInstanceId',
    'taskId',
  ]);
  const currentAuthority = 'RS_BP_Button_Info_AddRemark';
  useEffect(() => {
    if (taskStatus && newTaskStatus) {
      dispatch({
        type: 'navigatorInformationController/loadActiveNameList',
        payload: {
          taskId,
          caseNo,
          userId,
        },
      });
    }
  }, [newTaskStatus]);
  useAutoSaveSnapshot();
  const addnewRecordListItemFn = () => {
    dispatch({
      type: 'navigatorInformationController/addInformationRecord',
    });
    dispatch({
      type: 'navigatorInformationController/changeShowInformationList',
      payload: {
        isShowInformationList: true,
      },
    });
    dispatch({
      type: 'navigatorInformationController/changeDisabledAddButton',
      payload: {
        isDisabledAddButton: true,
      },
    });
  };
  useLoadInformationAddConfig();
  return (
    <>
      {authInfoEditable && (
        <Card
          title={
            <Count
              title={formatMessageApi({
                Label_Sider_Information: 'Drafts',
              })}
              loading={loading || loadingData}
              length={addInformations.length}
            />
          }
          style={{ marginTop: 24 }}
          bordered={false}
          extra={
            <AuthorizedAtom currentAuthority={currentAuthority} key="RS_BP_Button_Info_AddRemark">
              <Button
                icon="plus"
                shape="circle"
                size="small"
                type="primary"
                disabled={loadingData}
                onClick={addnewRecordListItemFn}
              />
            </AuthorizedAtom>
          }
        >
          {addInformations.map((item: any) => {
            return <Record key={item.id} item={item} processData={processData} />;
          })}
        </Card>
      )}
    </>
  );
};
