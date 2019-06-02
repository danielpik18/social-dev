export const getBooleanKeyValuePairsFromKeys = (passedObject, boolean) => {
    const passedObjectKeys = Object.keys(passedObject);

    const keyValuePairs = {};

    passedObject && passedObjectKeys.forEach(
        key => {
            if (Array.isArray(passedObject[key])) {

                passedObject[key].forEach(
                    value => {
                        keyValuePairs[key] = {
                            ...keyValuePairs[key],
                            [value]: boolean
                        };
                    })
            }

            else {
                const subObjectKeys = Object.keys(passedObject[key]);

                subObjectKeys.forEach(
                    subKey => {
                        keyValuePairs[subKey] = {};

                        passedObject[key][subKey].forEach(
                            (subObjectValue) => {
                                keyValuePairs[subKey] = {
                                    ...keyValuePairs[subKey],
                                    [subObjectValue]: boolean
                                };
                            });
                    })
            }
        });

    return keyValuePairs;
};

export const getAllObjectChildrenValues = (obj) => {
    const arr = [];

    if (obj) {
        const objKeys = Object.keys(obj);

        objKeys.forEach(key => {
            const objSubObj = Object.values(obj[key]);

            objSubObj.forEach(subObj => {

                if (Array.isArray(subObj)) {
                    subObj.forEach(value => arr.push(value));
                }
                else if (typeof subObj === 'object') {
                    Object.values(subObj)
                        .forEach(value => arr.push(value))
                }
                else {
                    arr.push(subObj);
                }
            })
        })
    };

    return arr;
}