import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Upload from './ButtonUI/Upload';
import ButtonSwitch from './ButtonUI/ButtonSwitch';
import Loading from './Loading';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

export default ({ buttonList, actionConfig = {} }: any) => {
  const defaultStatus = useMemo(
    () =>
      lodash.reduce(
        actionConfig,
        (result, value, key) => ({
          ...result,
          [key]: value.initStatus || 'default',
        }),
        {}
      ),
    [actionConfig]
  );

  const globalDispatch = useDispatch();
  return (
    <>
      {lodash.map(buttonList, (item) => {
        const defaultTitle = formatMessageApi({ Label_BPM_Button: item?.buttonCode });
        const status = item?.status || defaultStatus[item?.buttonCode];
        const disabled = item?.disabled;
        const currentAuthority = `actionButton${lodash.upperFirst(item.buttonCode)}`;
        if (item?.type === 'upload') {
          return (
            <AuthorizedAtom currentAuthority={currentAuthority} key={item?.key}>
              <Upload
                title={item?.title || defaultTitle}
                className={item?.className}
                status={status}
                icon={item?.icon || item?.buttonCode}
                buttonCode={item?.buttonCode}
                onChange={item?.onChange}
                globalDispatch={globalDispatch}
                multiple={!!item?.multiple}
                disabled={disabled}
              />
            </AuthorizedAtom>
          );
        }
        return (
          <AuthorizedAtom currentAuthority={currentAuthority} key={item?.buttonCode}>
            <ButtonSwitch
              item={item}
              handleClick={() => {
                Loading(item?.action);
              }}
              defaultTitle={defaultTitle}
              disabled={disabled}
            />
          </AuthorizedAtom>
        );
      })}
    </>
  );
};
