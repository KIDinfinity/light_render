/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { List, Dropdown, Menu } from 'antd';
import { formUtils } from 'basic/components/Form';
import classNames from 'classnames';
import { ValueType, Operator } from '../../../Enum';

import styles from './index.less';

interface IProps {
  type: string;
  ruleItem: any;
  handleHiddenModal: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ type, ruleItem }: IProps) => {
  const dispatch = useDispatch();
  const listRef = useRef<HTMLDivElement>(null);

  const { valueList } = useSelector((state: any) => state.ruleEngineController.configData);

  // eslint-disable-next-line no-nested-ternary
  const domain = lodash.isEmpty(ruleItem.valueDomain)
    ? valueList.length > 0
      ? valueList[0]?.domain
      : ''
    : ruleItem.domain;
  const [domainActive, setDomainActive] = useState(domain);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSaveData = async ({ atomItem, extraCode, domain }: any) => {
    let newComparisonValueType = 'F';
    const GType = [Operator.belongsTo, Operator.notBelongTo];

    if (lodash.includes(GType, formUtils.queryValue(ruleItem?.operator))) {
      newComparisonValueType = ValueType.G;
    }

    if (!['Possible Values', 'Group Datas'].includes(domain)) {
      newComparisonValueType = atomItem.atomFlag === ValueType.FA ? 'FA' : 'L';
    }
    const newItem = {
      ...ruleItem,
      id: ruleItem.id,
      value: atomItem.atomCode,
      valueParam: extraCode || '',
      valueDomain: domain,
      comparisonValueType: newComparisonValueType,
      valueName: !lodash.isEmpty(atomItem.dictName) ? atomItem.dictName : '',
    };

    if (
      [Operator.in, Operator.notIn].includes(formUtils.queryValue(ruleItem.operator)) &&
      domain === 'Possible Values'
    ) {
      if (
        formUtils.queryValue(ruleItem.value) &&
        formUtils.queryValue(ruleItem.valueDomain) === 'Possible Values'
      ) {
        const valueArr = formUtils.queryValue(ruleItem.value).split(',');
        if (formUtils.queryValue(ruleItem.value).split(',').includes(atomItem.atomCode)) {
          newItem.value = valueArr.filter((v: string) => v !== atomItem.atomCode).toString();
          newItem.valueName = formUtils
            .queryValue(ruleItem.valueName)
            .split(/,(?! )/)
            .filter((v: string) => v !== atomItem.dictName)
            .toString();
        } else {
          newItem.value = `${formUtils.queryValue(ruleItem.value)},${atomItem.atomCode}`;
          newItem.valueName = `${ruleItem.valueName},${atomItem.dictName}`;
        }
      } else {
        newItem.value = atomItem.atomCode;
        newItem.valueName = atomItem.dictName;
      }
    }

    await dispatch({
      type: `ruleEngineController/updateNewEditRuleModal`,
      payload: {
        type,
        item: newItem,
        optionType: 'value',
      },
    });
  };

  const handleAnchorLink = (index: number) => {
    const listNodes = lodash.get(listRef, ['current'])!;
    const listChildNodes = lodash.get(listRef, ['current', 'childNodes']);

    listNodes.scrollTo({
      top: listChildNodes[index].offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const renderBase = ({ atomItem }: any) => {
    const activeAction = !lodash.isEmpty(ruleItem.value) ? ruleItem.value.split(',') : [];
    return (
      <div
        className={classNames(styles.textWrapper, {
          [styles.active]: activeAction.includes(atomItem.atomCode),
        })}
      >
        <span className={styles.text}>
          {atomItem.dictName && atomItem.dictName}
          {!atomItem.dictName &&
            formatMessageApi({
              Label_RUL_AtomName: `${atomItem.atomCode}`,
            })}
        </span>
      </div>
    );
  };

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
            {renderBase({ atomItem })}
          </Dropdown>
        </div>
      );
    }
    return (
      <div className={styles.baseInfo} onClick={() => handleSaveData({ atomItem, domain })}>
        {renderBase({ atomItem })}
      </div>
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.anchor}>
        {lodash.map(valueList, (domainItem: any, index: number) => (
          <div
            id={domainItem.id}
            key={domainItem.id}
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
        {lodash.map(valueList, (item: any) => (
          <List
            key={item.id}
            className={styles.list}
            grid={{ gutter: 1, column: 3 }}
            dataSource={item.childrens}
            renderItem={(atomItem: any) => (
              <List.Item>{renderList({ atomItem, domain: item.domain })}</List.Item>
            )}
          />
        ))}
      </div>
    </div>
  );
};
