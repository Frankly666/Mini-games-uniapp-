export function netWorkError() {
	uni.showToast({
		title: '网络错误',
		duration: 3000,
		icon: "error"
	});
	setTimeout(() => {
		uni.hideToast()
	}, 600)
}

export function showTips(string) {
	uni.showToast({
		title: string,
		duration: 3000,
		icon: "error"
	});
	setTimeout(() => {
		uni.hideToast()
	}, 600)
}

export function showSuccus(string) {
	uni.showToast({
		title: string,
		duration: 3000,
		icon: "success"
	});
	setTimeout(() => {
		uni.hideToast()
	}, 600)
}