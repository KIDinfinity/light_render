import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const concatName = (target: any) =>
  lodash
    .chain(target)
    .pick(['firstName', 'middleName', 'surname'])
    .values()
    .compact()
    .join('.')
    .value();

export type Comment = {
  author: string;
  caseCategory: string;
  content: string;
  createdDate: string;
  procActivityKey: string;
};

export type InformationCategory = {
  category: string;
  comments: Comment[];
};

export type CommentListItem = {
  informationCategories: InformationCategory[];
  policyId: string;
  policyOwner?: string;
  policyInsured?: string;
  policyPayor?: string;
  riskCessationDate?: string;
  riskCommenceDate?: string;
  riskStatus?: string;
  mainProductCode?: string;
};

export type CommentList = CommentListItem[];

export default () => {
  const sideBarOverallList = useSelector(({ insured360 }: any) => insured360?.sideBarOverallList);

  return useMemo(() => {
    const commentList: CommentList = [];

    // 单个Policy Note(即Comment)可能对应多个PolicyId，手动拆分整合
    lodash.forEach(sideBarOverallList, (item) => {
      const { userCommentList = [], policyInfoList = [] } = item;

      lodash
        .chain(userCommentList)
        .orderBy(['createdDate'], ['desc'])
        .value()
        .forEach((commentItem: any) => {
          const {
            author,
            category,
            caseCategory,
            content,
            createdDate,
            procActivityKey,
            policyIdList = [],
          } = commentItem;

          lodash.forEach(policyIdList, (policyId) => {
            const matchIndex = commentList.findIndex((data) => data.policyId === policyId);
            const commentData = ~matchIndex
              ? { ...commentList[matchIndex] }
              : ({ policyId, informationCategories: [] } as CommentListItem);

            // 新增条目
            if (!~matchIndex) {
              const policyInfo = policyInfoList.find((info: any) => info.policyId === policyId);

              if (policyInfo) {
                const {
                  mainProductCode,
                  policyOwner,
                  insured,
                  payor,
                  riskCommenceDate,
                  riskCessationDate,
                  riskStatus,
                } = policyInfo;

                commentData.riskStatus = riskStatus
                  ? formatMessageApi({ risk_status: riskStatus })
                  : '';
                commentData.riskCommenceDate = riskCommenceDate
                  ? moment(riskCommenceDate).format('L')
                  : '';
                commentData.riskCessationDate = riskCessationDate
                  ? moment(riskCessationDate).format('L')
                  : '';
                commentData.mainProductCode = mainProductCode;
                commentData.policyOwner = concatName(policyOwner);
                commentData.policyInsured = concatName(insured);
                commentData.policyPayor = concatName(payor);
                commentData.informationCategories = [];
              }
            }

            // 匹配填入各information category的评论
            const matchCategoryIndex = commentData.informationCategories.findIndex(
              (cate) => cate.category === category
            );
            const categoryData = ~matchCategoryIndex
              ? { ...commentData.informationCategories[matchCategoryIndex] }
              : ({ category, comments: [] } as InformationCategory);

            categoryData.comments.push({
              author,
              createdDate: moment(createdDate).format('L'),
              content,
              caseCategory,
              procActivityKey,
            });

            // 写入category新值
            if (!~matchCategoryIndex) {
              commentData.informationCategories.push(categoryData);
            } else {
              commentData.informationCategories[matchCategoryIndex] = categoryData;
            }

            // 写入comment新值
            if (!~matchIndex) {
              commentList.push(commentData as CommentListItem);
            } else {
              commentList[matchIndex] = commentData;
            }
          });
        });
    });

    return commentList;
  }, [sideBarOverallList]);
};
