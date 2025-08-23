import React, { memo } from 'react';
import lodash from 'lodash';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from 'bpm/pages/Envoy/EnvoyList/MapComponent';
import styles from './reminder.less';

interface IProps {
  enableReminder: boolean;
  remindersData: any;
  currentReminder: any;
  groupCode: string;
}

const CurrentReminder = (props: IProps) => {
  const { remindersData, currentReminder, enableReminder, groupCode } = props;

  const sortModuleArr = getSortModuleArr(lodash.get(currentReminder, 'displayConfig'));
  return (
    <div className={styles.currentReminder}>
      {lodash
        .chain(sortModuleArr)
        .filter((item: any) => {
          const Component = MapComponent[item?.moduleName];
          return !!Component;
        })
        .map((item: any, idx: number) => {
          const Component = MapComponent[item?.moduleName];
          return (
            <div key={idx}>
              <Component
                editable={item?.editable}
                custom={item?.custom}
                data={currentReminder}
                type="reminder"
                remindersData={remindersData}
                enableReminder={enableReminder}
                groupCode={groupCode}
              />
            </div>
          );
        })
        .value()}
    </div>
  );
};

export default memo(CurrentReminder);
