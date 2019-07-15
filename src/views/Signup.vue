<template>
  <div class="container">
    <div class="error-box" v-if="errorMessage">
      <p v-if="errorMessage.username">{{ errorMessage.username[0] }}</p>
      <p v-if="errorMessage.email">{{ errorMessage.email[0] }}</p>
      <p v-if="errorMessage.password1">{{ errorMessage.password1[0] }}</p>
    </div>
    <form class="form-register" @submit.prevent="sendUserInfoForRegistration">
      <div class="form-group">
        <label for="inputUsername">Username: </label>
        <input type="text" class="form-control" id="inputUsername" placeholder="Enter username" v-model="userInfo.username" :class="{ 'is-invalid': $v.userInfo.username.$error }" @blur="$v.userInfo.username.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.userInfo.username.required">
          Username field is required
        </div>
      </div>
      <div class="form-group">
        <label for="inputEmail">Email address: </label>
        <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="userInfo.email" :class="{'is-invalid': $v.userInfo.email.$error}" @blur="$v.userInfo.email.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.userInfo.email.required">
          Email field is required
        </div>
        <div class="invalid-feedback" v-if="!$v.userInfo.email.email">
          This field should be an email
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword1">Password:</label>
        <input type="password" class="form-control" id="inputPassword1" placeholder="Enter Password" v-model="userInfo.password1" :class="{ 'is-invalid': $v.userInfo.password1.$error }" @blur="$v.userInfo.password1.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.userInfo.password1.required">
          Password field is required
        </div>
        <div class="invalid-feedback" v-if="!$v.userInfo.password1.minLength">
          Minimum length of password is
          {{ $v.userInfo.password1.$params.minLength.min }}.
          Now it is {{ userInfo.password1.length }}.
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword2">Confirm password:</label>
        <input type="password" class="form-control" id="inputPassword2" placeholder="Confirm Password" v-model="userInfo.password2" :class="{ 'is-invalid': $v.userInfo.password2.$error }" @blur="$v.userInfo.password2.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.userInfo.password2.required">
          ConfirmPassword field is required
        </div>
        <div class="invalid-feedback" v-if="!$v.userInfo.password2.sameAs">
          Password should match!
        </div>
      </div>
      <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        password1: '',
        password2: '',
      },
    };
  },
  computed: {
    ...mapGetters(['errorMessage']),
  },
  validations: {
    userInfo: {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password1: {
        required,
        minLength: minLength(8),
      },
      password2: {
        required,
        sameAs: sameAs(vue => vue.password1),
      },
    },
  },
  created() {
    this.$store.dispatch('manageError', null);
  },
  methods: {
    sendUserInfoForRegistration() {
      const formData = new FormData();
      formData.append('username', this.userInfo.username);
      formData.append('email', this.userInfo.email);
      formData.append('password1', this.userInfo.password1);
      formData.append('password2', this.userInfo.password2);
      this.$store.dispatch('registerUser', formData);
    },
  },
};
</script>

<style>
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity ease-out 0.5s;
  }
  .fade-leave-to {
    opacity: 0;
  }
  .form-register {
    margin: 20px auto;
    max-width: 500px;
  }
  .error-box {
    font-size: 1.1em;
    color: #000;
    margin: 20px auto;
    max-width: 500px;
    background: #ccc;
    border: 2px solid #cc11aa;
    border-radius: 8px;
    box-shadow: 0 0 17px 11px #ddd;
  }
</style>
