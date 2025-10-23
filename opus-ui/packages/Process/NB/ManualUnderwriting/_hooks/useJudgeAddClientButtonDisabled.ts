import { useMemo } from "react";
import lodash from 'lodash'
import useGetClientDetailList  from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default () => {

    const list = useGetClientDetailList()
    return useMemo(() => {
        const firstClientRoles = lodash.chain(list).get('[0].roleList', []).value()
        if(lodash.isEmpty(list) || !list) {
            return false
        }
        if (lodash.has(list, 'length') && lodash.isEmpty(firstClientRoles)) {
            return true
        }

    }, [list])
}
