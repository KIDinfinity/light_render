/* eslint-disable consistent-return */
import type { FunctionComponent } from 'react';
import React from 'react';
import { Icon, Tooltip } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DocLayout from '../DocLayout';
import { EComponentType } from '../../_dto/enums';
import type { DocumentModel } from '../../_dto/model';
import { getTypeCode } from '../../_functions';
import Progress from '../Progress';

import styles from './index.less';

export interface IDocField {
  fields?: any[];
  excludes?: string[];
  documentItem?: DocumentModel;
  imageUploadStatus?: string;
}

const { DocField } = DocLayout;

const DocFieldRender: FunctionComponent<IDocField> = ({
  fields,
  documentItem = {},
  excludes,
  imageUploadStatus,
}) => (
  <>
    {lodash
      .chain(fields)
      .orderBy('orderNo')
      .filter((field: any) => !field.title)
      .map((field: any, index: string) => {
        const { component, labelId, formName, format } = field;
        const value = documentItem[formName] || '';
        const typeCode = getTypeCode(formName);

        if (!lodash.isEmpty(excludes) || lodash.isArray(excludes)) {
          if (excludes?.includes(formName)) return; // 过滤需要排除的fields
        }

        switch (component) {
          case EComponentType.Input:
            return (
              <div className={styles.errorBox} key={`${labelId}-${index}`}>
                <Tooltip
                  title={formatMessageApi({ Label_COM_Message: 'MSG_000617' })}
                  overlayClassName={styles.error}
                >
                  {lodash.toLower(imageUploadStatus) === 'fail' && (
                    <Icon type="close-circle" className={styles.errorIcon} />
                  )}
                </Tooltip>
                <DocField>{value}</DocField>
              </div>
            );
          case EComponentType.Select:
            return (
              <DocField key={`${labelId}-${index}`}>
                {formatMessageApi({ [typeCode]: value })}
              </DocField>
            );
          case EComponentType.DatePicker:
            return (
              <React.Fragment key={`${labelId}-${index}`}>
                {lodash.toLower(imageUploadStatus) === 'todo' && <Progress uploading/>}
                <DocField>
                  {moment(value).isValid() && moment(value).format(format)}
                </DocField>
              </React.Fragment>
            );
          default:
            return null;
        }
      })
      .value()}
  </>
);

export default DocFieldRender;
