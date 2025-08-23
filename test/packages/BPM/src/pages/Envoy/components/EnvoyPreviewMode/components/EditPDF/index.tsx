import { useEffect } from 'react';
import { useDispatch } from 'dva';
import BasicEditor from '@ctc/ckeditor5-custom-build/build/ckeditor';
import styles from './index.less';
import {
  transformTextAreaFrameStyle,
  ckEditorConfig,
} from 'bpm/pages/Envoy/_utils/getEditPdfRelevantConfig.ts';
import { LS, LSKey } from '@/utils/cache';

export default (props) => {
  const { setEditLoading, previewHtml } = props;
  const dispatch = useDispatch();

  const onEditClick = (editorContainer, elementId) => {
    if (editorContainer) {
      editorContainer.style.border = '2px dashed var(--primary-color)';
      BasicEditor.create(editorContainer, ckEditorConfig)
        .then((editor) => {
          editor.model.document.on('change:data', () => {
            dispatch({
              type: 'envoyController/savePreviewEditContent',
              payload: {
                previewEditContent: {
                  [elementId]: editor?.getData(),
                },
              },
            });
          });
          // 监听失焦事件
          editor.ui.view.editable.element.addEventListener('blur', () => {
            editor.destroy().catch(console.error);
            const hasText = editorContainer.textContent.trim().length > 0;
            if (!hasText) {
              editorContainer.style.height = '100px';
            } else {
              editorContainer.style.height = 'auto';
            }
          });
        })
        .catch((error) => {
          console.error('Error initializing CKEditor:', error);
        });
    }
  };

  useEffect(() => {
    setEditLoading(false);
    const freeTextDomContainer = document.getElementById('p1');
    const regex = /^freeTextArea_\d+$/;
    const elements = freeTextDomContainer.querySelectorAll('*');
    elements.forEach((element, index) => {
      if (regex.test(element.id)) {
        const transformedElement = transformTextAreaFrameStyle(element);
        transformedElement.addEventListener(
          'click',
          () => onEditClick(transformedElement, element.id),
          false
        );
      }
    });
  }, []);
  useEffect(() => {
    const curTheme = LS.getItem(LSKey.THEME, false);
    const style = document.createElement('style');
    if (curTheme === 'dark') {
      style.innerHTML = `
      /* 背景颜色初始化 */
      .ck-table-cell-properties-form {
        background: #000 !important;
      }
      .ck-table-properties-form{
        background: #000 !important;
      }
      /* input颜色初始化 */
      .ck-table-cell-properties-form input {
        color: #000 !important;
      }
      .ck-table-properties-form input {
        color: #000 !important;
      }
      `;
      document.head.appendChild(style); // 在组件卸载时移除样式
    }

    return () => {
      if (style && document.head.contains(style)) {
        document.head?.removeChild(style);
      }
    };

    return;
  }, []);
  return (
    <>
      <div
        className={styles.EditPDFContainer}
        dangerouslySetInnerHTML={{ __html: previewHtml }}
       />
    </>
  );
};
