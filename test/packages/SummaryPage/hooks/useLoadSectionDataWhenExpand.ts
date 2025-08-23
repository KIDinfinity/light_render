import useExpandEventSubscrition from 'basic/components/ExpandableContainer/hooks/useExpandEventSubscrition';
import ExpandEvent from 'enum/ExpandEvent';
import useLoadSummarySectionDataCallback from 'summary/hooks/useLoadSummarySectionDataCallback';

export default () => {
  const handleLoadSectionData = useLoadSummarySectionDataCallback();
  useExpandEventSubscrition({
    callback: ({ data }) => {
      handleLoadSectionData({
        sectionIds: data.sectionIds,
        type: data.type,
        sectionId: data?.sectionId,
      });
    },
    events: [
      ExpandEvent.EXPAND_ALL,
      ExpandEvent.EXPAND_TARGET_SECTIONS,
      ExpandEvent.EXPAND_SINGLE_SECTION,
    ],
  });
};
