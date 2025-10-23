import React from 'react';
import lodash from 'lodash';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from './activity.config';
import { FormAntCard } from 'basic/components/Form';
import SelectForm from './SelectForm';
import styles from './SearchModal.less';

const SearchInsuredModal = () => {
  const dispatch = useDispatch();

  const searchList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchList
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const hideShowModal = () => {
    dispatch({
      type: `${NAMESPACE}/saveSearchList`,
      payload: {
        searchList: [],
      },
    });
  };

  return (
    <div className={styles.itemWrap}>
      {!!editable && (
        <Modal
          visible={!lodash.isEmpty(searchList)}
          footer={null}
          onCancel={() => {
            hideShowModal();
          }}
          width="55%"
          bodyStyle={{
            zIndex: 1000,
          }}
        >
          <div className={styles.container}>
            <FormAntCard title="Search Insured" bordered={false}>
              <SelectForm />
            </FormAntCard>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SearchInsuredModal;
