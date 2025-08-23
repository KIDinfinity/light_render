import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'dva';
// eslint-disable-next-line import/no-unresolved
import { FormItemSelect, FormItemNumber } from 'basic/components/Form';
import Execute from './Execute';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';
import { isEmpty } from 'lodash';

const Header = ({ form }: any) => {
  const currentMenu = useSelector(({ sqlController }: any) => sqlController.currentMenu);
  const dataSource = useSelector(({ sqlController }: any) => sqlController.dataSource);
  const Region = useSelector(
    ({ dictionaryController }: any) => dictionaryController.DropDown_COM_Region
  );
  const hasPermission = useSelector(({ user }: any) => user?.currentUser?.autoRefreshSession);
  const sqlData = LS.getItem(LSKey.VENUS_UI_SQLQUERYPARAMS);
  const init = function () {
    if (hasPermission === 'Y' && !isEmpty(sqlData)) {
      const { region, datasource, limit } = sqlData[0]?.fieldsData || {};
      form.setFieldsValue({
        region: region,
        limit: limit,
        datasource: datasource,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.header}>
      <Form className={styles.form} layout="inline">
        <FormItemSelect
          required
          form={form}
          formName="region"
          labelId="Region"
          dicts={Region}
          filterList={['BS']}
          dictName="dictCode"
        />
        <FormItemSelect
          required
          form={form}
          formName="datasource"
          labelId="DataBase"
          dicts={dataSource}
        />
        {/* <FormItemCheckbox form={form} formName="auto" labelId="" /> */}
        <FormItemNumber
          form={form}
          formName="limit"
          labelId="Auto Limit"
          suffix="Rows"
          precision={0}
          initialValue={currentMenu === 'queryOnly' ? 50 : null}
        />
      </Form>
      <Execute form={form} />
    </div>
  );
};

export default Header;
