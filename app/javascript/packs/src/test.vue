          <template>
            <p v-if="number === 2">
              Mein Name ist: {{ name }} <!-- -->
            </p>
            <button @click="changeName">Name ändern</button>
          </template>

          <script>
            export default {
              data(){
                return {
                  name: "Tai",
                  number: 2
                }
              },
              methods: {
                changeName: function () {
                    this.name = "Olaf";
                }
              }
            }
          </script>