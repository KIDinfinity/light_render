import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import classnames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import useGetPendingMemoFieldsRequired from 'bpm/pages/Envoy/hooks/useGetPendingMemoFieldsRequired';
import getFilterMemoCodeList from 'bpm/pages/Envoy/_utils/getFilterMemoCodeList';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import AutoCompleteItem from 'basic/components/Form/FormItem/FormItemAutoComplete/AutoCompleteItem';
import SelectFormItem from '../SelectFormItem';
import EnvoyInput from '../EnvoyInput';
import MemoTextAreaForm from './MemoTextAreaForm';
import { ReactComponent as DeleteIcon } from '../../Assets/delete.svg';
import { ReactComponent as DeleteDisabledIcon } from '../../Assets/deleteDisabled.svg';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import type { ReasonDisplayConfig } from 'bpm/pages/Envoy/dtos/EnvoyDisplayConfig';
import useHandleChangeMemoFieldsCallback from 'bpm/pages/Envoy/hooks/useHandleChangeMemoFieldsCallback';

const Reason = ({ data: reason, groupCode, groupIdx, activePermission }: any) => {
  const { globalEditAuth, errorInfo } = useSelector(
    (state: any) => ({
      globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
      ...lodash.pick(state.envoyController, ['errorInfo']),
    }),
    shallowEqual
  );

  const reasonDisplayConfig: ReasonDisplayConfig = reason?.displayConfig;
  const fieldsRequired = useGetPendingMemoFieldsRequired({ displayConfig: reasonDisplayConfig });
  const listMemos =
    useSelector((state: any) => state.envoyController.listMemos[reason?.reasonCode]) || [];

  const options = {
    globalAuth: globalEditAuth,
    selfAuth: lodash.get(reason.envoyAuth, ESelfAuthCode.EDIT),
    status: reason?.status,
  };

  const disabled =
    !reasonDisplayConfig?.pendingMemo?.editable ||
    notAuthOrDraftReason(options) ||
    !activePermission;
  const dispatch = useDispatch();

  const saveReasonMemoCode = useHandleChangeMemoFieldsCallback({
    reasonId: reason?.id,
    reasonGroupId: reason?.groupId,
    groupCode,
    groupIdx,
  });
  const memoDisplayConfig = reasonDisplayConfig?.pendingMemo?.children || {};

  const extra =
    memoDisplayConfig?.showRemark || memoDisplayConfig.memoRemark
      ? {
          pendingMemoSubInfoList: [{ subTypeCode: '' }],
        }
      : {};

  const addMemo = async () => {
    if (disabled) return;

    await dispatch({
      type: 'envoyController/saveTplDetail',
      payload: {
        type: 'reason',
        tplCtn: {
          ...reason,
          pendingMemoList: [
            ...(reason?.pendingMemoList || []),
            {
              memoCode: undefined,
              memoDesc: undefined,
              pendingDate: moment().format(),
              id: uuidv4(),
              ...extra,
            },
          ],
        },
      },
    });
  };

  const onDelete = async (id: number) => {
    if (id) {
      await dispatch({
        type: 'envoyController/saveTplDetail',
        payload: {
          type: 'reason',
          tplCtn: {
            ...reason,
            pendingMemoList: reason?.pendingMemoList?.filter(
              (item: any, index: any) => item.id !== id
            ),
          },
        },
      });
    }
  };

  const memoList = reason?.pendingMemoList?.map((memo, index: number) => {
    const filterMemoCodeList = getFilterMemoCodeList({
      pendingMemoList: reason?.pendingMemoList,
      thisItem: reason?.pendingMemoList[`${index}`] || {},
      listMemos,
    });

    const showRemark = memo.showRemark || memo.pendingMemoSubInfoList?.[0]?.subRemark;

    const surveyCompanyErrMsg = lodash.get(
      findObj(errorInfo, reason?.id),
      `pendingMemoList{${index}}_surveyCompany`
    );
    const surveyCompanydicts = getDrowDownList('DropDown_ENV_SurveyCompany').map(
      ({ dictCode, dictName }: any) => ({
        value: dictCode,
        text: dictName,
      })
    );

    return (
      <div className={classnames(styles.pendingMemoWrapper)} key={memo.id || index}>
        <SelectFormItem
          idx={index}
          data={reason}
          fileKey={'memoCode'}
          title={formatMessageApi({ Label_Sider_Envoy: 'pendingCode' })}
          disabled={disabled}
          errorInfo={errorInfo}
          required={fieldsRequired?.memoCode}
          displayConfig={memoDisplayConfig}
          saveReasonMemoCode={saveReasonMemoCode}
          selectObj={{
            list: filterMemoCodeList,
            key: 'memoCode',
            name: 'memoName',
          }}
          classId={'memoCode'}
          optionLabelProp={!tenant.isID() && 'value'}
          optionShowType={tenant.region({
            [Region.HK]: 'name',
            [Region.VN]: 'name',
            [Region.TH]: 'keyAndDesc',
            [Region.JP]: 'keyAndDesc',
            [Region.MY]: 'name',
            [Region.ID]: 'name',
            [Region.KH]: 'name',
            [Region.PH]: 'name',
            notMatch: 'both',
          })}
          dropdownMatchSelectWidth={false}
          dropdownStyle={{
            maxWidth: '35vw',
          }}
        />
        <div>
          <MemoTextAreaForm
            displayConfig={memoDisplayConfig}
            data={reason}
            idx={index}
            disabled={disabled}
            showMemoRemark={memoDisplayConfig?.showRemark}
            errorInfo={errorInfo}
            fieldsRequired={fieldsRequired}
          />
          {memoDisplayConfig?.surveyCompany && (
            <div className={styles.secondRowWrapper}>
              <EnvoyInput title={formatMessageApi({ Label_Sider_Envoy: 'surveyCompany' })}>
                {surveyCompanyErrMsg?.length ? <LabelTip title={surveyCompanyErrMsg} /> : null}
                <AutoCompleteItem
                  disabled={disabled}
                  value={memo.surveyCompany}
                  allowClear
                  dataSource={surveyCompanydicts}
                  onSearch={() => surveyCompanydicts}
                  required={fieldsRequired?.surveyCompany}
                  maxLength={99}
                  onSelect={(value: string) => {
                    saveReasonMemoCode([`pendingMemoList{${index}}_surveyCompany`], value);
                  }}
                  onChange={(value: string) => {
                    saveReasonMemoCode([`pendingMemoList{${index}}_surveyCompany`], value);
                  }}
                  isDecorator={true}
                  setVisible={() => {}}
                  getPopupContainer={() => document.body}
                />
              </EnvoyInput>
            </div>
          )}
        </div>
        <div className={styles.iconCol}>
          {!disabled && (
            <DeleteButton
              icon={
                disabled || reason?.pendingMemoList?.length < 2 ? DeleteDisabledIcon : DeleteIcon
              }
              className={classnames(
                (disabled || reason?.pendingMemoList?.length < 2) && styles.disableCursor
              )}
              disabled={disabled || reason?.pendingMemoList?.length < 2}
              handleDelete={() => onDelete(memo?.id)}
            />
          )}
          {!memoDisplayConfig?.showRemark && memoDisplayConfig?.memoRemark && (
            <Icon
              type={!showRemark ? 'plus' : 'minus'}
              className={styles.primaryColor}
              onClick={() => {
                dispatch({
                  type: 'envoyController/toggleRemark',
                  payload: {
                    id: memo.id,
                    showRemark: !showRemark,
                  },
                });
              }}
            />
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      {memoList}
      {reason.displayConfig?.pendingMemo && !disabled && (
        <div
          className={classnames(styles.gapRow, disabled && styles.disableCursor)}
          onClick={addMemo}
        >
          <Icon type={'plus'} />
          {formatMessageApi({ Label_Sider_Envoy: 'addCode' })}
        </div>
      )}
    </>
  );
};

export default Reason;
