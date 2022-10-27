<template>
  <div class="container login-container">
    <div class="col-md-6 login-form-2">
      <h3>Giriş Yap</h3>
      <div class="form-group">
        <input @blur="$v.email.$touch()"
               v-model="$v.email.$model"
               type="email"
               :class="{'is-invalid' : $v.email.$error}"
               class="form-control"
               placeholder="Email *"
        />
        <small v-if="!$v.email.required" class="form-text text-white">Bu alan zorunludur...</small>
        <small v-if="!$v.email.email" class="form-text text-white">Lütfen geçerli bir e-posta adresi
          giriniz...
        </small>
      </div>
      <br />
      <div class="form-group">
        <input @blur="$v.password.$touch()" v-model="$v.password.$model" :class="{'is-invalid' : $v.password.$error}" type="password" class="form-control" placeholder="Şifre *" value="" />
        <small v-if="!$v.password.required" class="form-text text-white">Bu alan zorunludur...</small>
        <small v-if="!$v.password.minLength" class="form-text text-white">Lütfen şifreniz en az {{
            $v.password.$params.minLength.min }} karakterden oluşmalıdır...
        </small>
      </div>
      <br />

      <div class="form-group" v-if="isLoading===false">
        <input type="submit" :disabled="$v.$invalid" @click="btnLogin" class="btnSubmit" value="Giriş" />
      </div>
      <div class="spinner-border text-primary" role="status" v-else>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

  </div>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators"
import {router} from "../../router";
import {CustomBaseAlert} from "../../components/alert/CustomBaseAlert";
import {sessionStorageService} from "../../handlers/sessionStorageService";

export default {
  data () {
    return {
      email: null,
      password: null,
      isLoading: false,
    }
  },
  validations:{
    email: {
      required,
      email
    },
    password: {
      required,
      minLength:minLength(6),
    }
  },
  methods:{
    btnLogin(){
      this.isLoading=true;
      const request={
        email: this.email,
        password: this.password
      }
      console.log(process.env.VUE_APP_TITLE);
      this.$axios.post("/login", request)
        .then(res=>{
          sessionStorageService.returnSetAccessToken(res.data.payload.token);
          CustomBaseAlert("Tebrikler", "Giriş Başarılı", "success");
          router.replace("/admins")
        })
        .catch(err => {
          console.log(err)
          CustomBaseAlert("Dikkat", "Bilgilerinizi kontrol ediniz", "error");
        })
        .finally(()=>{
          this.isLoading=false;
        });

    }
  },
}
</script>

<style scoped>
.login-container{
  margin-top: 5%;
  margin-bottom: 5%;
}
.login-form-2{
  margin: auto;
  padding: 3% 7% 5%;
  background: #0062cc;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}
.btnSubmit
{
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}
.btnSubmit:disabled
{
  opacity: 0.5;
}
.login-form-2 .btnSubmit{
  font-weight: 600;
  color: #0062cc;
  background-color: #fff;
  float: right;
}
.spinner-border{
  float: right;
  margin-right: 20px;
}
.login-form-2 {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

@media screen and (min-width: 300px) and (max-width: 600px){
  .login-form-2{
    margin: auto;
    padding: 3% 7% 60%;
    background-color: red !important;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
  }
}

</style>
