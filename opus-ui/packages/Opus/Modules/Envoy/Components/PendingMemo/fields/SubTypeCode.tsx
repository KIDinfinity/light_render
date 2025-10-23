import React, { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import EnvoyInput from '../../EnvoyInput';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import styles from './subtypeCode.less';
import { FormItemSelect } from 'basic/components/Form';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';

export default function SubTypeCode({ idx, disabled, data, form, fieldsRequired, errorInfo }: any) {
  const dispatch = useDispatch();
  const reasonCode = data?.reasonCode;
  const memoCode = data?.pendingMemoList?.[idx]?.memoCode;
  const subTypeCode = data?.pendingMemoList?.[idx]?.pendingMemoSubInfoList?.length
    ? data.pendingMemoList[idx].pendingMemoSubInfoList[0]?.subTypeCode
    : '';

  const allMemoSubTypeList = useSelector((state: any) => state.envoyController.memoSubTypeList);
  const listMemos = useSelector((state: any) => state.envoyController.listMemos[reasonCode]) || [];
  const memoSubTypeCodes = lodash.find(
    listMemos,
    (item) => item.memoCode === memoCode
  )?.memoSubTypeCodes;
  const subTypeList =
    allMemoSubTypeList?.[`${data?.reasonCode}_${data?.pendingMemoList?.[idx]?.memoCode}`];
  const selectObj = useMemo(() => {
    if (subTypeList) {
      return lodash.map(lodash.cloneDeep(subTypeList), (item) => {
        item.dictCode = item?.memoSubTypeCode;
        item.dictName = item?.memoCode
          ? formatMessageApi({ DropDown_ENV_MemoReasonDescription: item?.memoSubTypeCode })
          : '';

        return item;
      });
    }

    return [];
  }, [subTypeList]);

  const subTypeCodeErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subTypeCode`
  );

  const saveMemoReason = ({
    memoIdx,
    index,
    field,
    value,
    selects = selectObj,
    isSetDefaultVal = true,
  }: {
    memoIdx: number;
    index: number;
    field: string;
    selects?: any[];
    value?: any;
    isSetDefaultVal?: boolean;
  }) => {
    //for clear val
    const _value = isSetDefaultVal ? (value ? value : selects?.[0]?.memoSubTypeCode) : value;
    dispatch({
      type: 'envoyController/saveMemoReason',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        memoIdx,
        index,
        field,
        // 选了memoCode, subTypeCode / subTypeCode desc 要预设值
        value: _value,
        memoSubTypeDesc:
          lodash.find(selects, (item) => item.memoSubTypeCode === _value)?.memoSubTypeDesc || '',
      },
    });

    dispatch({
      type: 'envoyController/validateFields',
      payload: {
        dataId: data?.groupId,
      },
    });
  };

  const isHasSubTypeList = subTypeList?.length;
  useEffect(() => {
    async function fetchSubTypeCode() {
      await dispatch({
        type: 'envoyController/getMemoSubTypeList',
        payload: {
          memoSubTypeCodes,
          reasonCode,
          memoCode,
        },
      });
    }

    if (!isHasSubTypeList && reasonCode && memoCode) {
      fetchSubTypeCode();
    }
  }, [isHasSubTypeList, dispatch, memoCode, memoSubTypeCodes, reasonCode]);

  useEffect(() => {
    if (isHasSubTypeList && !subTypeCode && subTypeList?.length === 1) {
      saveMemoReason({ memoIdx: idx, index: 0, field: 'subTypeCode' });
    }
    //saveMemoReason不做依赖
  }, [idx, memoCode, isHasSubTypeList, subTypeCode]);

  const extraProps = tenant.region({
    [Region.TH]: {
      optionShowType: 'both',
      optionLabelProp: 'value',
    },
    notMatch: {},
  });

  return (
    <>
      <EnvoyInput
        title={formatMessageApi({
          Label_Sider_Envoy: tenant.isTH() ? 'memoReason' : 'pendingDesc',
        })}
        className={styles.subTypeCode}
      >
        {subTypeCodeErrorMessage?.length ? <LabelTip title={subTypeCodeErrorMessage} /> : null}

        <FormItemSelect
          dicts={selectObj}
          disabled={disabled}
          key={memoCode}
          form={form}
          formName={`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subTypeCode`}
          labelId={''}
          required={fieldsRequired?.subTypeCode?.required}
          isInline
          getPopupContainer={() => document.body}
          {...extraProps}
          onChange={(value: any) => {
            saveMemoReason({
              memoIdx: idx,
              index: 0,
              field: 'subTypeCode',
              value,
              selects: selectObj,
              isSetDefaultVal: false,
            });
          }}
        />
      </EnvoyInput>
    </>
  );
}
