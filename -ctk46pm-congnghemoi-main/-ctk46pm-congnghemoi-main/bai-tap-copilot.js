function laSoNguyenTo(n) {
  if (!Number.isInteger(n) || n < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function daoNguocChuoi(str) {
  return str.split("").reverse().join("");
}

function timSoLonNhat(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  return Math.max(...arr);
}

module.exports = {
  laSoNguyenTo,
  daoNguocChuoi,
  timSoLonNhat,
};
