<template>
  <div>
		<v-container>
			<v-layout row justify-center align-center>
				<v-flex sx12 md8 lg6>
					<div>
						{{content}}
					</div>
				</v-flex>
			</v-layout>
		</v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'normal',
    mounted() {
    },
    async asyncData(context) {
      const {
        mid
      } = context.params;
			const param = { mid };
			console.og(param);
      const res = await axios.post('https://manage.zylike.com/api/article/normal', param);
			const { success } = res.data;
			if( success ) {
				const { data } = res.data;
				return data[0];
			} else {
				const { info } = res.data;
				return false;
			}
    },
  };
</script>
