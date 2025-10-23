import React, { useState } from 'react';
import lodash from 'lodash';
import { history } from 'umi';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { FieldType, ModalTabs } from 'packages/Opus/Enums';
import { getConfigurationItem } from 'packages/Opus/Hooks';
import { quickSearch } from '@/services/dcDashboardControllerService';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button, Icon, Input } from 'opus/Components/Antd';

import { ReactComponent as IconFilter } from 'opus/Assets/icon-filter.svg';

import styles from './SearchInput.less';
import { useDetectClickOutside } from 'opus/Hooks/useDetectClickOutside';

const SearchInput = ({ setTabKey }: any) => {
  const { searchConfigs } = getConfigurationItem({
    modalTabs: ModalTabs.opusAdvancedsearch,
  });
  const [searchContent, setSearchContent] = useState('');
  const [list, setList] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShowContent(false);
    },
  });
  const isSearchActive = window.location.pathname.includes('opus/advancedQuery');
  const dispatch = useDispatch();

  const businessCode = useSelector(({ user }: any) => user?.currentUser?.businessCode) || '';

  const formatMap = [
    {
      mapKey: 'businessNoFlag',
      title: formatMessageApi({
        Label_COM_General: 'BusinessNo',
      }),
      key: 'inquiryBusinessNo',
    },
    {
      mapKey: 'policyNoFlag',
      title: formatMessageApi({
        Label_BIZ_Policy: 'PolicyNo',
      }),
      key: 'policyNo',
    },
    {
      mapKey: 'applicaitionNoFlag',
      title: formatMessageApi({
        Label_COM_General: 'ApplicationNo',
      }),
      key: 'applicaitionNo',
    },
  ];

  const onPush = () => {
    setTabKey('');
    history.push('/opus/advancedQuery');
    dispatch({
      type: 'opusAdvancedSearch/saveResetData',
    });
  };

  const onAdvancedSearch = (key: any, fieldType: any) => {
    onPush();
    if (!!searchContent && key) {
      dispatch({
        type: 'opusAdvancedSearch/saveFilterChoice',
        payload: {
          filterChoice: {
            [key]: { fieldType: String(fieldType), value: searchContent },
          },
        },
      });
      // dispatch({
      //   type: 'opusAdvancedSearch/advancedQuery',
      //   payload: {
      //     categoryCode: '27',
      //   },
      // });
      dispatch({
        type: 'opusAdvancedSearch/saveSearchObj',
        payload: {
          searchNoObj: {
            [key]: searchContent,
          },
        },
      });
    }
  };

  const handleEnter = async () => {
    if (!lodash.trim(searchContent)) {
      onPush();
      return;
    }
    const response = await quickSearch({ businessCode, searchContent });

    if (
      lodash.isPlainObject(response) &&
      !!response?.success &&
      lodash.isPlainObject(response?.resultData)
    ) {
      const data = response?.resultData || {};

      const newList: any =
        lodash
          .chain(formatMap)
          .filter(({ mapKey }: any) => !!data?.[mapKey])
          .map((item) => {
            const matchedConfig = searchConfigs.find(
              (config: any) => config.fieldCode === item.key
            );
            return {
              ...item,
              fieldType: matchedConfig?.fieldType, // 如果找到就加上 fieldType
            };
          })
          .value() || [];

      if (!lodash.isEmpty(newList)) {
        setList(newList);
      } else {
        onPush();
      }
    }
  };

  return (
    <div ref={ref} className={styles.searchWrap}>
      <Input
        placeholder={formatMessageApi({ Label_COM_Opus: 'searchByBusinessNoPolicyNo' })}
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={searchContent}
        className={styles.searchInput}
        onPressEnter={() => {
          handleEnter();
        }}
        onChange={(e: any) => {
          setSearchContent(e.target.value || '');
          setList([]);
          setShowContent(true);
        }}
        onFocus={() => setShowContent(true)}
      />
      <Button
        className={classNames(styles.searchButton, isSearchActive && styles.active)}
        onClick={() => {
          onAdvancedSearch('');
        }}
      >
        <Icon component={IconFilter} />
        {formatMessageApi({ Label_BPM_Button: 'AdvanceSearch' })}
      </Button>
      {!lodash.isEmpty(list) && !lodash.isEmpty(searchContent) && showContent && (
        <div className={styles.multipleWrap}>
          {lodash.map(list, ({ title, key, fieldType }: any) => (
            <div
              key={key}
              className={styles.queryResult}
              onClick={() => {
                onAdvancedSearch(key, fieldType);
              }}
            >
              <div className={styles.searchResult}>{searchContent}</div>
              <div> {title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
