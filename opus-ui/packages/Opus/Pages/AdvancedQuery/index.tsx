import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import Filter from 'opus/Components/Filter';
import TaskTable from 'packages/Opus/Components/TaskTable';
import { FieldType, ModalTabs } from 'packages/Opus/Enums';
import { getConfigurationItem } from 'packages/Opus/Hooks';
import React, { useEffect } from 'react';
import Header from './Header';
import classnames from 'classnames';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Region, tenant } from '@/components/Tenant';

export default () => {
  const dispatch = useDispatch();

  const { resultConfigs, searchConfigs, categoryCode, configName } = getConfigurationItem({
    modalTabs: ModalTabs.opusAdvancedsearch,
  });

  const {
    current,
    filterDatas,
    total,
    list = [],
    showFilter,
    filterChoice,
  } = useSelector(({ opusAdvancedSearch }: any) => opusAdvancedSearch?.taskData) || {};

  const sorterParamsForfilterChoice =
    useSelector(({ opusAdvancedSearch }: any) => opusAdvancedSearch?.sorterParamsForfilterChoice) ||
    {};

  const searchNoObj =
    useSelector(({ opusAdvancedSearch }: any) => opusAdvancedSearch?.searchNoObj) || {};

  const tableLoading = useSelector(
    (state: any) => state.loading.effects['opusAdvancedSearch/advancedQuery']
  );

  useEffect(() => {
    if (!!showFilter && !lodash.isEmpty(searchConfigs) && tenant.region() !== Region.HK) {
      searchConfigs.forEach(({ fieldType, fieldCode, dictTypeCode }: any) => {
        if (String(fieldType) === FieldType.Select) {
          if (fieldCode === 'assignee') {
            dispatch({
              type: 'opusAdvancedSearch/getUserList',
            });
          } else {
            dispatch({
              type: 'opusAdvancedSearch/saveFilterDatas',
              payload: {
                [fieldCode]: getDrowDownList(dictTypeCode),
              },
            });
          }
        }
      });
    }
  }, [searchConfigs, showFilter]);

  useEffect(() => {
    if (!lodash.isEmpty(searchConfigs) && tenant.region() === Region.HK) {
      searchConfigs.forEach(({ fieldType, fieldCode, dictTypeCode }: any) => {
        if (String(fieldType) === FieldType.Select) {
          if (fieldCode === 'assignee') {
            dispatch({
              type: 'opusAdvancedSearch/getUserList',
            });
          } else {
            dispatch({
              type: `opusAdvancedSearch/getFilterDatas`,
              payload: {
                fieldName: fieldCode,
                categoryCode,
                isHK: true,
              },
            });
          }
        }
      });
    }
  }, [searchConfigs]);

  const taskProps = {
    total,
    current,
    list,
    loading: tableLoading,
    configName,
    categoryCode,
    configs: resultConfigs,
    rowKey: 'caseNo',
    advancedQuery: true,
    saveSorterInfofun: (SorterdInfoForApply: any) => {
      dispatch({
        type: 'opusAdvancedSearch/saveSortedInfoForApply',
        payload: SorterdInfoForApply,
      });
    },
  };

  const filterData = {
    showErrorIcon: true,
    showFilter,
    searchConfigs,
    filterDatas,
    defaultSearchNoObj: searchNoObj,
    filterChoice,
    handleClose: () => {
      dispatch({
        type: `opusAdvancedSearch/saveShowFilter`,
        payload: {
          showFilter: false,
        },
      });
    },
    handleApply: async (filterChoice: any) => {
      // await dispatch({
      //   type: 'opusAdvancedSearch/saveFilterChoice',
      //   payload: {
      //     filterChoice,
      //   },
      // });

      dispatch({
        type: 'opusAdvancedSearch/advancedQuery',
        payload: {
          categoryCode,
          extraParams: { ...sorterParamsForfilterChoice, params: { ...filterChoice } },
        },
      });
    },
    setFilterChoice: (filterChoice: any) => {
      dispatch({
        type: `opusAdvancedSearch/saveFilterChoice`,
        payload: {
          filterChoice,
        },
      });
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{formatMessageApi({ Label_COM_Opus: 'SearchResults' })}</div>
      <div className={styles.main}>
        <div className={styles.header}>
          {formatMessageApi({ Label_COM_Opus: 'Results' }, total)}
        </div>

        <div className={classnames(styles.caseWrap, lodash.isEmpty(list) && styles.disableSorter)}>
          <Header showExport={!lodash.isEmpty(list)} />
          <TaskTable
            {...taskProps}
            hasRowSelect={false}
            handleChange={(extraParams: any) => {
              dispatch({
                type: 'opusAdvancedSearch/advancedQuery',
                payload: {
                  categoryCode,
                  extraParams: {
                    ...extraParams,
                    params: { ...filterChoice },
                  },
                },
              });
            }}
          />
        </div>
        <Filter {...filterData} />
      </div>
    </div>
  );
};
