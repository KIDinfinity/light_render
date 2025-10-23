import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { useDispatch } from 'dva';
import { ReactComponent as ChartBarIcon } from 'opus/Assets/icon-chart-bar.svg';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { localConfig } from 'opus/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ExpandableCard from '../../_components/ExpandableCard';
import OptionType from '../../_enum/OptionType';
import Edit from './Edit';
import {
  useAllFundInfoList,
  useCurrencyCode,
  useFundBaseInfo,
  useFundTableConfigWithFilter,
  useFundVisible,
  useProductCodeList,
} from './hooks';
import styles from './index.less';
import Show from './Show';

// policyList[0].coverageList[0].coverageFundInfoList[0]
// modelNamespace.allFundConfigList
const Fund = () => {
  const dispatch = useDispatch();

  const isFundVisible = useFundVisible();
  const fundInfoList = useAllFundInfoList();
  const fundBaseInfo = useFundBaseInfo();
  const currencyCode = useCurrencyCode();
  const productCodeList = useProductCodeList();
  const config = useGetSectionAtomConfig({ localConfig, section: 'Fund-Table' });
  const configWithAllocationFilter = useFundTableConfigWithFilter(fundInfoList, config);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/fetchProductCodeList`,
      payload: {
        currencyCode,
        productCodeList,
      },
    });
  }, [currencyCode, dispatch, productCodeList]);

  if (!isFundVisible) return null;
  return (
    <ExpandableCard
      title={formatMessageApi({
        Label_BIZ_FND: 'FundSelection',
      })}
      icon={ChartBarIcon}
      errorBoundaryName="Fund"
      contentClassName={styles.cardContent}
      editModalProps={{
        onAfterConfirm: async () => {
          dispatch({
            type: `${NAMESPACE}/setFundProcessData`,
          });
          const result: boolean = await dispatch<any>({
            type: `${NAMESPACE}/submit`,
            payload: {
              type: OptionType.fund,
              formKeys: ['Fund-Field', 'Fund-Table'],
            },
          });
          return result;
        },
        onBeforeOpen: async () => {
          dispatch({
            type: `${NAMESPACE}/setFundList`,
            payload: {
              fundList: [
                ...fundInfoList,
                {
                  id: uuid(),
                  isLast: true,
                },
              ],
            },
          });
          dispatch({
            type: `${NAMESPACE}/setFundInfo`,
            payload: {
              changedFields: {
                ...fundBaseInfo,
              },
            },
          });
          dispatch({
            type: `${NAMESPACE}/alignFundTotal`,
            payload: {
              config: configWithAllocationFilter,
            },
          });
        },
        onBeforeBack: async () => {},
        children: <Edit />,
      }}
    >
      <Show fundInfo={fundBaseInfo} fundList={fundInfoList} />
    </ExpandableCard>
  );
};

Fund.displayName = 'fund';
export default Fund;
