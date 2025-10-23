import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionBorder from '../SectionBorder';
import Header from './Header';
import Condition from './Condition';
import { Type, AddType, ValidateKey, ButtonType } from '../../../Enum';

export default ({ form }: any) => {
  const dispatch = useDispatch();
  const editData = useSelector((state: any) => state.ruleEngineController.editData);

  const onAdd = async (key: any) => {
    switch (key) {
      case ButtonType.NEW:
        dispatch({
          type: 'ruleEngineController/addCondition',
        });
        break;
      case ButtonType.FREE:
        dispatch({
          type: 'ruleEngineController/addCondition',
        });
        break;
      case ButtonType.SEARCH:
        await dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.Conditions,
          },
        });
        break;
      case ButtonType.ADD:
        // eslint-disable-next-line no-case-declarations
        const errors = await dispatch({
          type: 'ruleEngineController/validateEditAddLibraryData',
          payload: {
            validateKey: ValidateKey.Condition,
          },
        });

        if (!errors?.length) {
          dispatch({
            type: 'ruleEngineController/addEditToLibrary',
            payload: {
              editData,
              code: AddType.Conditions,
            },
          });
        }

        break;

      default:
        break;
    }
  };
  const onDelete = (item: any) => {
    dispatch({
      type: 'ruleEngineController/removeCondition',
      payload: {
        ...item,
      },
    });
  };
  const onUnBind = (item: any) => {
    dispatch({
      type: 'ruleEngineController/saveConditionUnBind',
      payload: {
        data: { editData, id: item.id },
      },
    });
  };
  const dataList = lodash.compact(editData?.conditions);
  return (
    <SectionBorder
      title={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.conditions' })}
    >
      <Header form={form} onAdd={onAdd} />
      {lodash.map(dataList, (item: any) => (
        <Condition
          key={item.id}
          item={item}
          type={Type.BasicRule}
          dataLength={dataList.length}
          onUnBind={onUnBind}
          onDelete={onDelete}
        />
      ))}
    </SectionBorder>
  );
};
