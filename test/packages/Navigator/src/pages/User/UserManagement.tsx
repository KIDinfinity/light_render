import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'dva';
import { useParams } from 'umi';
import LeftMenu from './_components/LeftMenu';
import BasicInfo from './BasicInfo';
import Permission from './Permission';
import Customization from './Customization';
import styles from './UserManagement.less';
import classnames from 'classnames';

interface IProps {
  match: any;
}

export default ({ match }: IProps) => {
  const params = useParams();
  const dispatch = useDispatch();

  const model = params?.model

  useEffect(() => {
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: true,
        },
      });

      dispatch({
        type: 'userManagement/clearUserManagementReducer',
      });
    };
  }, []);

  const renderModel = useMemo(() => {
    switch (model) {
      case 'permission':
        return <Permission />;
      case 'basicInfo':
        return <BasicInfo />;
      case 'customization':
        return <Customization />;
      default:
        return <BasicInfo />;
    }
  }, [model]);
  return (
    <div className={classnames(styles.container, 'guidance-theme-user-box')}>
      <LeftMenu model={model} />
      <div className={styles.content}>{renderModel}</div>
    </div>
  );
};
