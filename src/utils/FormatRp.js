export const formatRupiah = (number = 0) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatNumber = (number = 0) => {
  return new Intl.NumberFormat('id-ID').format(number);
};