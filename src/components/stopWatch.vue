<template>
	<div
		class="timer py-2 rounded text-center flex flex-col justify-center bg-red-500 relative overflow-hidden text-white"
	>
		<div>
			<p class="text-xl cursor-pointer group" :class="{ 'timer-blinking': isBlinking }">
				<span class="text-2xl font-semibold">{{ display }}</span>
				<span class="text-xl font-medium">.{{ displayms }}</span>
			</p>
		</div>
		<!-- <div class="controls">
			<button
				class="bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-200 rounded p-2 text-sm font-semibold"
				type="button"
				@click="start"
				v-if="!isStarted"
			>Start</button>
			<button
				class="bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-2 focus:ring-yellow-200 rounded p-2 text-sm font-semibold"
				type="button"
				@click="pause"
				v-else
			>Pause</button>
		</div>-->
	</div>
</template>

<style>
svg {
	display: inline;
}
</style>

<script>
// import { Icon } from '@iconify/vue2'
const timeUnitSeconds = [
	1,
	60,
	60 * 60,
	24 * 60 * 60,
]
const convertTimeFromString = (string = '') => {
	const timeUnits = string.split(':').reverse()
	let seconds = 0
	let isNotNaN = false
	timeUnits.forEach((unit, index) => {
		if (timeUnitSeconds[index] && !isNaN(unit)) {
			seconds += unit * timeUnitSeconds[index]
			isNotNaN = true
		}
	})
	if (isNotNaN) return seconds
	else return NaN
}
export default {
	props: {
		isStartTimer: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			title: 'Timer',
			display: '00:00:00',
			displayms: '000',
			d: 0,
			h: 0,
			m: 0,
			s: 0,
			percentage: 0,
			defaultSeconds: 0,
			isStarted: false,
			isStopped: true,
			countingUp: true,
			targetTimestamp: 0,
			pausedDifference: 0,
			isBlinking: false,
			interval: () => { },
		}
	},
	watch: {
		"isStartTimer": {
			immediate: true,
			handler(v) {
				v ? this.start() : this.pause()
			}
		}
	},
	methods: {
		start() {
			let nowTimestamp = Date.now()
			let targetTime = this.defaultSeconds
			if (this.pausedDifference) {
				targetTime = this.pausedDifference
				this.pausedDifference = 0
			}
			if (this.countingUp) this.targetTimestamp = nowTimestamp - targetTime
			else this.targetTimestamp = nowTimestamp + targetTime
			this.interval = setInterval(() => {
				if (!this.countingUp && this.targetTimestamp - Date.now() < 1) {
					this.stop()
					this.isBlinking = true
					console.log(this.isBlinking)
				}
			}, 10)
			this.isStarted = true
			this.isStopped = false
			this.isBlinking = false
		},
		pause() {
			let nowTimestamp = Date.now()
			this.pausedDifference = Math.abs(this.targetTimestamp - nowTimestamp)
			clearInterval(this.interval)
			this.isStarted = false
		},



		async rename() {
			// To change the title
			let { value: title } = await this.$swal.fire({
				title: 'Enter the new title',
				input: 'text',
				inputValue: this.title,
				showCancelButton: true
			})
			if (title !== undefined) this.title = title
		},


	},

}
</script>

<style>
</style>