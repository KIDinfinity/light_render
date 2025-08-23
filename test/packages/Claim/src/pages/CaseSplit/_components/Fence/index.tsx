import type { FunctionComponent} from 'react';
import React, { Fragment } from 'react';
import { compact, some, map } from 'lodash';
import classNames from 'classnames';
import styles from './fence.less';

interface IFence {
  barId: string;
  barName: string;
}

interface IProps {
  disabled: boolean;
  bars: IFence[] | null;
  activedBars: IFence[];
  onClick: (id: string, isActive: boolean, e: any) => void;
}

const Fence: FunctionComponent<IProps> = ({ disabled, bars, activedBars, onClick }) => {
  const data = compact(bars || activedBars);
  const diffRemain = data.length % 3;
  return (
    <div className={styles.fences}>
      {map(data, (bar: IFence, index: number) => {
        const isActived = some(activedBars, (item: IFence) => item.barId === bar.barId);
        const remain = index % 3;
        const differ = data.length - index;
        let flexClass = '';
        if (differ < 3) {
          flexClass =
            diffRemain === 1 ? styles.flexBasis1 : diffRemain === 2 ? styles.flexBasis2 : '';
        }

        const BarComponent = (
          <span
            key={`${bar}-${index}`}
            onClick={(e) => {
              if (disabled) return;
              onClick(bar.barId, isActived, e);
            }}
            className={classNames(
              styles.fenceItem,
              isActived ? styles.selected : '',
              !disabled ? styles.selectable : '',
              flexClass
            )}
          >
            {bar.barName}
          </span>
        );

        if (remain == 0) {
          return BarComponent;
        }

        return <Fragment key={`${bar}-${index}`}>|{BarComponent}</Fragment>;
      })}
    </div>
  );
};

export default Fence;
