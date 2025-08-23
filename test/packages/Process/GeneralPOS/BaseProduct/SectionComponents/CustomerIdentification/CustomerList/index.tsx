import { Form, Table } from 'antd';
import type { WrappedFormUtils } from 'antd/lib/form/Form';
import type { TableRowSelection } from 'antd/lib/table';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import classNames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import React, { useMemo } from 'react';
import getColumnRenders from '../Columns/getColumnRenders';
import type { IdentificationClientTagType } from '../enum';
import { localConfig } from '../Section';
import type { IClient } from '../types';
import styles from './index.less';

interface IProps {
  className?: string | classNames.Argument;
  editable?: boolean;
  clientList: IClient[];
  form: WrappedFormUtils;
  identifyResultTag?: IdentificationClientTagType;
  selectedClientId?: string;
  handleSelected?: (selected: string | number) => void;
}

const CustomerList = (props: IProps) => {
  const { className, clientList, identifyResultTag, selectedClientId, handleSelected } = props;
  const dictionaryController = useSelector((state: any) => state.dictionaryController);

  const configs = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Identification',
    localConfig,
  });

  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);

  const columns = useMemo(() => {
    const firstClient = clientList?.[0];
    const referClient =
      identifyResultTag === IdentificationClientTagEnum.SuspectClient ? firstClient : null;
    return getColumnRenders(configs, dictionaryController, identifyResultTag, referClient);
  }, [clientList, configs, dictionaryController, identifyResultTag]);

  const scroll = clientList.length > 3 ? { y: 156 } : undefined;

  const defaultSelected =
    identifyResultTag === IdentificationClientTagEnum.SuspectClient ? clientList?.[0]?.id : '';

  const rowSelection: TableRowSelection<IClient> | undefined =
    identifyResultTag === IdentificationClientTagEnum.SuspectClient
      ? {
          type: 'radio',
          onChange: (selectedRowKeys: string[] | number[]) => {
            if (lodash.isFunction(handleSelected)) {
              handleSelected(selectedRowKeys?.[0]);
            }
          },
          selectedRowKeys: [selectedClientId || defaultSelected],
        }
      : undefined;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <Table
        rowKey="id"
        dataSource={clientList}
        columns={columns}
        pagination={false}
        scroll={scroll}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default Form.create<IProps>()(CustomerList);
