const enumHelper = {
    gender: [
        {value: 1, label: "Male"},
        {value: 2, label: "Female"},
        {value: 3, label: "Other"}
    ]
};

const getEnumLabel = (arr: {value: Number, label: string}[], val: Number) => {
    return arr.find(({value}) => value === val)?.label
};

const getEnumItem = (arr: {value: Number, label: string}[], val: Number) => {
    return arr.find(({value}) => value === val)
};



export {enumHelper, getEnumLabel, getEnumItem };