import lodash from 'lodash';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classname from 'classnames';
interface IProps {
  impairmentCodeList: string[];
  inActive?: boolean;
}

export default ({ impairmentCodeList, inActive }: IProps) => {
  console.log('inActive', inActive);
  return (
    <div className={styles.mibContainer}>
      {lodash.map(impairmentCodeList, (dataItem: any) => {
        return (
          <span
            className={classname(styles.tag, {
              [styles.inActive]: inActive,
            })}
            title={formatMessageApi({
              Dropdown_NB_MIBCode: dataItem,
            })}
          >
            {dataItem}
          </span>
        );
      })}
    </div>
  );
};
