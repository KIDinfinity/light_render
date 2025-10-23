import React, { useState } from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import EditableTablePanelMIB from 'opus/NewBusiness/ManualUnderwriting/_components/EditableTablePanelMIB';
import useGetMWMIBInfoList from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetMWMIBInfoList';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useHandleAddMIBItem from 'decision/_hooks/useHandleAddMIBItem';
import useHandleDeleteMIBItemCallback from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useHandleDeleteMIBItemCallback';
import useGetDisplayEditButtonMIB from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetDisplayEditButtonMIB';
import MIBItem from './MIBItem';
import { Card as AntCard } from 'antd';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const MIBInformationTable = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const showEditButton = useGetDisplayEditButtonMIB({ editable });
  const [expand, setExpand] = useState(true);
  const mibInfoList = useGetMWMIBInfoList();
  const config = useGetSectionAtomConfig({
    section: 'MIBInformation-Table',
    localConfig: {},
  });
  const handleDelete = useHandleDeleteMIBItemCallback();
  const handleAddMIB = useHandleAddMIBItem();
  return (
    <div className={styles.container}>
      <AntCard
        title={formatMessageApi({
          Label_BIZ_Policy: 'MIBInfo',
        })}
        key={'MIB'}
        extra={
          <div className="extraGroup">
            {showEditButton ? <Icon type="plus" onClick={handleAddMIB} /> : null}
            <Icon
              type={expand ? 'down' : 'up'}
              onClick={() => {
                setExpand(!expand);
              }}
            />
          </div>
        }
      >
        {expand && (
          <div className={styles.contentWrap}>
            <EditableTablePanelMIB
              itemList={mibInfoList}
              sectionConfig={config}
              styleReplacement={styles}
              onDeleteItem={(item: any) => {
                handleDelete(item?.id);
              }}
              itemRender={(dataItem) => {
                return <MIBItem dataItem={dataItem} id={dataItem?.id} />;
              }}
              disableDeleteItem={(item: any) => {
                return !showEditButton || !!item?.recordNo;
              }}
              addButtonRender={() => {
                if (showEditButton) {
                  return (
                    <span className={styles.addButton} onClick={handleAddMIB}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.66675 5.33329V1.66663C6.66675 1.11429 6.21908 0.666626 5.66675 0.666626H5.33341V5.33329H1.66675C1.11441 5.33329 0.666748 5.78096 0.666748 6.33329V6.66663H5.33341V10.3333C5.33341 10.8856 5.78108 11.3333 6.33341 11.3333H6.66675V6.66663H10.3334C10.8857 6.66663 11.3334 6.21896 11.3334 5.66663V5.33329H6.66675Z"
                          fill="#E87722"
                        />
                      </svg>
                    </span>
                  );
                }
                return null;
              }}
            />
          </div>
        )}
      </AntCard>
    </div>
  );
};

export default MIBInformationTable;
