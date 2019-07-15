<template>
  <div class="container">
    <div v-if="loading">
      <img src="../../public/images/loader.gif" class="loading-img" alt="loading" />
    </div>
    <form class="form-login" v-else @submit.prevent="onLogin">
      <div class="error-box" v-if="errorMessage">
        <p>{{ errorMessage.non_field_errors[0] }}</p>
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" id="username" placeholder="Enter username" v-model="user.username" :class="{ 'is-invalid': $v.user.username.$error }" @blur="$v.user.username.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.user.username.required">
          Username field is required
        </div>
      </div>
      <div class="form-group">
        <label for="emailinput">Email address:</label>
        <input type="email" class="form-control" id="emailinput" placeholder="Enter email" v-model="user.email" :class="{ 'is-invalid': $v.user.email.$error }" @blur="$v.user.email.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.user.email.required">
          Email field is required
        </div>
        <div class="invalid-feedback" v-if="!$v.user.email.email">
          This field should be an email
        </div>
      </div>
      <div class="form-group">
        <label for="passwordinput">Password:</label>
        <input type="password" class="form-control" id="passwordinput" placeholder="Enter Password" v-model="user.password" :class="{ 'is-invalid': $v.user.password.$error }" @blur="$v.user.password.$touch()" autocomplete="off" required />
        <div class="invalid-feedback" v-if="!$v.user.password.required">
          Password field is required
        </div>
        <div class="invalid-feedback" v-if="!$v.user.password.minLength">
          Minimum length of password is {{ $v.user.password.$params.minLength.min }}.
          Now it is {{ user.password.length }}.
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
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  validations: {
    user: {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  computed: {
    ...mapGetters(['loading', 'errorMessage']),
  },
  created() {
    this.$store.dispatch('manageError', null);
  },
  methods: {
    onLogin() {
      const formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      this.$store.dispatch('loginUser', formData);
    },
  },
};
</script>

<style scoped>
  .form-login {
    margin: 20px auto;
    max-width: 500px;
  }
  .loading-background {
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .loading-background span {
    position: absolute;
    top: 50%;
    left: 50%;
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
