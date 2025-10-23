import React from 'react';
import { useShowTakeOverTable, useTakeOverFlay, useTakeOverList } from '../hooks';
import TakeOverInfo from './TakeOverInfo';
import TakeOverTable from './TakeOverTable';
import { formUtils } from 'basic/components/Form';
export default function TakeOverShow() {
  const takeOverFlag = useTakeOverFlay();
  const takeOverList = useTakeOverList();
  const showTakeOverTable = useShowTakeOverTable();
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          padding: '16px 28px',
          margin: '0px 10px',
          backgroundColor: 'var(--nb-uwdecision-background-color)',
        }}
      >
        <TakeOverInfo data={{ takeOverFlag: formUtils.queryValue(takeOverFlag) }} />
        {showTakeOverTable && <TakeOverTable data={takeOverList} />}
      </div>
    </div>
  );
}
