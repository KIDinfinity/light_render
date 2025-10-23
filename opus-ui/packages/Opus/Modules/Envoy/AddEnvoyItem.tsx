import React from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import GroupSelect from './Components/GroupSelect';
import Status from './Components/Status';
import MapComponent from './Components/MapComponent';
import { safeParseUtil } from '@/utils/utils';
import styles from './AddEnvoy.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import PreSelectMemoDropdown from './Components/PendingMemo/PreSelectMemoDropdown';
import useJudgeDisplayPreselectMemoDropdown from 'bpm/pages/Envoy/hooks/useJudgeDisplayPreselectMemoDropdown';

export default ({ reasonGroup, disabled, groupIdx, overrideLoading, envoyEdit }: any) => {
  const dispatch = useDispatch();

  const displayPreselectMemoDropdown = useJudgeDisplayPreselectMemoDropdown({
    reasonGroup,
  });

  const activePermission = lodash.isBoolean(envoyEdit) ? envoyEdit : true;

  return (
    <div className={styles.envoyItem}>
      <div className={styles.row}>
        <GroupSelect
          reasonGroup={reasonGroup}
          groupIdx={groupIdx}
          overrideLoading={overrideLoading}
          activePermission={activePermission}
        />
        <DeleteButton
          show={!disabled && activePermission}
          disabled={disabled || !activePermission}
          className={disabled && styles.disableCursor}
          handleDelete={() => {
            dispatch({
              type: 'envoyController/delEnvoy',
              payload: {
                id: reasonGroup.id,
              },
            });
          }}
        />
        <div className={styles.gap} />
        <Status status={'Inactive'} />
      </div>
      {reasonGroup?.reasonDetails?.map((reason, index) => {
        const sortModuleArr = getSortModuleArr(
          lodash.isString(reason?.displayConfig)
            ? safeParseUtil(reason?.displayConfig)
            : reason?.displayConfig
        );

        return (
          <>
            {displayPreselectMemoDropdown && activePermission && (
              <PreSelectMemoDropdown reasonGroupId={reasonGroup?.id} groupIdx={groupIdx} />
            )}
            {sortModuleArr.map((item: any) => {
              const Component = MapComponent[item?.moduleName];
              return Component ? (
                <Component
                  data={reason}
                  key={reason.id || index}
                  item={item}
                  editable={item?.editable && activePermission}
                  custom={item?.custom}
                  required={item?.required}
                  type="reason"
                  groupCode={reasonGroup.groupCode}
                  groupIdx={groupIdx}
                  activePermission={activePermission}
                />
              ) : null;
            })}
          </>
        );
      })}
    </div>
  );
};
