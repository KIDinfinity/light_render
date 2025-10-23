import React from 'react';
import { useDispatch } from 'dva';
import { Icon } from 'antd';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import AuthorisedPersonItem from './AuthorisedPersonItem';
import styles from './index.less';
import { ReactComponent as CareerIcon } from 'opus/Assets/career.svg';
import useGetAuthorizedPersonList from '../../../../_hooks/useGetAuthorisedPersonList';
import useDefaultAuthorisedPersonWithInsured from '../../../../_hooks/useDefaultAuthorisedPersonWithInsured';

const AddButton = () => {
  const dispatch = useDispatch();

  const authorisedPersonList = useGetAuthorizedPersonList({ mode: 'edit' });

  const addAuthorisedPerson = () => {
    dispatch({
      type: `${NAMESPACE}/addAuthorisedPerson`,
    });
  };

  return (
    <>
      {authorisedPersonList.length < 2 && (
        <div className={styles.addButton}>
          <div className={styles.addItem} onClick={addAuthorisedPerson}>
            <Icon type="plus" /> Add Authorised Person
          </div>
        </div>
      )}
    </>
  );
};

export default ({ clientId }: any) => {
  const authorisedPersonList = useGetAuthorizedPersonList({ mode: 'edit' });

  useDefaultAuthorisedPersonWithInsured();

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <CareerIcon />
        </div>
        <AddButton />
      </div>
      {authorisedPersonList?.map((id: string) => {
        return <AuthorisedPersonItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
