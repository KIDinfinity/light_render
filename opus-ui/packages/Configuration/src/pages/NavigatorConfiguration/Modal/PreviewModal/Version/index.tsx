import React, { useState } from 'react';
import { Tabs, Radio } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection from '../FormSection';
import styles from './index.less';

const { TabPane } = Tabs;

export default () => {
  const tabs = ['Current_Version', 'Under_Audit_Version'];
  const [mode, setMode] = useState(tabs[0]);

  const { previewRecord, dataImage, functionData, underAuditData } = useSelector(
    (state: any) => state.configurationController
  );

  const handleModeChange = (e: any) => {
    setMode(e?.target?.value);
  };

  return (
    <div className={styles.tabs}>
      <Radio.Group onChange={handleModeChange} value={mode} className={styles.radioGroup}>
        {lodash.map(tabs, (item: any) => (
          <Radio.Button value={item} key={item}>
            {formatMessageApi({
              Label_COM_ConfigurationCenter: item,
            })}
          </Radio.Button>
        ))}
      </Radio.Group>
      <Tabs defaultActiveKey={tabs[0]} activeKey={mode} renderTabBar={() => <></>}>
        <TabPane tab={tabs[0]} key={tabs[0]}>
          <FormSection
            formData={previewRecord}
            dataFieldList={functionData?.dataFieldList}
            functionCode={functionData?.functionCode}
          />
        </TabPane>
        <TabPane tab={tabs[1]} key={tabs[1]}>
          <FormSection
            formData={dataImage}
            dataFieldList={functionData?.dataFieldList}
            functionCode={functionData?.functionCode}
            underAuditData={underAuditData}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
