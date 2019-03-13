<template>
  <section id="about-page">
		<h1>过往项目</h1>
		<v-container>
			<v-card flat v-for="project in projects" :key="project.title">
				<v-layout row wrap :class="`pa-3 project ${project.status}`">
					<v-flex sx12 md6>
						<div class="caption grey--text">Project title</div>
						<div>{{project.title}}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Person</div>
						<div>{{project.person}}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Due by</div>
						<div>{{project.due}}</div>
					</v-flex>
					<v-flex xs2 sm4 md2>
						<div class="right">
							<v-chip :class="`${project.status} caption my-2`">{{ project.status }}</v-chip>
						</div>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
			</v-card>
		</v-container>
  </section>
</template>

<script>
  export default {
		data() {
			return {
				projects: [
					{ title: 'Design a new website', person: 'The Net Ninja', due: '126 Jan 2019', status:'ongoing'},
					{ title: 'website server', person: 'me', due: '126 Jan 2019', status:'overdue'},
					{ title: 'JumpStart', person: 'babazixun', due: '2018', status:'complete'},
					{ title: 'HongXue/Caishang', person: 'babazixun', due: '2018', status:'complete'},
				]
			}
		}
  }
</script>

<style>
.project.complete {
	border-left: 4px solid #3cd1c2;
}
.project.ongoing {
	border-left: 4px solid orange;
}
.project.overdue {
	border-left: 4px solid red;
}
.v-chip.complete {
	background: #3cd1c2;
}
.v-chip.ongoing {
	background: orange;
}
.v-chip.overdue {
	background: red;
}
</style>
