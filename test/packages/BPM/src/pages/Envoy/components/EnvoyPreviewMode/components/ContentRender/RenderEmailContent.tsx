import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import ErrorTip from '../ErrorTip';
let timer = null;

function RenderEmailContent({ form }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const content = useSelector(
    ({ envoyController }: any) =>
      envoyController.previewModeData?.letters?.[envoyController?.previewSelectLetter]?.after
        ?.params?.content,
    shallowEqual
  );
  const previewSelectLetter = useSelector(
    ({ envoyController }: any) => envoyController.previewSelectLetter,
    shallowEqual
  );

  const revert = useSelector(
    ({ envoyController }: any) => envoyController.previewRevert,
    shallowEqual
  );

  const previewModePageAtomConfig = useSelector(
    ({ envoyController }: any) => envoyController.previewModePageAtomConfig,
    shallowEqual
  );
  const emailContentConfig = useMemo(() => {
    return lodash.find(previewModePageAtomConfig, (item) => item.field === 'emailContent') || {};
  }, [previewModePageAtomConfig]);

  const contentRef = useRef();
  contentRef.current = formUtils.cleanValidateData(content) || '';

  const changeContentHandle = useCallback((e) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      let contentForm = `${content.substr(0, content.search('<head>'))}${
        e.target.parentElement.innerHTML
      }${content.substr(content.search('</html>'))}`;
      setShowError(false);
      if (
        (lodash.isEmpty(e.target.parentElement.innerText) ||
          e.target.parentElement.innerText === '\n') &&
        emailContentConfig?.['field-props']?.required === 'Y'
      ) {
        setShowError(true);
        contentForm = {
          value: '',
          name: 'content',
          touched: true,
          label: 'Email Content',
          locale_old: '',
          locale_new: '',
          format: '',
          dirty: false,
          errors: [{ message: 'Required!', field: 'content' }],
          validating: false,
        };
      }
      dispatch({
        type: 'envoyController/saveEntry',
        target: 'saveLetterForm',
        payload: {
          changedFields: {
            content: contentForm,
          },
        },
      });
    }, 300);
  }, []);

  const disableAJumpHandle = useCallback((event) => {
    // 兼容处理
    const target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'a') {
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'envoyController/savePreivewForm',
      payload: {
        previewForm: { content: form },
      },
    });
  }, [form]);

  useEffect(() => {
    let iframedoc = null;
    if (document.querySelector('#test_iframe')) {
      const iframe = document.querySelector('#test_iframe');
      iframedoc = iframe.document;
      if (iframe.contentDocument) iframedoc = iframe.contentDocument;
      else if (iframe.contentWindow) {
        iframedoc = iframe.contentWindow.document;
      }

      if (iframedoc) {
        iframedoc.open();
        iframedoc.writeln(contentRef.current);
        iframedoc.close();
        iframedoc.designMode = 'on';
        iframedoc.addEventListener('input', changeContentHandle, false);
        if (emailContentConfig?.['field-props']?.editable !== 'Y') {
          iframedoc.body.style.cursor = 'no-drop';
          iframedoc.designMode = 'off';
          iframedoc.contentEditable = 'false';
          iframedoc.addEventListener('click', disableAJumpHandle);
        }
      } else {
        console.log('error');
      }
    }
    return () => {
      if (iframedoc) {
        iframedoc.removeEventListener('input', changeContentHandle);
        iframedoc.removeEventListener('click', disableAJumpHandle);
      }
    };
  }, [previewSelectLetter, revert, emailContentConfig]);

  useEffect(() => {
    if (!lodash.isObject(content) || emailContentConfig?.['field-props']?.required !== 'Y') {
      setShowError(false);
    }
  }, [content, emailContentConfig?.['field-props']?.required]);

  return (
    <div className={styles.RenderEmailContent}>
      {showError && <ErrorTip className={styles.errorTip} />}
      {emailContentConfig?.['field-props']?.visible === 'Y' && (
        <iframe
          id="test_iframe"
          src="about:blank"
          width="100%"
          height="100%"
          frameBorder="0"
          className={styles.iframeBox}
         />
      )}
    </div>
  );
}

export default React.memo(RenderEmailContent);
