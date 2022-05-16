
<template>
	<div class="bg-background-secondary">
		<div class="text-right py-6">
			<span class="pr-6 font-bold text-sm">{{list.length}} people on the list</span>
		</div>

		<table class="border-collapse border-2 border-DD w-full table-hover table-auto">
			<thead class="text-bg-55 text-sm w-full overflow-auto">
				<tr>
					<th v-for="(header,i) in tableHeaders" :key="i" class="border border-DD py-4">{{header}}</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(row, index) in list "
					:key="index"
					:data-index="index"
					class="text-sm text-black"
					draggable="true"
					@dragstart="handleDragStart"
					@dragenter="handleDragEnter"
					@dragleave="handleDragLeave"
					@dragover="handleDragOver"
					@drop="handleDrop"
				>
					<td class="border border-DD py-4 flex space-x-2">
						<img
							v-if="!row.isSorted"
							class="w-4 text-primary ml-2"
							src="@/assets/check-mark-close.svg"
							alt
							srcset
						/>
						<img
							v-if="row.isSorted"
							class="w-4 text-primary ml-2"
							src="@/assets/check-mark.svg"
							alt
							srcset
						/>

						<div class="pl-2">{{row.first_name}} {{row.isSorted}}</div>
					</td>
					<td class="border border-DD">{{row.last_name}}</td>
					<td class="border border-DD">{{row.email}}</td>
					<td class="border border-DD">{{row.number_of_potatoes}}</td>
					<td class="border border-DD">{{row.Location}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'BaseDataTable',
	// props: {
	//   msg: String
	// }
	props: ['handleListChange', 'list', 'tableHeaders'],
	data() {
		return {
			dragging: null,

		}
	},
	methods: {
		handleDragStart(e) {
			e.dataTransfer.setData('text/plain', e.currentTarget.dataset.index)
		},
		handleDragEnter(e) {
			e.currentTarget.classList.add('hover')
		},
		handleDragLeave(e) {
			e.currentTarget.classList.remove('hover')
		},
		handleDragOver(e) {
			e.preventDefault()
		},
		handleDrop(e) {
			e.preventDefault()
			console.log('current Target', e.currentTarget)
			const itemIndex = e.dataTransfer.getData('text/plain'),
				droppedIndex = e.target.parentNode.dataset.index
			Array.from(e.currentTarget.parentNode.children).map(tr => {
				tr.classList.remove('hover')
			})
			this.handleListChange(itemIndex, droppedIndex)
		}
	}
}
</script>


<style lang="scss">
table {
	tbody {
		tr[draggable="true"] {
			cursor: move;
			&.hover {
				margin-top: 49px;
				opacity: 0.6;
			}
		}
	}
}
</style>>


