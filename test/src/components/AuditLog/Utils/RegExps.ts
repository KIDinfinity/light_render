export const RegArrays = /\[(.*?)\[(.*?)\]]/g;

export const RegAction = /(__added|__deleted|__new)\[(.*?)\]/g;

export const RegAdd = /(__added|__new)/;

export const RegRemove = /__deleted/;

export const RegAdded = /__added/;

export const RegNew = /.__new/;

export const RegPath = /\[(.*?)\]/g;

export const RegArrayIndex = /\d(?!.*\d)/g;

export const RegNumber = /\d/g;

export const RegPoint = /\./g;

export const RegFormData = /(.*?)formData/g;
