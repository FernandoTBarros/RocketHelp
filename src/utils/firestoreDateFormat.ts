import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
	if (timestamp) {
		const date = new Date(timestamp.toDate());

		const nformat = (num: number) => num.toString().padStart(2, '0');
		return `${nformat(date.getDate())}/${nformat(date.getMonth() + 1)}/${date.getFullYear()} às ${nformat(date.getHours())}:${nformat(date.getMinutes())}:${nformat(date.getSeconds())}`
	}
}