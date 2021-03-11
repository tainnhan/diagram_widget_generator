export default {


/****************************** CRUD FUNKTIONALITÄTEN ************************************************************/
  async submitForm(context, payload) {
    const url = window.location.origin + context.state.pathName + '/charts';
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    const data = {
      options: payload.data
    };
    await fetch(url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(data)}).catch((error) => console.log(error))
  },

  //GET
  async fetchCharts(context) {
    const url = window.location.origin + context.state.pathName + '/api' + '/charts.json';
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        context.commit('setChartsList', data)
      })
      .catch((error) => console.log(error))
  },

  //GET Single Chart
  async fetchChart(context, payload){
    const url = window.location.origin + context.state.pathName + '/api' + '/chart/' + payload.id + '.json';
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        context.commit('setChart', data)
      })
      .catch((error) => console.log(error))
  },

  //DELETE
  async deleteChart(context, payload){
    const url = window.location.origin + context.state.pathName + '/charts' +  '/' + payload.id;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    await fetch(url , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      }
    }).then(data => context.commit('deleteChart', payload))
      .catch((error) => console.log(error))
  },

  //PUT
  async putChart(context, payload) {
    const url = window.location.origin + context.state.pathName + '/charts' +  '/' + payload.id;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    const data = {
      options: payload.data
    }
    await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error))
  },


  /****************************** Für HighChartsOptionen ************************************************************/

  changePropertyWithOneKey(context, payload){
    context.commit('changePropertyWithOneKey', payload)

  },
  changePropertyWithTwoKeys(context, payload){
    context.commit('changePropertyWithTwoKeys', payload)

  },
  changePropertyWithThreeKeys(context, payload){
    context.commit('changePropertyWithThreeKeys', payload)

  },
  changePropertyWithFourKeys(context, payload){
    context.commit('changePropertyWithFourKeys', payload)
  },
  changePropertyWithKeyIndex(context, payload){
    context.commit('changePropertyWithKeyIndex', payload)

  },
  changePropertyWithKeyIndexKey(context, payload){
    context.commit('changePropertyWithKeyIndexKey', payload)

  },
  changePropertyWithKeyIndexKeyKey(context, payload){
    context.commit('changePropertyWithKeyIndexKeyKey', payload)

  },
  changePropertyWithKeyIndexKeyIndexKey( context, payload){
    context.commit('changePropertyWithKeyIndexKeyIndexKey', payload)

  },

  /***********************************************************************************************************/

  resetForm(context) {
    context.commit('resetForm')
  },

  setPathName(context) {
    const pathname = document.getElementById('widget').getAttribute('data-pathname')
    context.commit('setPathName', {
      pathname: pathname
    })
  },
  setUser(context){
    context.commit('setUser');
  },

  removeSeries(context, payload){
    context.commit('removeSeries', payload);
  },
  setDataList(context, payload){
    context.commit('setDataList', payload);
  },
  setDataIsValid(context, payload){
    context.commit('setDataIsValid', payload)
  },
  setTab(context, payload){
    context.commit('setTab', payload)
  }
}



