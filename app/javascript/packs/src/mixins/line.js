/* Especially for Line Chart Conversion, it will be later placed in a mixin*/
import { useStore } from 'vuex';

export default function() {
  const store = useStore();
  function convertToXAxisOptions(rowData) {
    let array = [];
    for (let i = 0; i < rowData.data.length; i++) {
      if (rowData.data[i][0]) {
        array.push(rowData.data[i][0]);
      } else {
        array.push('');
      }
    }
    return array;
  }

  function convertToSeriesOptions(countColumns, columnData, rowData) {
    let namedArray = [];
    let sortedArray = [];
    let finalArray = [];
    let object = {};
    let counter = 0;

    for (let i = 1; i < countColumns.value; i++) {
      sortedArray.push([]);
    }

    for (let i = 0; i < rowData.data.length; i++) {
      for (let j = 1; j < countColumns.value; j++) {
        let data = rowData.data[i][j] ? parseFloat(rowData.data[i][j]) : null;
        sortedArray[counter].push(data);
        counter++;
      }
      counter = 0;
    }

    for (let i = 1; i < countColumns.value; i++) {
      let data = columnData.data[i] ? columnData.data[i] : '';
      namedArray.push(data);
    }

    for (let i = 0; i < countColumns.value - 1; i++) {
      object['name'] = namedArray[i];
      object['data'] = sortedArray[i];
      object['type'] = 'line';

      finalArray.push(object);
      object = {};
    }
    return finalArray;
  }

  async function dispatchLineChart (axisOptions, seriesOptions) {
    await store.dispatch('changeChartsProperties', {
      property: 'xAxis', data: {
        type: 'category', categories: axisOptions
      }
    })
    await store.dispatch('changeChartsProperties', {
      property: 'series',
      data: seriesOptions
    })
  }
  
  
  return {
    convertToXAxisOptions,
    convertToSeriesOptions,
    dispatchLineChart
  }
}



/**************************************************************************************/