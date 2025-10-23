import Reassign from './Reassign';
import Filter from './Filter';
import Export from './Export';
import Apply from './Apply';
import Clear from './Clear';
import Customise from './Customise';
import Upload from './Upload';
import Default from './Default';
import OCRResult from './OCRResult';

const Buttons = ({ children }: any) => {
  return { children };
};

Buttons.Reassign = Reassign;
Buttons.Filter = Filter;
Buttons.Export = Export;
Buttons.Apply = Apply;
Buttons.Clear = Clear;
Buttons.Customise = Customise;
Buttons.Upload = Upload;
Buttons.Default = Default;
Buttons.OCRResult = OCRResult;

export default Buttons;
