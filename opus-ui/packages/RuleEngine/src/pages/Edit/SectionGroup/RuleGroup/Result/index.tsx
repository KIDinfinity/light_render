import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionBorder from '../SectionBorder';
import Condition from './Condition';
import Header from './Header';
import { Type, AddType, ValidateKey, ButtonType } from '../../../Enum';

export default ({ form }: any) => {
  const dispatch = useDispatch();
  const editData = useSelector((state: any) => state.ruleEngineController.editData);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);

  const onAdd = async (key: any) => {
    switch (key) {
      case ButtonType.NEW:
        dispatch({
          type: 'ruleEngineController/addResult',
        });
        break;
      case ButtonType.SEARCH:
        await dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.Results,
          },
        });
        break;
      case ButtonType.ADD:
        // eslint-disable-next-line no-case-declarations
        const errors = await dispatch({
          type: 'ruleEngineController/validateEditAddLibraryData',
          payload: {
            validateKey: ValidateKey.Result,
          },
        });
        if (!errors?.length) {
          dispatch({
            type: 'ruleEngineController/addEditToLibrary',
            payload: {
              editData,
              code: AddType.Results,
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
      type: 'ruleEngineController/removeResult',
      payload: {
        ...item,
      },
    });
  };
  const onUnBind = (item: any) => {
    dispatch({
      type: 'ruleEngineController/saveResultUnBind',
      payload: {
        data: { editData, id: item.id },
      },
    });
  };

  const dataList = lodash.compact(editData?.results);
  return (
    <SectionBorder
      title={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.label.results' })}
    >
      <Header form={form} taskNotEditabl={taskNotEditable} onAdd={onAdd} />
      {lodash.map(dataList, (item: any) => (
        <Condition
          key={item.id}
          item={item}
          type={Type.Result}
          dataLength={dataList.length}
          onUnBind={onUnBind}
          onDelete={onDelete}
        />
      ))}
    </SectionBorder>
  );
};
