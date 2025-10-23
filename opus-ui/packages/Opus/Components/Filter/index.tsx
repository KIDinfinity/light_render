import React, { useState, useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import moment from 'moment';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import { Icon } from 'opus/Components/Antd';

import { FieldType } from 'packages/Opus/Enums';

import { ReactComponent as IconNotice } from 'opus/Assets/icon-notice.svg';

import Buttons from './Buttons';
import FilterList from './FilterList';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { ReactComponent as IconFilter } from 'opus/Assets/icon-filter.svg';
import { ReactComponent as CloseIcon } from 'packages/Opus/Assets/icon-close.svg';

import styles from './index.less';
import { Region, tenant } from '@/components/Tenant';

export const formateFilterChoiceData = (data: any) => {
  return lodash
    .chain(lodash.keys(data) || [])
    .reduce((obj: any, key: any) => {
      const { fieldType, value } = data?.[key] || {};

      const configsValue = {
        [FieldType.Date]: [
          moment(value?.[0]).format('YYYY-MM-DD'),
          moment(value?.[1]).format('YYYY-MM-DD'),
        ],
        [FieldType.DateTime]: [
          moment(value?.[0]).format('YYYY-MM-DD'),
          moment(value?.[1]).format('YYYY-MM-DD'),
        ],
        [FieldType.Select]: lodash.isArray(value) ? value?.join() : value,
        checkBox: lodash.isArray(value) ? value?.join() : value,
        [FieldType.InputNumberRange]: [
          lodash.isEmpty(value?.[0]) ? '-' : value[0],
          lodash.isEmpty(value?.[1]) ? '-' : value[1],
        ],
      };

      return {
        ...obj,
        [key]: configsValue?.[String(fieldType)] || value,
      };
    }, {})
    .value();
};

const Main = ({
  filterChoice: filterChoiceProp,
  setFilterChoice: setFilterChoiceProp,
  showFilter,
  defaultSearchNoObj,
  handleClose,
  handleApply,
  searchConfigs = [],
  filterDatas,
  userdrowDown = false,
  myTaskTab,
}: any) => {
  const [filterChoiceLocal, setFilterChoiceLocal] = useState({});
  const [errorList, setErrorList] = useState<any>([]);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const dispatch = useDispatch();

  const filterChoice = setFilterChoiceProp ? filterChoiceProp : filterChoiceLocal;
  const setFilterChoice = setFilterChoiceProp ? setFilterChoiceProp : setFilterChoiceLocal;

  useEffect(() => {
    setShowErrorMessage(false);
  }, [showFilter]);

  useEffect(() => {
    if (!lodash.isEmpty(defaultSearchNoObj)) {
      setFilterChoice(
        lodash
          .chain(lodash.keys(defaultSearchNoObj))
          .reduce((obj: any, key: any) => {
            return {
              ...obj,
              [key]: {
                fieldType: '1',
                value: defaultSearchNoObj?.[key],
              },
            };
          }, {})
          .value() || {}
      );
    }
  }, []);

  const list = useMemo(() => {
    return lodash
      .chain(searchConfigs)
      .map((el: any) => {
        let dicts: any = [];
        if (String(el?.fieldType) === FieldType.Select) {
          if (!!userdrowDown) {
            dicts = getDrowDownList(el.dictTypeCode);
          } else {
            dicts = filterDatas?.[el?.fieldCode];
          }
        }

        if (el.fieldCode === 'priority' && tenant.region() !== Region.HK) {
          dicts = [
            {
              dictCode: 0,
              dictName: t('normal'),
            },
            {
              dictCode: 1,
              dictName: t('urgent'),
            },
          ];
        }
        return {
          ...el,
          dicts,
          fieldType:
            String(el?.fieldType) === FieldType.Select
              ? lodash.size(dicts) > 5 || lodash.size(dicts) === 0
                ? el.fieldType
                : 'checkBox'
              : el.fieldType,
        };
      })
      .value();
  }, [searchConfigs, filterDatas]);

  return !!showFilter ? (
    <div className={styles.filterWrap}>
      <div className={styles.headerWrap}>
        <Icon component={IconFilter} className={styles.filterIcon} />
        <span className={styles.title}>{formatMessageApi({ Label_BPM_Button: 'Filter' })}</span>
        <Icon
          component={CloseIcon}
          className={styles.closeIcon}
          onClick={() => {
            setShowErrorMessage(false);
            handleClose();
          }}
        />
      </div>
      <Buttons
        handleApply={() => {
          const formatData = formateFilterChoiceData(filterChoice);
          const formatDataIsEmpty = lodash.isEmpty(formatData);
          setShowErrorMessage(formatDataIsEmpty);
          if (errorList?.length === 0 && !formatDataIsEmpty) {
            handleApply(formatData);
          }
        }}
        handleClear={() => {
          setFilterChoice({});
          dispatch({
            type: 'opusAdvancedSearch/saveSearchObj',
            payload: {
              searchNoObj: {},
            },
          });
        }}
      />

      {!!showErrorMessage && (
        <div className={styles.noticeWrap}>
          <Icon component={IconNotice} className={styles.Icon} />
          {formatMessageApi({ Label_COM_WarningMessage: 'MSG_001133' })}
        </div>
      )}

      <FilterList
        showErrorMessage={showErrorMessage}
        filterChoice={filterChoice}
        setFilterChoice={setFilterChoice}
        list={list}
        filterDatas={filterDatas}
        errorList={errorList}
        setErrorList={setErrorList}
      />
    </div>
  ) : null;
};

export default Main;
