import React, { memo } from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { safeParseUtil } from '@/utils/utils';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from 'bpm/pages/Envoy/EnvoyList/MapComponent';
import MapExpandComponent from 'bpm/pages/Envoy/EnvoyList/MapExpandComponent';
import styles from './currentReason.less';

interface IProps {
  currentReason: any;
  groupIdx: number;
  isExpand?: boolean;
}

const CurrentReason = (props: IProps) => {
  const { currentReason, groupIdx, isExpand } = props;

  const sortModuleArr = getSortModuleArr(
    lodash.isString(currentReason?.displayConfig)
      ? safeParseUtil(currentReason?.displayConfig)
      : currentReason?.displayConfig
  );

  return (
    <div className={!isExpand ? styles.currentReason : void 0}>
      {lodash
        .chain(sortModuleArr)
        .filter((item: any) => {
          const Component = isExpand
            ? MapExpandComponent[item?.moduleName]
            : MapComponent[item?.moduleName];
          return !!Component;
        })
        .map((item: any, idx: number) => {
          const Component = isExpand
            ? MapExpandComponent[item?.moduleName]
            : MapComponent[item?.moduleName];
          return (
            <Form
              className={classNames({
                [styles.pad16]: item?.moduleName !== 'reminder',
              })}
              key={idx}
            >
              <Component
                item={item}
                editable={item?.editable}
                custom={item?.custom}
                required={item?.required}
                data={currentReason}
                type="reason"
                groupIdx={groupIdx}
                isExpand={isExpand}
              />
            </Form>
          );
        })
        .value()}
    </div>
  );
};

export default memo(CurrentReason);
