<template>
  <v-layout column>
		<v-flex xs24 text-xs-center>
			<p>使用codesandbox加载可能比较慢，需要翻墙或加速器。或在github上查看
			<a href="https://github.com/zzcwzhang/zylike-front">https://github.com/zzcwzhang/zylike-front</a>
</p>
		</v-flex>
	<v-flex xs24 text-xs-center>
	<iframe src="https://codesandbox.io/s/rm3jlzlmrq" style="width:100%; height:calc(100vh - 160px); border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
	</v-flex>
  </v-layout>
</template>

<script>
export default {
    head() {
      return {
        title: 'zylike个人小站/inspect',
        meta: [{
          hid: 'description',
          name: 'description',
          content: '拉了空间的手法俄方'
        }]
      }
    },
}
</script>
