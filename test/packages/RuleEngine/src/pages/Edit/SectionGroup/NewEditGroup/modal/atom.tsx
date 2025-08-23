import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'dva';
import { List, Dropdown, Menu } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import classNames from 'classnames';
import { RuleType } from '../../../Enum';
import styles from './index.less';

interface IProps {
  type: string;
  ruleItem: any;
  handleHiddenModal: Function;
}

export default ({ type, ruleItem, handleHiddenModal }: IProps) => {
  const dispatch = useDispatch();
  const listRef = useRef();

  const { atomConditionList, atomResultList } = useSelector(
    (state: any) => state.ruleEngineController.configData
  );

  const configList = type === RuleType.Conditions ? atomConditionList : atomResultList;

  const domain = lodash.isEmpty(ruleItem?.atomDomain)
    ? configList.length > 0
      ? configList[0]?.domain
      : ''
    : ruleItem?.domain;
  const [domainActive, setDomainActive] = useState(domain);

  const handleSaveData = async ({ atomItem, extraCode, domain }: any) => {
    const newItem = {
      ...atomItem,
      id: ruleItem.id,
      atomParam: extraCode,
      atomDomain: domain,
    };
    await dispatch({
      type: `ruleEngineController/updateNewEditRuleModal`,
      payload: {
        type,
        item: newItem,
        optionType: 'atom',
      },
    });
    handleHiddenModal();
  };

  const handleAnchorLink = (index: number) => {
    const listNodes = lodash.get(listRef, ['current']);
    const listChildNodes = lodash.get(listRef, ['current', 'childNodes']);
    listNodes.scrollTo({
      top: listChildNodes[index].offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const renderBase = (atomItem: any) => (
    <div
      className={classNames(
        styles.textWrapper,
        atomItem.atomCode === ruleItem.atomCode && styles.active
      )}
    >
      <span
        className={styles.text}
        title={formatMessageApi({
          Label_RUL_AtomName: `${atomItem.atomCode}`,
        })}
      >
        {formatMessageApi({
          Label_RUL_AtomName: `${atomItem.atomCode}`,
        })}
      </span>
    </div>
  );

  const renderList = ({ atomItem, domain }: any) => {
    const hasDropdown =
      atomItem.linkedOptions &&
      lodash.isArray(atomItem.linkedOptions) &&
      !lodash.isEmpty(atomItem?.linkedOptions);

    if (hasDropdown) {
      return (
        <div className={styles.baseInfo}>
          <Dropdown
            overlay={
              <Menu
              // 这个颜色会遮挡，先不弄
              // selectedKeys={[`${ruleItem.atomParam}`]}
              >
                {lodash.map(atomItem.linkedOptions, (extraItem: any) => {
                  return (
                    <Menu.Item
                      key={extraItem.dictCode}
                      onClick={() => {
                        handleSaveData({ atomItem, extraCode: extraItem?.dictCode, domain });
                      }}
                    >
                      {extraItem.dictName}
                    </Menu.Item>
                  );
                })}
              </Menu>
            }
            trigger={['click']}
          >
            {renderBase(atomItem)}
          </Dropdown>
        </div>
      );
    }
    return (
      <div className={styles.baseInfo} onClick={() => handleSaveData({ atomItem, domain })}>
        {renderBase(atomItem)}
      </div>
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.anchor}>
        {lodash.map(configList, (domainItem: any, index: number) => (
          <div
            id={domainItem.id}
            className={classNames(styles.item, domainItem.domain === domainActive && styles.active)}
            onClick={() => {
              handleAnchorLink(index);
              setDomainActive(domainItem.domain);
            }}
          >
            <span className={styles.text}>{domainItem.domain}</span>
          </div>
        ))}
      </div>

      <div className={styles.list} ref={listRef}>
        {lodash.map(configList, (item: any) => (
          <div>
            <List
              className={styles.list}
              grid={{ gutter: 1, column: 3 }}
              dataSource={item.childrens}
              renderItem={(atomItem: any) => (
                <List.Item>{renderList({ atomItem, domain: item.domain })}</List.Item>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
