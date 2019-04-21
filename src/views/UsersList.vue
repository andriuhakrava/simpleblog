<template>
	<div class="container">
		<h2 class="mt-4">Users List</h2>
		<div v-if="loading">
			<img 	src="../../public/images/H8rC.gif" 
						height="350" 
						width="350" 
						alt="loading" />
		</div>
		<div v-else class="user-card" v-for="(user, index) in usersList" :key="user.id">
			<div class="user-info">
				<div class="user-avatar">
					<img 	src="../../public/images/149072.png" 
								height="128" 
								width="128" 
								alt="user" />
				</div>
				<div class="user-text">
					<p><strong>Email: </strong>{{ user.email }}</p>
					<p><strong>Username: </strong>{{ user.username }}</p>
					<p><strong>Joined: </strong>{{ usersListDate[index] }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created(){
			this.$store.dispatch('getUsers');
		},
		computed: {
			usersList(){
        return this.$store.state.usersList;
      },
      usersListDate(){
     		const usersJoinedDates = this.$store.state.usersList.map(function(user) {
     			return new Date(Date.parse(user.date_joined)).toLocaleString();	
     		});
     		return usersJoinedDates;
      },
      loading(){
      	return this.$store.state.loading;
      }
		}
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
	}
</style>