import React from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import Layout from './layout';
import Filling from './Filling';
import { QuestionCode } from '../Enum';
import Description from './Default/Description';
import Answers from './Default/Answers';
import Text from './Text';
import styles from './index.less';
import SectionQuestion from './SectionQuestion';

/**
 * 1.根据maping来获取要渲染的问题
 * 2.获得问题后，根据questionType来选择对应的类型，如果不存在就默认是问答题(TEXT)
 * 3.单选、多选-> a.根据里面的answerVOList和questionOptionList，来判断哪些选项被选中
 *                b.判断answerVOList里面的optionText是否存在和questionOptionList里的referAnswer相等的值，
 *                如果存在，说明这个问题有子问题，有选项的答案命中了子问题(trigger)
 *                c.在当前问卷的中寻找sectionCode和triggerSection,questionCode和triggerQuestionCode的问题
 *                d.寻找到的子问题的childmap作为map，然后重复步骤1进行渲染。(目前只有父子两层问题，只存在于单选和多选)
 * 4.问答-> 问题里面的answerVOList和questionOptionList长度为1，但是answerVOList长度有可能为0，
 *   因此在拿答案时，如果answerVOList长度不为一，则拿questionOptionList里第一位的optionCode作为optionCode传递给Text组件。
 * 5.填空-> 问题的text为name{1}age{2}... 这种格式，此时需要切割成[{text:'name'},{text:'age'}],然后对questionOptionList
 *   根据sequence进行排序，对排序完后的questionOptionList进行遍历，然后根据对应的顺序填充到切割后的数组中。
 */
const Item = ({
  sectionQuestionList,
  disabled,
  maping,
  error,
  sectionQuestionListMap,
  allSectionQuestionList,
}: any) => {
  const sectionQuestionItem = sectionQuestionListMap[maping];

  // 类型配置
  const config = {
    default: ({ data, type, level }: any) => {
      let childObjs: any = [];
      let childLevel = level;
      const { question, isMandatory } = data || {};
      const { text, questionType, questionOptionList, answerVOList } = question || {};

      const optionsList = lodash
        .chain(questionOptionList)
        .map((el: any) => {
          // 查看选项内容是否跟答案一致
          const answerItem = lodash.find(
            answerVOList,
            (answer: any) => answer.optionCode?.toUpperCase() === el.optionCode?.toUpperCase()
          )
            ? { isSelect: true }
            : {};

          // 查看是否存在答案满足trigger
          const referAnswer =
            lodash.find(answerVOList, (answer: any) => el.referAnswer === answer.optionText) || {};
          // 如果存在，寻找对应的sectionCode，questionCode
          if (!lodash.isEmpty(referAnswer) && lodash.isEmpty(childObjs)) {
            // 优先trigger question
            if (!lodash.isEmpty(el.triggerQuestionCodes)) {
              childObjs =
                el.triggerQuestionCodes
                  ?.map((questionCode: string) => {
                    const questionChildMap = lodash.find(
                      sectionQuestionList,
                      (childItem: any) =>
                        sectionQuestionListMap[childItem].sectionCode === el.triggerSectionCode &&
                        sectionQuestionListMap[childItem].questionCode === questionCode
                    );
                    if (questionChildMap) {
                      return {
                        child: sectionQuestionListMap[questionChildMap] || {},
                        childMap: questionChildMap,
                      };
                    }
                    return undefined;
                  })
                  ?.filter((item: any) => item) || [];
              // 然后 trigger section
            } else if (!lodash.isEmpty(el.triggerSectionCodes)) {
              childObjs =
                el.triggerSectionCodes
                  ?.map((sectionCode: string, index) => {
                    const section = lodash.find(
                      allSectionQuestionList,
                      (childItem: any) => childItem.sectionCode === sectionCode
                    );
                    if (section) {
                      return {
                        child: (
                          <div key={`${sectionCode}-${index}`}>
                            <SectionQuestion
                              allSectionQuestionList={sectionQuestionList}
                              sectionQuestionList={section.sectionQuestionList}
                              disabled={disabled}
                              sectionQuestionListMap={sectionQuestionListMap}
                              error={error}
                              sectionLabel={section?.sectionLabel}
                            />
                          </div>
                        ),
                        isSection: true,
                      };
                    }
                    return undefined;
                  })
                  ?.filter((item: any) => item) || [];
            }
          }
          return {
            questionOptionSequence: el.sequence,
            ...el.option,
            ...answerItem,
          };
        })
        .value();

      const renderChild = () => {
        if (!lodash.isEmpty(childObjs)) {
          childLevel += 1;
          return childObjs.map((item: any) =>
            item?.isSection
              ? item.child
              : config[item.child?.question?.questionType?.toUpperCase() || QuestionCode.TEXT]({
                  data: item.child,
                  childMaping: item.childMap,
                  level: childLevel,
                })
          );
        }
        return null;
      };

      return (
        <div
          className={classNames({
            [styles.level]: level > 0,
          })}
        >
          <Layout questionType={questionType}>
            <Description
              text={text}
              error={!lodash.isEmpty(error[maping?.split('-')?.[0]]?.[maping])}
              required={isMandatory}
            />
            <Answers optionsList={optionsList} disabled={disabled} maping={maping} type={type} />
          </Layout>
          {renderChild()}
        </div>
      );
    },
    [QuestionCode.TEXT]: ({ data, childMaping = null, level }: any) => {
      const { question, isMandatory } = data || {};

      const { text, questionOptionList, answerVOList } = question || {};

      return (
        <Text
          maping={childMaping || maping}
          disabled={disabled}
          answerVOList={answerVOList || []}
          questionOptionList={questionOptionList || []}
          description={text}
          required={isMandatory}
          error={!lodash.isEmpty(error[maping?.split('-')?.[0]]?.[maping])}
          level={level}
        />
      );
    },
    [QuestionCode.SINGLE_OPTION]: ({ data, level }: any) => {
      return config.default({ data, type: QuestionCode.SINGLE_OPTION, level });
    },
    [QuestionCode.MULTI_OPTION]: ({ data, level }: any) => {
      return config.default({ data, type: QuestionCode.MULTI_OPTION, level });
    },
    [QuestionCode.FILLING]: ({ data, childMaping = null, level }: any) => {
      const { question, isMandatory, isDisplay } = data || {};

      const { text, questionOptionList, answerVOList, questionTitle } = question || {};

      // 对问题文本进行分割 eg: a:{0}b:{1}->a:--b:-- ->[{text:'a'},{text:'b'}]
      const questionList = text
        .replace(/{[^{]*}/gi, '--')
        .split('--')
        .map((item: string) => ({
          text: item.trim().replace(/:/gi, ''),
          type: '',
          code: '',
          answer: '',
        }))
        .filter((item: { text: any }) => item.text);

      // 获得对应问题的类型、答案
      questionOptionList
        ?.sort((a: { sequence: number }, b: { sequence: number }) => a.sequence - b.sequence)
        ?.forEach((current: any, index: number) => {
          if (questionList[index]) {
            questionList[index] = {
              ...questionList[index],
              type: current?.option?.optionValueType,
              code: current?.optionCode,
              answer: answerVOList?.find(
                (item: any) => item.optionCode?.toUpperCase() === current.optionCode?.toUpperCase()
              )?.optionText,
            };
          }
        });

      return (
        <Filling
          required={isMandatory}
          maping={childMaping || maping}
          questionTitleDisplay={isDisplay}
          questionTitle={questionTitle}
          disabled={disabled}
          questionList={questionList}
          error={error[maping?.split('-')?.[0]]?.[maping]}
          level={level}
        />
      );
    },
  };

  return (
    <>
      {sectionQuestionItem?.isDisplay !== 0 && (
        <div className={styles.item}>
          {config[sectionQuestionItem?.question?.questionType?.toUpperCase() || QuestionCode.TEXT]({
            data: sectionQuestionItem,
            level: 0,
          })}
        </div>
      )}
    </>
  );
};

export default Item;
