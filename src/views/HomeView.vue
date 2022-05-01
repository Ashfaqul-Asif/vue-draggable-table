<template>
	<div class="home">
		<BaseDataTable />
	</div>
</template>

<script>
// @ is an alias to /src
import BaseDataTable from '@/components/BaseDataTable.vue'

export default {
	name: 'HomeView',
	components: {
		BaseDataTable
	}
}
</script>
