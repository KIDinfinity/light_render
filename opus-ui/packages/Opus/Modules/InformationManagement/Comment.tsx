import React, { useEffect } from 'react';
import { Button, Icon, Select, Input, Radio } from 'antd';
import lodash from 'lodash';
import SelectItem from 'basic/components/Form/FormItem/FormItemSelect/SelectItem';
import { useDispatch, useSelector } from 'umi';
import { ApplicationType } from 'opus/Enums';
import CutoutInput from 'opus/Components/CutoutInput';
import { namespace } from './_models';
import { LinkTo } from './enum';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as IconArrow } from 'opus/Assets/icon-arrow.svg';
import { getRemarkEditAuth } from '@/auth/Utils';
import { shallowEqual } from 'react-redux';
import { Category } from '@/auth/Constant';
import styles from './index.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

const { Option } = Select;
const { TextArea } = Input;
const Comment = ({ infoGroup = {}, caseDetail = {} }: { infoGroup: any; caseDetail: any }) => {
  const { submitInfo, classification, curGroupCode } = useSelector((state) => state.infoController);
  const dispatch = useDispatch();
  const groupSubmitInfo = lodash.get(submitInfo, curGroupCode, {});
  const policyIdList = lodash.get(classification, 'policyIdList', []);
  const { isShowDropDown, selectCaseCategorylist } = infoGroup;
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  const ExtraAuthorityCode = ['RS_OPUS_Info_EditRemark']
  const individualAuthorCode: any = {
    'uwAssessmentWorksheet': 'RS_BP_InfoMag_AddGenerateUWWorksheetComment',
    'generalRemarks': 'RS_BP_InfoMag_AddGeneralRemarks',
  }[curGroupCode];
  if(individualAuthorCode)
    ExtraAuthorityCode.push(individualAuthorCode);

  const remarkEditable = getRemarkEditAuth(
    commonAuthorityList,
    {
      authorityCode: Category.infoEdit,
      caseCategory: caseDetail?.caseCategory,
      activityCode: caseDetail?.taskDefKey,
      assignee: caseDetail?.assignee,
    },
    ...ExtraAuthorityCode.map(authorityCode => ({ authorityCode }))
  );

  useEffect(() => {
    if (selectCaseCategorylist.length === 1) {
      dispatch({
        type: `${namespace}/setSubmitInfo`,
        payload: lodash.pick(selectCaseCategorylist[0], ['infoCategoryCode']),
      });
    }
  }, [infoGroup]);

  const handleChange = (key, val) => {
    dispatch({
      type: `${namespace}/setSubmitInfo`,
      payload: {
        [key]: val,
      },
    });
  };

  const handleClear = () => {
    dispatch({
      type: `${namespace}/clearSubmitInfo`,
    });
  };

  const handleSave = () => {
    dispatch({
      type: `${namespace}/submitInfo`,
      payload: { caseDetail },
    });
  };

  return (
    <div className={styles.commentContainer}>
      {isShowDropDown && (
        <CutoutInput title={t('selectCategory')} className={styles.selectCutout}>
          <Select
            className={styles.select}
            suffixIcon={<Icon component={IconArrow} className={styles.selectArrowIcon} />}
            showSearch={false}
            placeholder={t('select')}
            disabled={!remarkEditable}
            value={groupSubmitInfo.infoCategoryCode}
            getPopupContainer={(triggerNode) => triggerNode}
            onChange={(val) => handleChange('infoCategoryCode', val)}
          >
            {lodash
              .filter(
                selectCaseCategorylist,
                (item) => item.applicationType === ApplicationType.both
              )
              .map(({ infoCategoryCode, dictCode }: any) => (
                <Option key={infoCategoryCode} value={infoCategoryCode}>
                  {formatMessageApi({ DropDown_INF_Category: dictCode || infoCategoryCode })}
                </Option>
              ))}
          </Select>
        </CutoutInput>
      )}

      <CutoutInput
        title={formatMessageApi({ Label_COM_General: 'feedbackRecommendations' })}
        className={!isShowDropDown ? styles.largeWrapper : styles.textareaWrapper}
      >
        <TextArea
          // autoSize={{ minRows: 4, maxRows: 15 }}
          className={styles.textarea}
          placeholder={t('freeText')}
          maxLength={1024}
          onChange={(e) => handleChange('comment', e.target?.value)}
          value={groupSubmitInfo.comment}
          disabled={!remarkEditable}
        />
      </CutoutInput>

      {isShowDropDown && (
        <div className={styles.linkto}>
          <div className={styles.left}>
            <div className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.remark.linkto',
              })}
            </div>
            <Radio.Group
              size="small"
              disabled={!remarkEditable}
              options={[
                { label: t(LinkTo.case), value: LinkTo.case },
                { label: t(LinkTo.policy), value: LinkTo.policy },
                { label: t(LinkTo.insured), value: LinkTo.insured },
              ]}
              onChange={(e) => handleChange('infoCategoryLinkTo', e.target?.value)}
              value={groupSubmitInfo.infoCategoryLinkTo}
            />
          </div>
          <div className={styles.right}>
            {groupSubmitInfo.infoCategoryLinkTo === LinkTo.policy && (
              <div>
                <div className={styles.title}>
                  {formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}
                </div>
                <div className={styles.selectPolicyId}>
                  <SelectItem
                    disabled={!remarkEditable}
                    placeholder={formatMessageApi({ Label_COM_Opus: 'selectPolicyNo' })}
                    value={groupSubmitInfo.policyIds}
                    mode="multiple"
                    onChange={(val) => handleChange('policyIds', val)}
                    dicts={policyIdList?.map((id) => ({
                      dictCode: id,
                      dictName: id,
                    }))}
                    dictCode="dictCode"
                    dictName="dictName"
                    // size="small"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.btns}>
        <Button
          disabled={!remarkEditable}
          onClick={handleClear}
          className={classnames(styles.clear, !remarkEditable && styles.disabled)}
        >
          {t('Clear')}
        </Button>
        <Button
          disabled={!remarkEditable}
          type="primary"
          onClick={handleSave}
          className={classnames(styles.save, !remarkEditable && styles.disabled)}
        >
          {t('Save')}
        </Button>
      </div>
    </div>
  );
};

export default Comment;
