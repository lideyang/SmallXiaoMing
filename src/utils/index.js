function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

export const formatCurrency = (num, flag = false) => {//保留两位小数
  let argNum = arguments.length;
  if (num == null || num == 0) {
    return flag ? "0.00" : "0";
  }
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num))
    num = "0";
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ","
      + num.substring(num.length - (4 * i + 3));
  return (((sign) ? "" : "-") + num + (flag ? ("." + cents) : ""));
};
export default {
  formatNumber,
  formatTime,
  formatCurrency
};
