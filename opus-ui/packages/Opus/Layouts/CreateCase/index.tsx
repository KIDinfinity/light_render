import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { setPreHistory } from '@/utils/cache';
import { Menu, Button, Dropdown } from 'opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as IconCreateCase } from 'opus/Assets/create-case.svg';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import { NAMESPACE as opusBatchCaseCreation } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';

import BatchCaseCreation from 'opus/Pages/Process/Claim/BatchCaseCreation';
import { history } from 'umi';
import CaseCategory from 'enum/CaseCategory';
import classNames from 'classnames';
const CreateCase = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const caseCategoryList =
    useSelector(({ opusHome }: any) => opusHome?.caseCategoryList, shallowEqual) || [];
  const dispatch = useDispatch();
  const getCaseCategoryList = async () => {
    await dispatch({
      type: `${NAMESPACE}/getCaseCategoryList`,
    });
  };
  useEffect(() => {
    getCaseCategoryList();
  }, []);

  const handleCreateCase = async (item: any) => {
    if (item?.dictCode === CaseCategory.JP_CLM_CTG006) {
      dispatch({
        type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
      });
      dispatch({
        type: `${opusBatchCaseCreation}/uploadDocumentsVisible`,
      });
      return;
    }
    setCreateLoading(true);
    const res = await dispatch({
      type: `${NAMESPACE}/createCase`,
      payload: {
        caseCategory: item?.dictCode,
      },
    });
    if (!!res) {
      setPreHistory();
      history.push(`/opus/process/task/detail/${res?.resultData?.taskId}`);
    }
    setCreateLoading(false);
  };
  const menu = (
    <Menu>
      {caseCategoryList.map((item: any) => (
        <Menu.Item key={item?.id} onClick={() => handleCreateCase(item)}>
          {item?.dictName}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.createCase}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          loading={createLoading}
          className={classNames('ant-dropdown-link', styles.dropdown)}
          onClick={(e) => e.preventDefault()}
        >
          {!createLoading && <IconCreateCase />}
          <span>{formatMessageApi({ Label_COM_Opus: 'createCase' })}</span>
        </Button>
      </Dropdown>
      <BatchCaseCreation />
    </div>
  );
};
export default CreateCase;
