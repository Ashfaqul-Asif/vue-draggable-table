
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

			<draggable @end="onDragEnd" v-model="isSortedArray" tag="tbody">
				<tr
					v-for="(row, index) in isSortedArray"
					:key="index"
					:data-index="index"
					class="text-sm text-black"
				>
					<td class="border border-DD py-4 flex space-x-2">
						<img
							v-if="!row.isSorted"
							class="w-4 text-primary ml-2"
							src="@/assets/check-mark-close.svg"
							alt
							srcset
						/>
						<img v-else class="w-4 text-primary ml-2" src="@/assets/check-mark.svg" alt srcset />

						<div class="pl-2">{{row.first_name}}</div>
					</td>
					<td class="border border-DD">{{row.last_name}}</td>
					<td class="border border-DD">{{row.email}}</td>
					<td class="border border-DD">{{row.number_of_potatoes}}</td>
					<td class="border border-DD">{{row.Location}}</td>
				</tr>
			</draggable>
		</table>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
	name: 'BaseDataTable',
	// props: {
	//   msg: String
	// }
	props: ['handleListChange', 'list', 'tableHeaders'],
	components: {
		draggable,
	},

	data() {
		return {
			dragging: null,
			enabled: true,
			dragging: false
		}
	},
	watch: {
		// "isSorted": {
		// 	immediate: false,
		// 	handler(v) {
		// 		v && this.stop()
		// 		this.$emit('isSorted', this.isSorted)
		// 	}
		// }
		isSortedArray: {
			immediate: false,
			handler(v) {
				v.every((x) => {
					return x.isSorted == true;
				})
			}
		}
	},
	computed: {
		isSortedArray: {
			get() {
				return this.list.length && this.list.map((item, index, newArr) => {
					const previousIndex = newArr[index - 1]
					if (index == 0) {
						item.isSorted = true
						return item
					}
					item.isSorted = previousIndex.isSorted && item.number_of_potatoes >= previousIndex.number_of_potatoes
					return item
				})
			},
			set(v) {
				this.$emit('update:list', v);
			}

		},
	},
	methods: {
		onDragEnd() {
			let isSorted = this.isSortedArray.every((el)=>el.isSorted == true);
			this.$emit('isSorted', isSorted);
			
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


