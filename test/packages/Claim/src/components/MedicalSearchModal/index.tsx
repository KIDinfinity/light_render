import { Tabs } from 'antd';
import React from 'react';
import type { Dispatch } from 'dva';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import type { medicalSearchGroup } from 'claim/enum/medicalSearchGroup';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Modal from './complex/Modal';
import SearchTable from './complex/SearchTable';
import styles from './index.less';

const { TabPane } = Tabs;
function MedicalSearchModal() {
  const { visible, enableGroups, groups, activeGroup } = useSelector(
    (state) => state.medicalSearch
  );
  const dispatch: Dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: 'medicalSearch/changeVisible',
      payload: {
        visible: false,
      },
    });
  };
  /**
   * tab 切换
   * @param {String} value tab
   */
  const handleChangeGroup = (value: medicalSearchGroup) => {
    dispatch({
      type: 'medicalSearch/handleResetSingleGroup',
      payload: {
        group: activeGroup,
      },
    });
    dispatch({
      type: 'medicalSearch/changeActiveGroup',
      payload: {
        activeGroup: value,
      },
    });
  };

  return (
    <Modal
      visible={visible}
      onOk={handleClose}
      onCancel={handleClose}
      width="40vw"
      okText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.drawer.messager.button.yes',
      })}
      cancelText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.drawer.messager.button.no',
      })}
      footer={null}
      mask={false}
      maskClosable={false}
      draggable
    >
      <Tabs activeKey={activeGroup} onChange={(value) => handleChangeGroup(value)}>
        {lodash.map(enableGroups, (group) => {
          const {
            columns = [],
            dataSource = [],
            title = '',
            api = '',
            pagination = {},
            searchParams = {},
            searchIndexList = [],
            scroll = {},
            sorter,
            width,
            searchFiledsConfig = {},
          } = lodash.pick(groups[group], [
            'columns',
            'dataSource',
            'title',
            'api',
            'pagination',
            'searchParams',
            'searchIndexList',
            'searchParams',
            'scroll',
            'sorter',
            'width',
            'searchFiledsConfig',
          ]);
          const columnsAddTitle = lodash.map(columns, (item) => {
            return {
              ...item,
              title: formatMessageApi({
                Label_BIZ_Claim: `venus_bpm.label.medicalSearch.${item?.dataIndex}`,
              }),
            };
          });
          return (
            <TabPane
              tab={formatMessageApi({
                Label_BIZ_Claim: `venus_bpm.label.medicalSearchTitle.${group}`,
              })}
              key={group}
              className={styles.scrollTane}
            >
              <SearchTable
                columns={columnsAddTitle}
                dataSource={dataSource}
                title={title}
                api={api}
                group={group}
                pagination={pagination}
                searchParams={searchParams}
                searchIndexList={searchIndexList}
                visible={visible}
                activeGroup={activeGroup}
                scroll={scroll}
                sorter={sorter}
                width={width}
                searchFiledsConfig={searchFiledsConfig}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </Modal>
  );
}

export default MedicalSearchModal;
