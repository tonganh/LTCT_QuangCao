export const get5YearAgo = () => {
  const yearNow = Number(new Date().getFullYear());
  const fiveYearAgo = yearNow - 5;
  let obj = {};
  let arr: any = [];
  for (let i = fiveYearAgo; i < yearNow; i++) {
    obj = {
      ...obj,
      [`NAM_${i}_${i + 1}`]: 0,
    };
    arr = [
      ...arr,
      {
        title: `${i}-${i + 1}`,
        key: `NAM_${i}_${i + 1}`,
      },
    ];
  }
  return {
    data: obj,
    columns: arr,
  };
};

export const get5NearestYears = () => {
  const yearNow = Number(new Date().getFullYear());
  const fiveYearAgo = yearNow - 5;
  return [...Array(5).keys()].map((key: number) => key + fiveYearAgo);
};
export const romanize = (num: number) => {
  if (!+num) return false;
  let i = 3;
  let roman = '';
  const digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ];
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
};
