import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { router } from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: '',
		token: '',
		authenticatedUser: '',
		usersList: '',
		postsList: '',
		loading: null,
		error: null,
		errorMessage: ''
	},
	getters: {
		userInfo(state){
			return state.user;
		},
		usersList(state){
			return state.usersList;
		},
		postsList(state){
			return state.postsList;
		}
	},
	mutations: {
		setUser(state, payload){
			state.user = payload.user;
			state.token = payload.token;
		},
		setUsername(state, payload){
			state.authenticatedUser = payload;
		},
		setLoading(state, payload){
			state.loading = payload;
		},
		setError(state, payload){
			state.error = payload;
		},
		setErrorMessage(state, payload){
			state.errorMessage = payload;
		},
		setUsersList(state, payload){
			state.usersList = payload;
		},
		setPostsList(state, payload){
			state.postsList = payload;
		},
		addPost(state, payload){
			state.postsList.push(payload);
		}
	},
	actions: {
		registerUser({ commit, state }, payload){
			commit('setLoading', true);
			commit('setError', null);
			commit('setErrorMessage', null);
			axios.post('/rest-auth/registration/', payload)
						.then(response => {
							commit('setLoading', false);
							localStorage.setItem('jwt', response.data.token);
							localStorage.setItem('orig_iat', response.data.token);
							localStorage.setItem('user', response.data.user.pk);
							localStorage.setItem('username', response.data.user.username);
							commit('setUser', {
								user: response.data.user,
								token: response.data.token
							});
							commit('setUsername', localStorage.getItem('username'));
							router.push('/');
						})
						.catch(error => {
							// console.log('Error Message:', error.response);
							commit('setLoading', false);
							commit('setError', error);
							if (state.error.request.status === 400){
								commit('setErrorMessage', JSON.parse(state.error.request.responseText));
							}
						});
		},
		loginUser({ commit, state }, payload){
			commit('setLoading', true);
			commit('setError', null);
			commit('setErrorMessage', null);
			axios.post('/rest-auth/login/', payload)
						.then(response => {
							// console.log('log In....', response.data.user.username);
							commit('setLoading', false);
							// console.log('SUCCESS', response.data);
							localStorage.setItem('jwt', response.data.token);
							localStorage.setItem('orig_iat', response.data.token);
							localStorage.setItem('user', response.data.user.pk);
							localStorage.setItem('username', response.data.user.username);
							commit('setUser', {
								user: response.data.user,
								token: response.data.token
							});
							commit('setUsername', localStorage.getItem('username'));
							router.push('/');
						})
						.catch(error => {
							// console.log(error.response);
							commit('setLoading', false);
							commit('setError', error);
							if (state.error.response.status === 400){
								commit('setErrorMessage', JSON.parse(state.error.response.request.responseText));
							}
						});
		},
		logoutUser({ commit }){
   		localStorage.clear();
			commit('setUsername', null);
			commit('setUser', {user: null, token: null});
			commit('setError', null);
			commit('setPostsList', null);
			commit('setUsersList', null);
		},
		getUsers({ commit, state }){
			commit('setLoading', true);
			const config = { headers: { 'Authorization': 'JWT ' + localStorage.getItem('jwt'),
                       'Content-Type': 'multipart/form-data' }};
			axios.get('/users-list/', config).then(response => {
				commit('setLoading', false);
				// console.log('users', response.data)
				commit('setUsersList', response.data);
			})
			.catch(error => {
				// console.log(error.response.data.detail);
				commit('setLoading', false);
				commit('setError', error);
				if (error.response.data.detail){
					// console.log('HELLO!');
					commit('setErrorMessage', state.error.response.data.detail);
					router.push('/signin');
				}
			});
		},
		verifyToken({ commit, state }){
			// console.log('Verificate Token...');
			let currentToken = localStorage.getItem('jwt');
			// console.log(currentToken);
			if (!currentToken) return;
			return axios.post('/api-token-verify/', {"token": currentToken})
						.then(response => {
							// console.log('Verify checked!!!');
							if (response.status === 200){
								// console.log(response);
								axios.post('/api-token-refresh/', {"token": localStorage.getItem('orig_iat')})
											.then(newResponse => {
												// console.log('Refresh success!!!');
												localStorage.setItem('jwt', newResponse.data.token);
											})
											.catch(error => {
												// console.log('TOKEN_REFRESH Error...', error.response);
												localStorage.clear();
												commit('setUsername',false);
												commit('setError', error);
												// console.log('MISTAKE', state.error);
												if (error.response.data.non_field_errors){
													commit('setErrorMessage', state.error.response.data.non_field_errors[0]);
													router.push('/signin');
												}
											});
							}
							return response;
						})
						.catch(error => {
							localStorage.clear();
							// console.log('TOKEN_VERIFY Error...', error.response);
							commit('setError', error);
							commit('setUsername',false);
							router.push('/signin');
						});
		},
		fetchPosts({ commit, state }){
			commit('setLoading', true);
			commit('setError', null);
			const config = { headers: { "Authorization": "JWT " + localStorage.getItem("jwt") }};
			axios.get('/posts/', config).then(response => {
				// console.log('Posts', response.data);
				commit('setLoading', false);
				if (response.data){
					commit('setPostsList', response.data);
				}
			})
			.catch(error => {
				// console.log('FETCH Error...', error.response);
				commit('setLoading', false);
				commit('setError', error);
				if (error.response.data.detail){
					commit('setErrorMessage', state.error.response.data.detail);
					router.push('/signin');
				}
			});;
		},
		createPost({ commit }, payload){
			commit('setLoading', true);
			commit('setError', null);
			const config = { headers: { 'Authorization': 'JWT ' + localStorage.getItem('jwt'),
                       'Content-Type': 'multipart/form-data' }};
			axios.post('/posts/', payload, config).then(response => {
				// console.log('Created Post!');
				commit('setLoading', false);
				// console.log(response);
				if (response.data){
					commit('addPost', response.data);
					router.push('/');
				}
			})
			.catch(error => {
				// console.log('ERROR', error.response.data.detail);
				commit('setLoading', false);
				commit('setError', error);
				if (error.response.data.detail){
					// console.log('BONJOUR!');
					commit('setErrorMessage', state.error.response.data.detail);
					router.push('/signin');
				}
			});
		}
	}
})