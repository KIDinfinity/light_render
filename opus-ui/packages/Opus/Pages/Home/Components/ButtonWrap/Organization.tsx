import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Select, TreeSelect } from 'opus/Components/Antd';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import React, { useMemo } from 'react';
import styles from './index.less';

const { Option } = Select;

const { TreeNode } = TreeSelect;

export default () => {
  const dispatch = useDispatch();

  const organizationList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationList) || [];
  const organizationCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode
  );

  const treeData = useMemo(() => {
    const getItem: any = ({
      organizationCode: newOrganizationCode,
      organizationName,
      children = [],
    }: any) => {
      return {
        title: organizationName,
        value: newOrganizationCode,
        children: lodash.map(children, (item: any) => getItem(item)),
      };
    };
    return lodash.map(organizationList, (item: any) => getItem(item));
  }, []);

  return (
    <TreeSelect
      value={organizationCode}
      className={styles.organizationWrap}
      treeData={treeData}
      placeholder={formatMessageApi({ Label_COM_Opus: 'PleaseSelect' })}
      allowClear
      treeDefaultExpandAll
      onChange={async (value: any) => {
        await dispatch({
          type: `${NAMESPACE}/saveOrganizationCode`,
          payload: {
            organizationCode: value,
          },
        });
        dispatch({
          type: `${NAMESPACE}/getTeamSummary`,
        });
        dispatch({
          type: `${NAMESPACE}/getResources`,
        });
      }}
    />
  );
};
