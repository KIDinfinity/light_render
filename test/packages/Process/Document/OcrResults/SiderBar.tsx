import { useDispatch, useSelector } from 'dva';
import moment from 'moment';
import { NAMESPACE } from './activity.config';
import classNames from 'classnames';
import lodash from 'lodash';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const activeId =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.activeId) || '';
  const datas = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.datas) || [];
  return (
    <div className={styles.siderWrap}>
      {lodash.map(datas, (item: any) => (
        <div
          key={item.id}
          className={classNames(
            styles.title,
            activeId === item.id ? styles.main : styles.secondary
          )}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/saveActiveId`,
              payload: {
                activeId: item.id,
              },
            });
          }}
        >
          <p> {moment(item.callOcrTime).format('L')}</p>
          <p> {moment(item.callOcrTime).format('LTS')}</p>
        </div>
      ))}
    </div>
  );
};
