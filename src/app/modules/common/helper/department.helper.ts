
export const handleConvertNumberToString = () => {
    
}

export const handleConvertStringToNumber = (arr: any, data: any) => {
    let arrNew: any = [];
    for (const x in arr) {
        for (const y in data) {
            if (arr[x] === data[y].name_depart) {
                arrNew = [...arrNew, data[y].id];
            }
        }
    }
    return arrNew;
};