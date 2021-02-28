import { iframeResize } from 'iframe-resizer';
import Highcharts from 'highcharts';
import loadData from 'highcharts/modules/data';
loadData(Highcharts);

document.addEventListener('DOMContentLoaded', setHighcharts)

async function setHighcharts(){
  const element = document.getElementById('showChart');
  const pathName = element.getAttribute('data-pathname');
  const chartId = element.getAttribute('data-chart-id');

  await fetch(pathName + '/api' + '/chart' + '/' + chartId)
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        Highcharts.chart('showChart', data.data)
      } )
      .catch((error) => console.log(error))
}