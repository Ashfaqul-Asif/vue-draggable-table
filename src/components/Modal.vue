<template>
	<div>
		<transition name="fade">
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
		</transition>
	</div>
</template>

<script>
export default {
	toggleModal: false
}
</script>

<style>
</style>
