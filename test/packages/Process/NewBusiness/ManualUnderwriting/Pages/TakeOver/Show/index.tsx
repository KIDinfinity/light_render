import React from 'react';
import { useShowTakeOverTable, useTakeOverFlay, useTakeOverList } from '../hooks';
import TakeOverInfo from './TakeOverInfo';
import TakeOverTable from './TakeOverTable';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default function TakeOverShow() {
  const takeOverData = useSelector(({ [NAMESPACE]: model }: any) => model?.processData?.takeOver);
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
        <TakeOverInfo data={takeOverData} />
        {showTakeOverTable && <TakeOverTable data={takeOverList} />}
      </div>
    </div>
  );
}
