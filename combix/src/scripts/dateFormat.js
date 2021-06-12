const months = {1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'};

exports.dateFormat = (dateString) => {
  let [date] = dateString.split('T');
  let [y, m, d] = date.match(/\d+/g);
  return `${d}/${m}/${y}`;
}

exports.dateFormatPretty = (dateString) => {
  let [date] = dateString.split('T');
  let [y, m, d] = date.match(/\d+/g);
  return `${d} ${months[parseInt(m)]}. ${y}`;
}