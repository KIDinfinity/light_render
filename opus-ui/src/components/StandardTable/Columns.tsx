import React from 'react';
import type { SortProps } from './Sorter';
import Sorter from './Sorter';

interface ColumnsProps {
  columns: any[];
  sortOrders: SortProps[];
  sortMore: boolean;
}

export const getColumns = (props: ColumnsProps) => {
  const { columns = [], sortOrders, sortMore } = props;
  return columns.map((item) => ({
    ...item,
    title:
      item.sortOrder || item.sorter ? (
        <Sorter
          title={item.title}
          sortName={item.dataIndex || item.key}
          sortOrders={sortOrders}
          sortMore={sortMore}
        />
      ) : (
        item.title
      ),
  }));
};
