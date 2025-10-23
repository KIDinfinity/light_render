import { entries, chain, compact } from 'lodash';

export default (mapObject: any, id: string): string[] =>
  compact(
    chain(entries(mapObject))
      .filter((item: any) => item[1] === id)
      .map((item: any) => item[0])
      .uniq()
      .value()
  );
