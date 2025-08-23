import React from 'react';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import { FormItemSelect, FormItemInput } from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export default function SearchField({ form, fieldButton }) {
  const Region = useSelector(
    ({ dictionaryController }: any) => dictionaryController.DropDown_COM_Region
  );
  const checkDbNameList = useSelector((state: any) => state.sqlController.checkDbNameList);
  return (
    <Row gutter={18}>
      <Col className="gutter-row" span={6}>
        <FormItemSelect
          form={form}
          formName="regionCode"
          labelId="RegionCode"
          dicts={Region}
          dictName="dictCode"
          name="regionCode"
        />
      </Col>
      <Col className="gutter-row" span={6}>
        {lodash.isEmpty(checkDbNameList) ? (
          <FormItemInput
            form={form}
            formName="dbName"
            labelId={formatMessageApi({ Label_COM_ReportCenter: 'dbName' })}
            name="dbName"
          />
        ) : (
          <FormItemSelect
            form={form}
            formName="dbName"
            labelId="dbName"
            dicts={checkDbNameList}
            name="dbName"
          />
        )}
      </Col>
      <Col className="gutter-row" span={6}>
        <FormItemInput
          form={form}
          formName="tableName"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'tableName' })}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <FormItemSelect
          form={form}
          formName="onlineCheck"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'onlineCheck' })}
          dicts={[
            { dictCode: 'Y', dictName: 'Yes' },
            { dictCode: 'N', dictName: 'No' },
          ]}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <FormItemInput
          form={form}
          formName="groupByFields"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'groupByFields' })}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <FormItemInput
          form={form}
          formName="groupByValues"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'groupByValues' })}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <FormItemInput
          form={form}
          formName="skipCheckFields"
          labelId={formatMessageApi({ Label_COM_ReportCenter: 'skipCheckFields' })}
        />
      </Col>
      {fieldButton && fieldButton()}
    </Row>
  );
}
