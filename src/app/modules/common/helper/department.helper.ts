export const handleConvertNumberToString = (arr: Number[], data: any) => {
  let arrNew: any = [];
  for (const x in arr) {
    for (const y in data) {
      if (arr[x] === data[y].id) {
        arrNew = [...arrNew, data[y].name_depart];
      }
    }
  }
  return arrNew;
};

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
