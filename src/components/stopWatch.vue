<template>
	<div
		class="timer py-2 rounded text-center flex flex-col justify-center bg-red-500 relative overflow-hidden text-white"
	>
		<div>
			<p class="text-xl cursor-pointer group">
				<span class="text-base md:text-2xl font-semibold">{{ formattedElapsedTime }}</span>
			</p>
		</div>
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
		},
		isSorted: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			elapsedTime: 0,
			timer: undefined
		}
	},
	watch: {
		"isStartTimer": {
			immediate: true,
			handler(v) {
				v == true ? this.start() : ''
			}
		},
		"isSorted": {
			immediate: false,
			handler(v) {
				v == true && this.$emit('sortedTime', this.elapsedTime)
				v == true ? this.stop() : ''
			}
		}
	},
	computed: {
		formattedElapsedTime() {
			const date = new Date(null);
			date.setSeconds(this.elapsedTime / 1000);
			const utc = date.toUTCString();
			return utc.substr(utc.indexOf(":") - 2, 8);
		}
	},
	methods: {
		start() {
			this.timer = setInterval(() => {
				this.elapsedTime += 1000;
			}, 1000);
		},
		stop() {
			clearInterval(this.timer);
			this.reset();
		},
		reset() {
			this.elapsedTime = 0;
		}

	},

}
</script>

<style>
</style>