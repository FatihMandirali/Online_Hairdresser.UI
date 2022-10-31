<template>
  <v-app>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
        <v-col
        cols="12"
        md="4"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Giriş Yap
            </div>

            <div class="subtitle-1 font-weight-light">
              Giriş bilgilerini girin
            </div>
          </template>

          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    label="Email"
                    class="purple-input"
                    v-model="email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    label="Şifre"
                    class="purple-input"
                    type="password"
                    v-model="password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="btnLogin"
                  >
                    Oturum Aç
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
import router from "@/router";
import {sessionStorageService} from "@/handlers/sessionStorageService";
export default {
  name: "SignIn",
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods:{
    btnLogin(){
      const request={
        email: this.email,
        password: this.password
      }
      this.$axios.post("/Login", request)
        .then(res=>{
          console.log(res);
          sessionStorageService.returnSetAccessToken(res.data.payload.token);
          //CustomBaseAlert("Tebrikler", "Giriş Başarılı", "success");
          router.replace("/")
        })
        .catch(err => {
          console.log(err)
          //CustomBaseAlert("Dikkat", "Bilgilerinizi kontrol ediniz", "error");
        })
        .finally(()=>{
          //this.isLoading=false;
        });
    }
  }
}
</script>

<style scoped>

</style>
