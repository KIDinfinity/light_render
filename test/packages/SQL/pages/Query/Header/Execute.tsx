import React, { useState } from 'react';
import lodash from 'lodash';
import { Button, notification } from 'antd';
import { useDispatch, useSelector } from 'dva';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { LS, LSKey } from '@/utils/cache';

const removeSqlComments = (sqlText: string) => {
  let result = sqlText;
  // 去除单行注释
  result = result.replace(/--.*?$/gm, '');
  // 去除多行注释
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  return result;
};

const Execute = ({ form }: any) => {
  const dispatch = useDispatch();
  const [showModalWarn, setShowModalWarn] = useState(false);
  const sql = useSelector(({ sqlController }: any) => sqlController.sql);
  const currentMenu = useSelector(({ sqlController }: any) => sqlController.currentMenu);
  const hasPermission = useSelector(({ user }: any) => user?.currentUser?.autoRefreshSession);
  const onExecute = async () => {
    if (hasPermission === 'Y') {
      const newSqlData = [{ sql: sql, fieldsData: form.getFieldsValue() }];
      LS.setItem(LSKey.VENUS_UI_SQLQUERYPARAMS, newSqlData);
    }
    form.validateFields(async (errors: any, values: any) => {
      if (errors) {
        return;
      }
      const sqlText = removeSqlComments(sql);

      if (currentMenu === 'queryOnly') {
        const validateContent = sqlText.replace(/(["'])(.*?)(\1)/g, '');
        const updateKeywords =
          /\b(insert|update|delete|merge|replace|truncate|create|alter|drop|grant|revoke|execute|load data)\b/gi;
        const isUpdate = updateKeywords.test(lodash.toLower(validateContent));
        const isLike = / like /.test(lodash.toLower(validateContent));

        if (isUpdate) {
          notification.error({
            message: 'Command denied to current user.',
          });
          return;
        }
        if (isLike) {
          setShowModalWarn(true);
          return;
        }
      }

      await dispatch({
        type: 'sqlController/statementExec',
        payload: {
          ...values,
        },
      });
    });
  };

  const onConfirmExecute = async () => {
    form.validateFields(async (errors: any, values: any) => {
      if (errors) {
        return;
      }

      await dispatch({
        type: 'sqlController/statementExec',
        payload: {
          ...values,
        },
      });
      setShowModalWarn(false);
    });
  };

  return (
    <>
      <Button type="primary" icon="caret-right" onClick={onExecute}>
        Execute
      </Button>
      <ModalWarnMessage
        visible={showModalWarn}
        maskClosable={false}
        onOk={onConfirmExecute}
        onCancel={() => {
          setShowModalWarn(false);
        }}
        labelId={`Query statement includes "like" which may impact DB performance, are you sure to continue? `}
        hiddenExtraText
      />
    </>
  );
};

export default Execute;
