import React, { useState } from 'react';
import lodash from 'lodash';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { ComponentType } from '../Enum';
import Require from './Require';
import Table from './Table';
import Branch from './Branch';
import styles from './index.less';

interface Search {
  show: boolean;
  type: string;
  ruleReferenceId: string;
  branchId: string;
  optionType: string;
}
interface IProps {
  search: Search;
  handleCancel: any;
  handleConfirn: any;
}

export default ({ search, handleConfirn, handleCancel }: IProps) => {
  const dispatch = useDispatch();

  const conditionList = useSelector(
    (state: any) => state.ruleEngineController.newRulFlow?.conditionList || []
  );
  const branchVOs = useSelector(
    (state: any) => state.ruleEngineController.submitRuleSet?.branchVOs || []
  );

  const [selectRecord, setSelectRecord] = useState({});
  const [tableError, setTableError] = useState(false);

  const validateCondition = () => {
    const validateArr = [
      ...conditionList,
      ...lodash.reduce(
        branchVOs,
        (arr: any, branchVo: any) => {
          if (branchVo.id !== search.branchId) {
            return [...arr, ...branchVo.conditions];
          }
          return arr;
        },
        []
      ),
    ];
    // eslint-disable-next-line no-case-declarations
    const repeatErrors = lodash.reduce(
      validateArr,
      (arr: any, item: any) => {
        const newItem = lodash.find(
          arr,
          (el: any) =>
            formUtils.queryValue(el.atomCode) === formUtils.queryValue(item.atomCode) &&
            formUtils.queryValue(el.operator) === formUtils.queryValue(item.operator) &&
            formUtils.queryValue(el.value) === formUtils.queryValue(item.value)
        );
        if (!newItem) {
          arr = [...arr, item];
        }
        return arr;
      },
      []
    );
    return validateArr.length === repeatErrors.length;
  };

  const rederFooter = () => {
    return [
      <Button
        key="confirm"
        onClick={async () => {
          switch (search?.type) {
            case ComponentType.Rule:
              if (lodash.isEmpty(selectRecord)) {
                setTableError(true);
              } else {
                setTableError(false);
                handleConfirn(selectRecord);
              }
              break;
            default:
              // 添加校验
              // eslint-disable-next-line no-case-declarations
              const formErrors = await dispatch({
                type: 'ruleEngineController/validateEditData',
              });

              if (!formErrors?.length) {
                // 存在重复数据
                if (!validateCondition()) {
                  handleMessageModal([
                    {
                      code: 'VLD_000553',
                      content: formatMessageApi({
                        Label_COM_ErrorMessage: 'MSG_000478',
                      }),
                    },
                  ]);
                } else {
                  handleConfirn(selectRecord);
                }
              }
              break;
          }
        }}
      >
        {formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.receivedModalOk',
        })}
      </Button>,
      <Button
        key="cancel"
        onClick={() => {
          setTableError(false);
          handleCancel();
        }}
      >
        {formatMessageApi({
          Label_BIZ_Claim: 'form.cancel',
        })}
      </Button>,
    ];
  };

  return (
    <Modal
      visible={search.show}
      width={search.type === ComponentType.Rule ? '70%' : '50%'}
      closable={false}
      className={styles.antModal}
      footer={rederFooter()}
      bodyStyle={{
        zIndex: 1000,
      }}
    >
      <div className={styles.content}>
        {search?.type === ComponentType.Rule && (
          <>
            <Require />
            <Table
              ruleReferenceId={search.ruleReferenceId}
              tableError={tableError}
              handleRowClick={(record: any) => {
                setSelectRecord(record);
                setTableError(false);
              }}
            />
          </>
        )}
        {(search?.type === ComponentType.Decision || search?.type === ComponentType.Branch) && (
          <Branch optionType={search.optionType} branchId={search.branchId} />
        )}
      </div>
    </Modal>
  );
};
