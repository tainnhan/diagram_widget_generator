export default function() {

  async function submitData(list, store, toast, wizard = true) {
          const invalidRows = [];
          //Alle Ungültigen Felder werden in ein Array namens InvalidRows gepusht
          for (let item of list) {
            if (!/^(\d*[.])?\d+$/.test(item.value) && item.value !== '' || item.value === '') {
              invalidRows.push(item.id);
            } else if(/^(\d*[.])?\d+$/.test(item.value)){
              const element = document.getElementById(item.id);
              element.style.backgroundColor = null
              element.parentElement.style.backgroundColor = null
            }
          }

            if(invalidRows.length > 0) {
              await store.dispatch('setDataIsValid', false) ;
            } else {
              await store.dispatch('setDataIsValid', true);
            }

          for (let row of invalidRows) {
            const element = document.getElementById(row);
            element.style.backgroundColor = "#f8d7da"
            element.parentElement.style.backgroundColor = "#f8d7da"
            toast.show()
          }

  }
  return {
      submitData
  }
}



/**************************************************************************************/