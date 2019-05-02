<template>
	<div class="container">
		<h2 class="mt-4">Users List</h2>
		<div v-if="loading">
			<img 	src="../../public/images/loader.gif" 
						class="loading-img"
						alt="loading" />
		</div>
		<div v-else class="user-card" v-for="(user, index) in usersList" :key="user.id">
			<div class="user-info">
				<div class="user-avatar">
					<img 	src="../../public/images/avatar.png" 
								class="user-avatar-img" 
								alt="user" />
				</div>
				<div class="user-text">
					<p><strong>Email: </strong>{{ user.email }}</p>
					<p><strong>Username: </strong>{{ user.username }}</p>
					<p v-if="usersListDate">
						<strong>Joined: </strong>
						{{ usersListDate[index] }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

	export default {
		created(){
			this.$store.dispatch('getUsers');
		},
		computed: {
			...mapGetters(['loading', 'usersList']),
      usersListDate(){
     		const usersJoinedDates = this.usersList.map(user => {
     			return new Date(Date.parse(user.date_joined)).toLocaleString();	
     		});
     		return usersJoinedDates;
      },
		},
	}
</script>

<style scoped>
	.user-card {
		max-width: 500px;
		margin: 24px auto;
		background: #cceedd;
		border-radius: 9px;
	}
	.user-info {
		display: flex;
		flex-direction: row;
	}
	.user-avatar {
		padding: 9px 13px;
	}
	.user-avatar-img {
		height: 128px;
		width: 128px;
	}
	.user-text {
		text-align: left;
		padding: 9px 13px;
	}
	ul {
		list-style-type: none;
	}	
	@media screen and (max-width: 600px){
		.user-info {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.user-avatar {
			padding-top: 18px;
		}
	}
</style>