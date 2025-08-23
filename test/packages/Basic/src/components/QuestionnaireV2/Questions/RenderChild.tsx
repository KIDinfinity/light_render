import React, { useMemo } from 'react';
import lodash from 'lodash';
import styles from './index.less';
import { QuestionCode } from '../Enum';

import SectionQuestion from './SectionQuestion';

const RenderChild = ({
  optionsList,
  option,
  disabled,
  sectionQuestionList,
  error,
  sectionQuestionListMap,
  allSectionQuestionList,
  config,
  question,
  level,
}: any) => {
  let childLevel = level;

  const list = useMemo(() => {
    let newList: any[] = [];

    const getList = ({ triggerSectionCodes, triggerSectionCode, triggerQuestionCodes }: any) => {
      if (!lodash.isEmpty(triggerQuestionCodes)) {
        newList = [
          ...newList,
          ...(lodash
            .chain(triggerQuestionCodes || [])
            .reduce((arr: any, questionCode: any) => {
              const questionChildMap = lodash.find(
                sectionQuestionList,
                (childItem: any) =>
                  sectionQuestionListMap?.[childItem].sectionCode === triggerSectionCode &&
                  sectionQuestionListMap?.[childItem].questionCode === questionCode
              );

              return !!questionChildMap
                ? [
                    ...arr,
                    {
                      child: sectionQuestionListMap?.[questionChildMap] || {},
                      childMap: questionChildMap,
                    },
                  ]
                : arr;
            }, [])
            .value() || []),
        ];
      }

      if (!lodash.isEmpty(triggerSectionCodes)) {
        newList = [
          ...newList,
          ...(triggerSectionCodes
            ?.map((sectionCode: string, index: any) => {
              const section = lodash.find(
                allSectionQuestionList,
                (childItem: any) => childItem.sectionCode === sectionCode
              );
              if (section) {
                return {
                  child: (
                    <SectionQuestion
                      key={`${sectionCode}-${index}`}
                      allSectionQuestionList={sectionQuestionList}
                      sectionQuestionList={section.sectionQuestionList}
                      disabled={disabled}
                      sectionQuestionListMap={sectionQuestionListMap}
                      error={error}
                      sectionLabel={section?.sectionLabel}
                    />
                  ),
                  isSection: true,
                };
              }
              return undefined;
            })
            ?.filter((item: any) => item) || []),
        ];
      }
    };

    if (question?.questionType !== QuestionCode.MULTI_OPTION_GROUP) {
      lodash.map(optionsList, (item: any) => {
        const referAnswer =
          lodash.find(
            question?.answerVOList || [],
            (answer: any) => item.referAnswer === answer.optionText
          ) || {};

        // 如果存在，寻找对应的sectionCode，questionCode
        if (!lodash.isEmpty(referAnswer)) {
          getList({
            ...lodash.pick(item, [
              'triggerSectionCodes',
              'triggerSectionCode',
              'triggerQuestionCodes',
            ]),
          });
        }
      });
    } else {
      // 存在选项的答案命中了子问题(trigger)
      if (
        !!lodash.find(
          question?.answerVOList || [],
          (answer: any) => option.optionValue === answer.optionCode
        )
      ) {
        getList({
          ...lodash.pick(option, [
            'triggerSectionCodes',
            'triggerSectionCode',
            'triggerQuestionCodes',
          ]),
        });
      }
    }

    return newList;
  }, [optionsList, option]);

  // 按 questionGroupCode 分组
  const groupedData = useMemo(() => {
    return lodash.groupBy(list, (item: any) => item?.child?.questionGroupCode || 'noGroup');
  }, [list]);

  return (
    <div className={styles.childWrap}>
      {Object.entries(groupedData).map(([groupCode, items]: [string, any[]]) => {
        // 如果有 questionGroupCode，包裹在一个 div 中
        if (groupCode !== 'noGroup') {
          return (
            <div key={groupCode} className={styles.groupWrap}>
              <p className={styles.groupCode}>{groupCode}</p>
              {items.map((item: any) =>
                item?.isSection ? (
                  item.child
                ) : (
                  <div key={item?.child.questionCode}>
                    {config[item.child?.question?.questionType?.toUpperCase() || QuestionCode.TEXT](
                      {
                        data: item.child,
                        childMaping: item.childMap,
                        level: (childLevel += 1),
                      }
                    )}
                  </div>
                )
              )}
            </div>
          );
        }

        // 没有 questionGroupCode 的单独渲染
        return items.map((item: any) =>
          item?.isSection ? (
            item.child
          ) : (
            <div key={item?.child.questionCode} className={styles.groupWrap}>
              {config[item.child?.question?.questionType?.toUpperCase() || QuestionCode.TEXT]({
                data: item.child,
                childMaping: item.childMap,
                level: (childLevel += 1),
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

export default RenderChild;
