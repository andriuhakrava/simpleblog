<template>
	<nav class="navbar navbar-light navigation" style="background-color: #e3f2fd;">
    <div class="navigation-topic">
      <router-link to="/" class="navbar-brand">SimpleBlog</router-link>
      <router-link to="/new" active-class="active-navigation-item" class="nav-item nav-link" v-if="isAuthenticated">Post a topic</router-link>
    </div>
    <div class="navigation-user">
      <span class="user-info" v-if="isAuthenticated">Hi, {{ this.$store.state.authenticatedUser }}!</span>
      <router-link to="/signin" active-class="active-navigation-item" class="nav-item nav-link" v-if="!isAuthenticated">Sign in</router-link>
      <router-link to="/signup" active-class="active-navigation-item" class="nav-item nav-link" v-if="!isAuthenticated">Sign up</router-link>
      <a class="nav-item nav-link" 
              @click.prevent="signOut" v-if="isAuthenticated">Sign out</a>
      <router-link v-if="isAuthenticated" to="/userslist" class="nav-item nav-link" active-class="active-navigation-item" >Users List</router-link>
    </div>
  </nav>
</template>

<script>
	export default {
		computed: {
      isAuthenticated(){
        return this.$store.state.authenticatedUser;
      }
    },
   	methods: {
      signOut(){
        console.log('Log Out!');
        this.$store.dispatch('logoutUser');
        this.$router.replace('/signin');
      }
    },
    created(){
      this.$store.commit('setUsername', localStorage.getItem('username'));
    },
    // updated(){
    //   this.username = localStorage.getItem('username');
    // }
	}
</script>

<style scoped>
	.navigation-topic, .navigation-user {
	  display: flex;
	}
	.user-info, .users-list {
	  display: flex;
	  align-items: center;
	}
	.user-info {
	  margin-right: 12px;
	}
	nav a {
	  color: #000;
	}
	nav a:hover {
	  cursor: pointer;
	}
	.active-navigation-item {
	  background: fuchsia;
	}
	@media screen and (max-width: 600px){
	  .navbar {
	    justify-content: center;
	  }
	  .navbar-brand {
	    margin-right: 0;
	  }
	  .navigation-topic {
	    display: block;
	    margin: 0 auto;  
	  }
	}
	@media screen and (max-width: 350px){
	  .navbar {
	    font-size: 14px;
	  }
	}
</style>