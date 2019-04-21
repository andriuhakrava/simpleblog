<template>
  <div class="home">
  	<h2 class="mt-4">Posts List</h2>
    <!-- <button @click="getPosts">Click me!</button> -->
    <div class="error-box" v-if="errorMessage">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <div v-if="loading">
      <img src="../../public/images/H8rC.gif" height="350" width="350" alt="loading">
    </div>
    <div v-else class="post-list">
      <div class="post-card" v-for="post in postsList">
        <!-- <img v-if="post.image" :src="post.image" alt="post.title" height="222" /> -->
        <div class="post-text">
          <h4>{{ post.title }}</h4>
          <p>{{ post.text }}</p>
          <p class="post-text_created"><strong>Created at:</strong> {{ new Date(post.created).toLocaleString() }}</p>
        </div>
      </div>
    </div>
    <!-- {{ userInfo }} -->
  </div>
</template>

<script>

export default {
  computed: {
    postsList(){
      return this.$store.getters.postsList;
    },
    loading(){
      return this.$store.state.loading;
    },
    errorMessage(){
      return this.$store.state.errorMessage;
    }
  },
  beforeMount(){
    this.$store.dispatch('fetchPosts');
    this.$store.commit('setErrorMessage', null);
  },
  // created(){
  //   this.$store.commit('setErrorMessage', null);
  // }
}
</script>

<style scoped>
  .post-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 20px;
  }
  .post-card {
    padding: 17px 0;
    /*margin: 0 auto 12px;*/
    max-width: 400px;
    margin: 0 15px 25px;
    border: 3px solid #ccc;
    border-radius: 7px;
    box-shadow: 0 0 12px #ddeecc;
  }
  img {
    max-width: 350px;
  }
  h4 {
    padding: 9px 0;
    font-size: 1.4em;
  }
  .post-text {
    padding: 0 28px;
  }
  .post-text_created {
    text-align: left;
  }
  @media screen and (max-width: 1200px){
    .post-list {
      justify-content: space-around;
    }
    .post-card {
      padding: 17px 0;
      max-width: 400px;
      margin: 0 15px 25px;
      border: 3px solid #ccc;
      border-radius: 7px;
      box-shadow: 0 0 12px #ddeecc;
    }
  }
</style>