export default function () {
  function headerToCsv(data){
    let csvHeader = "";
    data.forEach(function (item, index) {
      csvHeader += item === '' ? '\"null\"' : `\"${item}\"`;
      csvHeader += index < data.length - 1 ? ';' : '\n';
    })
    return csvHeader;
  }

  function arrayToCsv(data) {
    let csv = ""
    data.forEach(function (item) {
      item.forEach(function (item_2, index_2) {
        if(item_2 !== '' && index_2 !== 0){
          csv += item_2
        }
        if(item_2 !=='' && index_2 === 0) {
          csv += `\"${item_2}\"`
        }

        csv += index_2 < item.length - 1 ? ';' : '\n'
      })
    })
    return csv;
  }

  return { headerToCsv, arrayToCsv }
}