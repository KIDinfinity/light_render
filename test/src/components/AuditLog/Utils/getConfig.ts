export default (config: any) => {
  return config?.reduce(
    (configMap: any, current: any) => {
      return {
        ...configMap,
        saveClaim: configMap.saveClaim.concat(`${current.namespace}/${current?.saveClaim}`),
        clearClaim: configMap.clearClaim.concat(`${current.namespace}/${current?.clearClaim}`),
        onFieldChange: configMap.onFieldChange.concat(
          `${current.namespace}/${current?.onFieldChange}`
        ),
        [current.namespace]: current,
      };
    },
    {
      saveClaim: [],
      clearClaim: [],
      onFieldChange: [],
    }
  );
};
