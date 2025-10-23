const enum IdentificationClientTag {
  Mismatch = 'Mismatch',
  FullyMatch = 'FullyMatch',
  SuspectClient = 'SuspectClient',
  ProbableMatch = 'ProbableMatch',
  NotEnoughKeyInfo = 'NotEnoughKeyInfo',
}

type IdentificationClientTagType = IdentificationClientTag | string;

export { IdentificationClientTag, IdentificationClientTagType };
