import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Icon } from 'antd';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import DirectorItem from './DirectorItem';
import styles from './index.less';
import { ReactComponent as CareerIcon } from 'opus/Assets/career.svg';
import useGetDirectorList from '../../../../_hooks/useGetDirectorList';
import useGetControllingPersonList from '../../../../_hooks/useGetControllingPersonList';
import { formUtils } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';

const AddButton = ({ clientId }: any) => {
  const dispatch = useDispatch();

  const companyLegalForm = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return formUtils.queryValue(
      modelnamespace.modalData.entities?.clientMap?.[clientId].companyLegalForm
    );
  });

  const controllingPersonList = useGetControllingPersonList({ mode: 'edit' });
  const directorList = useGetDirectorList({ mode: 'edit' });

  const addDirectorInfo = () => {
    dispatch({
      type: `${NAMESPACE}/addDirectorInfo`,
    });
  };

  const addControllingPerson = () => {
    dispatch({
      type: `${NAMESPACE}/addControllingPerson`,
    });
  };

  return (
    <div className={styles.addButton}>
      {directorList.length < 11 && (
        <div className={styles.addItem} onClick={addDirectorInfo}>
          <Icon type="plus" /> Add Director
        </div>
      )}
      {controllingPersonList.length < 1 && companyLegalForm === BooleanEnum.No && (
        <div className={styles.addItem} onClick={addControllingPerson}>
          <Icon type="plus" /> Add Controlling Person
        </div>
      )}
    </div>
  );
};

export default ({ clientId }: any) => {
  const directorList = useGetDirectorList({ mode: 'edit' });

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <CareerIcon />
        </div>
        <AddButton clientId={clientId} />
      </div>
      {directorList?.map((id: string) => {
        return <DirectorItem clientId={clientId} id={id} key={id} />;
      })}
    </div>
  );
};
