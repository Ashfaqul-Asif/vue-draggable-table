<template>
	<div class="w-full flex flex-col h-screen content-center relative">
		<!-- modal -->
		<transition name="fade">
			<!-- add people modal -->
			<div v-if="isModalVisible">
				<div class="absolute bg-black opacity-70 inset-0 z-0"></div>
				<div
					class="max-w-xs md:max-w-md lg:max-w-lg p-3 mx-auto my-auto rounded-xl absolute shadow-lg bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<div class="form">
						<div class="py-4">
							<h1 class="text-xl md:text-3xl font-bold text-center">{{ modalTitle }}</h1>
						</div>
						<div class="w-full px-3">
							<label
								class="text-gray-700 text-xs"
								for="grid-first-name"
							>Enter a number of how many people you want to add to the list.</label>
							<input
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-primary py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white rounded-md mt-3"
								id="grid-first-name"
								v-model="amountOfPeople"
								type="number"
								placeholder="Enter the number of people"
							/>
							<p v-if="!amountOfPeople" class="text-red-500 text-xs italic">Please fill out this field.</p>
							<p
								v-else
								class="text-red-500 text-xs italic"
							>{{isValidAmount ? '' : 'Please select amount between 20 to 80' }}</p>
						</div>
					</div>
					<div class="p-3 mt-2 text-center space-x-4 md:block">
						<button
							@click="isModalVisible=false"
							class="mb-2 md:mb-0 bg-red-600 border px-5 py-2 text-sm shadow-sm font-medium text-white rounded-md hover:shadow-lg hover:bg-opacity-80"
						>Close</button>
						<button
							:class="isValidAmount || loading ? 'bg-primary hover:shadow-lg hover:bg-opacity-80' : 'text-white bg-primary  focus:outline-none cursor-not-allowed opacity-40'"
							class="mb-2 md:mb-0 border px-5 py-2 text-sm shadow-sm font-medium rounded-md text-white"
							@click="onGenerateRandomData"
						>Save</button>
					</div>
				</div>
			</div>
			<!-- showCongrats modal -->

			<div v-if="isSorted">
				<div class="absolute bg-black opacity-70 inset-0 z-0"></div>
				<div
					class="max-w-xs md:max-w-md lg:max-w-lg p-3 mx-auto my-auto rounded-xl absolute shadow-lg bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<div>
						<div class="px-4">
							<img class="w-full" src="@/assets/congrats.svg" alt srcset />
						</div>
						<div class="py-4">
							<h1
								class="text-lg md:text-xl font-medium text-center"
							>Your time: {{$m.utc(sortingTime).format('HH:mm:ss') }}</h1>
						</div>
						<button
							class="mb-2 md:mb-0 border px-5 py-2 text-sm shadow-sm font-medium rounded-md text-white bg-primary hover:shadow-lg hover:bg-opacity-80"
							@click="onCloseDialog"
						>Start Again</button>
					</div>
				</div>
			</div>
		</transition>
		<div class="container">
			<div class="xl:my-12">
				<!-- sorting training system section -->
				<section class="flex items-center justify-between">
					<div>
						<h1 class="text-lg md:text-2xl font-bold">Sorting Training System</h1>
						<stopWatch
							:class="isStartTimer? 'mt-4 w-28 md:w-60   translate-x-7 animate-bounce ' : 'hidden'"
							:isStartTimer="isStartTimer"
							:isSorted="isSorted"
							@sortedTime="onSortedTime"
						/>
					</div>

					<button
						class="bg-primary px-2 py-2 md:px-9 md:py-4 text-white rounded-md lg:rounded-lg font-bold"
						@click="isModalVisible = !isModalVisible"
					>Start sorting!</button>
				</section>
				<div v-if="!sortingData.length" class="grid place-content-center">
					<h4 class="font-bold text-primary text-2xl mb-4">Add people and sorting</h4>
					<img src="@/assets/emptyTable.svg" alt srcset />
				</div>
				<div v-else class="mt-8">
					<BaseDataTable
						:tableHeaders="headersData"
						:list.sync="sortingData"
						:handleListChange="handleListChange"
						@isSorted="onIsSorted"
					></BaseDataTable>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import BaseDataTable from '@/components/BaseDataTable.vue'
import stopWatch from "@/components/stopWatch.vue"
import axios from 'axios'
export default {
	name: 'HomeView',
	components: {
		BaseDataTable, stopWatch
	},

	data() {
		return {
			isModalVisible: false,
			modalTitle: 'How many people?',
			sortingData: [],
			isStartTimer: false,
			amountOfPeople: null,
			loading: false,
			headersData: [
				'FirstName',
				'LastName',
				'Email',
				'Number of Potatoes',
				'Location',
			],
			showCongrats: false,
			sortingTime: null,
			isSorted: false
		}
	},
	computed: {
		isValidAmount() {
			return +this.amountOfPeople >= 20 && +this.amountOfPeople <= 80
		},

	},
	methods: {
		handleListChange(index, newIndex) {
			console.log(index, newIndex);
			let oldIndex = parseInt(index),
				newPositionIndex = parseInt(newIndex),
				movedItem = this.sortingData[oldIndex]
			this.sortingData.splice(oldIndex, 1)
			this.sortingData.splice(newPositionIndex, 0, movedItem)
		},

		async fetchRandomData() {
			try {
				const res = await axios.get(`https://api.mockaroo.com/api/b18c8d90?count=${this.amountOfPeople}&key=dec2a780`)

				return [res, null]

			}
			catch (error) {
				return [null, error]
			}

		},
		async onGenerateRandomData() {
			let [res, err] = await this.fetchRandomData()
			console.log(res);
			this.sortingData = res.data
			console.log(res, err);
			res && this.$toast.success("People Added  successfully")
			err && this.$toast.error("Something went wrong")
			this.isModalVisible = false
			this.isStartTimer = true
			this.loading = false
			this.amountOfPeople = null

		},
		startSorting() {
			console.log('startSorting');
		},
		onSortedTime(data) {
			console.log(data, 'onSortedTimeonSortedTimeonSortedTime');
			this.sortingTime = data
			this.$toast.success("Sorting Completed")
		},
		onIsSorted(value) {
			console.log('onIsSortedonIsSorted', value);
			this.isSorted = value
			this.isSorted ? this.isStartTimer = false : ''

		},
		onCloseDialog() {
			this.isStartTimer = false
			this.isSorted = false
			this.sortingTime = null
			this.sortingData = []
		},
	},

}
</script>
