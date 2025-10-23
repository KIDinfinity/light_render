import React, { useState } from 'react';
import { List } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { namespace } from '../../_models';
import Item from './item';

import styles from './index.less';

const ActiveTask = () => {
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const attachList = useSelector(
    ({ [namespace]: modelnamepsace }: any) => modelnamepsace?.attachList
  );

  const searchCaseList = useSelector(
    ({ [namespace]: modelnamepsace }: any) => modelnamepsace?.searchCaseList
  );

  const unknownDocList = useSelector(
    ({ [namespace]: modelnamepsace }: any) => modelnamepsace?.processData?.unknownDocList
  );

  const loading = useSelector(
    (state: any) => state.loading.effects[`${namespace}/getSearchCaseList`]
  );

  const [page, setPage] = useState(1);
  // 添加绑定
  const handleAttach = (item: any, isActive: boolean) => {
    if (taskNotEditable) return;
    if (attachList.length === 0) return;
    if (!isActive) {
      dispatch({
        type: `${namespace}/addAttachList`,
        payload: {
          type: 'case',
          caseNo: item?.selectedCaseNo,
        },
      });
    } else {
      dispatch({
        type: `${namespace}/removeAttachList`,
        payload: {
          caseNo: item?.selectedCaseNo,
          type: 'case',
        },
      });
    }
  };

  return (
    <div className={styles.wrap}>
      {/* {noCaseNo < 0 && (
        <Button
          disabled={taskNotEditable}
          type="primary"
          className={styles.newTask}
        >
          {formatMessageApi({
            Label_BIZ_Claim: 'app.unknownDocumentBase.task.search.activeTaskList.title',
          })}
        </Button>
      )} */}
      <List
        loading={loading}
        className={styles.list}
        grid={{ gutter: 16, column: 2 }}
        dataSource={searchCaseList}
        renderItem={(item: any) => (
          <List.Item>
            <Item
              item={item}
              attachList={attachList}
              handleAttach={handleAttach}
              unknownDocList={unknownDocList}
            />
          </List.Item>
        )}
        pagination={{
          pageSize: 6,
          current: page,
          onChange: async (page: number) => {
            setPage(page);
          },
        }}
      />
    </div>
  );
};

export default ActiveTask;
