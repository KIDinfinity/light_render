import { Mode } from '../enum';
import useGetOptions from './useGetOptions'

interface IParams {
  mode: any
}
export default ({
  mode
}: IParams) => {
  if (mode === !Mode.multiple && mode === Mode.tag) {
    // @ts-ignore
    useGetOptions()
  }
}
