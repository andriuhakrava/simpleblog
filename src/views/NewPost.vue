<template>
	<div class="container">
		<h2 class="mt-5">Create new fresh and interesting POST</h2>
		<div v-if="loading">
			<img  src="../../public/images/loader.gif" 
						class="loading-img"
						alt="loading" />
		</div>
		<form v-else class="form-post" @submit.prevent="addPost">
			<div class="form-group">
		    <label for="post-title">Title: </label>
		    <input  type="text" 
		    				class="form-control" 
		    				id="posttitle" 
		    				placeholder="Enter Post title" 
		    				v-model.trim="post.title" 
		    				:class="{ 'is-invalid': $v.post.title.$error }" 
		    				@blur="$v.post.title.$touch()" 
		    				required />
		    <div class="invalid-feedback" v-if="!$v.post.title.required">
          Title field is required
        </div>
		  </div>
		  <div class="form-group">
		    <label for="post-text">Text: </label>
		    <textarea class="form-control" 
		    					id="posttext" 
		    					placeholder="Enter Post text" 
		    					v-model.trim="post.text" 
		    					rows="6" 
		    					:class="{ 'is-invalid': $v.post.text.$error }" 
		    					@blur="$v.post.text.$touch()"
		    					required>
		    </textarea>
		    <div class="invalid-feedback" v-if="!$v.post.text.required">
          Post text field is required
        </div>
		  </div>
		  <div class="form-group">
		  	<label for="img-upload" class="custom-file-upload">
				    Add Image:
				</label>
				<div><em>Image upload is required.</em></div>
				<input  id="img-upload" 
								type="file" 
								ref="postImg" 
								@change="uploadImage"
								multiple 
								accept="image/*"
		    				@blur="$v.post.postURL.$touch()" />
		  </div>
		  <div v-if="post.postURL">
		  	<img  :src="post.postURL" 
		  				:alt="fileName" 
		  				class="image-preview"
		  				height="200" />
		  </div>
		  <button type="submit" 
		  				:disabled="$v.$invalid"
		  				class="btn btn-success">
		  	Add Post
		  </button>
		</form>
	</div>
</template>

<script>
	import { required } from 'vuelidate/lib/validators';
	import { mapGetters } from 'vuex';

	export default {
		data(){
			return {
				post: {
					title: '',
					text: '',
					postURL: ''
				},
			}
		},
		computed: {
			...mapGetters(['loading']),
			fileName(){
				if(this.$refs.postImg.files[0]){
					let index = this.$refs.postImg.files[0].name.indexOf('.');
					return this.$refs.postImg.files[0].name.substring(0, index);
				}
			},
		},
		validations: {
			post: {
				title: {
					required
				},
				text: {
					required
				},
				postURL: {
					required
				},
			},
		},
		methods: {
			uploadImage(){
				let img = this.$refs.postImg.files[0];
				this.post.postURL = img ? URL.createObjectURL(img) : '';
			},
			addPost(){
				if (this.post.title !== '' && this.post.text !== ''){
					let formData = new FormData();
					formData.append('title', this.post.title);
					formData.append('text', this.post.text);
					formData.append('image', this.$refs.postImg.files[0]);
					formData.append('user', localStorage.getItem('user'));
					formData.append('active', true);
					this.$store.dispatch('createPost', formData);
				}
			},
		},
	}
</script>

<style scoped>
	.form-post {
		margin: 20px auto;
		max-width: 500px;
	}
	input[type="file"] {
    display: none;
	}
	.custom-file-upload {
		background: orange;
		color: #fff;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
	}
	.image-preview {
		margin-bottom: 22px;
	}
	.invalid-feedback {
		font-style: italic;
	}
</style>