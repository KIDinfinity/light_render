import { Row, Col } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import lodash from 'lodash';
import classNames from 'classnames';

// 定义组件的 Props 类型
interface CommonLoopBoxProps {
  detailChildren: React.FC<{
    id: string;
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  selectChildren: React.FC<{ id: string }>;
  disPlayList: string[];
  onClickCallBack?: (id: string) => void;
}

const CommonLoopBox: FC<CommonLoopBoxProps> = ({
  detailChildren: DetailChildren,
  selectChildren: SelectChildren,
  disPlayList,
  onClickCallBack,
}) => {
  const [expand, setExpand] = useState<boolean>(false); // 是否展开
  const [loopList, setLoopList] = useState<string[]>([]); // 循环列表

  // 同步 disPlayList 到 loopList
  useEffect(() => {
    setLoopList(disPlayList || []);
  }, [disPlayList]);

  // 处理点击事件，更新 loopList 并触发回调
  const handleLoopClick = (id: string) => {
    setLoopList((prevList) => [id, ...prevList.filter((item) => item !== id)]);
    if (onClickCallBack) {
      onClickCallBack(id);
    }
  };

  return (
    <div className={styles.commonLoopBox}>
      {/* 展示详情部分 */}
      <div className={classNames(styles.detailBoxList)}>
        <Row gutter={[16, 16]} className={classNames(styles.detailBoxRow)}>
          {lodash.map(loopList.slice(0, expand ? 1 : 2), (id) => (
            <Col className={classNames(styles.detailBox)} key={id} span={expand ? 24 : 12}>
              {DetailChildren({ id, setExpand })}
            </Col>
          ))}
        </Row>
      </div>

      {/* 展示选择部分 */}
      {expand || lodash.size(disPlayList) > 2 ? (
        <div className={classNames(styles.clientSelectList)}>
          {lodash.map(loopList.slice(expand ? 1 : 2), (id) => (
            <div
              className={classNames(styles.selectBox)}
              key={id}
              onClick={() => handleLoopClick(id)}
            >
              {SelectChildren({ id })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CommonLoopBox;
