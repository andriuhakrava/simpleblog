<template>
  <div>
  	<h2 class="mt-4">Posts List</h2>
    <div class="error-box" v-if="errorMessage">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <div v-if="loading">
      <img  src="../../public/images/loader.gif" 
            height="350" 
            width="350" 
            alt="loading" />
    </div>
    <div v-else class="post-list">
      <div class="post-card" v-for="(post, index) in postsList" :key="post.id">
        <div class="post-text">
          <h4>{{ post.title }}</h4>
          <p>{{ post.text }}</p>
          <p class="post-text_created">
            <strong>Created at:</strong> 
            {{ postsListDate[index] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loading']),
    postsList(){
      return this.$store.getters.postsList;
    },
    postsListDate(){
      const postsDates = this.$store.getters.postsList.map(post => {
        return new Date(post.created).toLocaleString(); 
      });
      return postsDates;
    },
    errorMessage(){
      return this.$store.state.errorMessage;
    }
  },
  beforeMount(){
    this.$store.dispatch('fetchPosts');
    this.$store.commit('setErrorMessage', null);
  },
}
</script>

<style scoped>
  .post-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 20px;
  }
  .post-card {
    padding: 17px 0;
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
  @media screen and (max-width: 500px){
    h2 {
      font-size: 1.5em;
    }
    h4 {
      font-size: 1.2em;
      font-weight: bold;
    }
    .post-text_created {
      font-size: 1em;
      text-align: center;
    }
    .post-text_created strong {
      display: block;
    }
  }
</style>