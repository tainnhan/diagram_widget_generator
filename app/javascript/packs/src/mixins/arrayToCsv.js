export default function () {

  function headerToCsv(data){
    let csvHeader = "";
    data.forEach(function (item, index) {
      csvHeader += item === '' ? 'null' : `${item}`;
      csvHeader += index < data.length - 1 ? ';' : '\n';
    })
    return csvHeader;
  }

  function arrayToCsv(data) {
    let csv = ""
    data.forEach(function (item, index) {
      item.forEach(function (item_2, index_2) {
        if(item_2 !== '' && index_2 !== 0){
          //erste zeile -> highchart api
          if(!/^-?\d*[.]?\d*$/.test(item_2) || item_2 === '.' || item_2 === "-"){
            csv += '0';
          } else {
            csv += item_2
          }
        }
        // erste spalte
        if(item_2 !=='' && index_2 === 0) {
          csv += `${item_2}`
        }
        csv += index_2 < item.length - 1 ? ';' : '\n'
      })
    })
    return csv;
  }

  function csvToArray(csvData){
    let data = [];
    let test = csvData.split("\n");
    for (let i = 0; i < test.length; i++) {
      let value = test[i].split(";");
      data.push(value)
    }
    data.pop()

    return data;
  }

  return { headerToCsv, arrayToCsv, csvToArray }
}