import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useFilterAuthorisedSignatoryClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterAuthorisedSignatoryClientDetailList';
import useFilterFamilyGroupClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterFamilyGroupClientDetailList';
import { NAMESPACE } from '../../activity.config';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import CaseCategory from 'enum/CaseCategory';
import Item from './Item';
import AddButton from './AddButton';
import styles from './index.less';

const ClientSelect = ({ mode, expendStatus }: any) => {
  const filteredList = useFilterAuthorisedSignatoryClientDetailList();
  const list = useFilterFamilyGroupClientDetailList(filteredList);

  const expendedClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expendedClient,
    shallowEqual
  );
  const { caseCategory } = useGetProcessInfo();
  return (
    <div className={classnames(styles.clientDetailList, styles['black-scroll'])}>
      {lodash
        .chain(list)
        .filter((item: any) => item?.deleted !== 1)
        .filter(() => !expendStatus)
        .filter((item: any, index: number) => {
          if (expendedClient) {
            return item.id !== expendedClient;
          }
          if (mode === Mode.Edit) {
            return index > 0;
          }
          return index > 1;
        })
        .map((item: any) => {
          return (
            <div key={item.id}>
              <Item info={item} mode={mode} />
            </div>
          );
        })
        .value()}
      {mode === Mode.Edit && caseCategory !== CaseCategory.BP_NB_CTG003 && (
        <div>
          <AddButton />
        </div>
      )}
    </div>
  );
};

ClientSelect.displayName = 'ClientSelect';
export default ClientSelect;
