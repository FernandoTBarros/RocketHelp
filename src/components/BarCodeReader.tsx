import { BarCodeScanner, BarCodeScannerProps } from 'expo-barcode-scanner';
import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export function BarCodeReader({ onBarCodeScanned }: BarCodeScannerProps) {
	const [hasPermission, setHasPermission] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<BarCodeScanner
			onBarCodeScanned={onBarCodeScanned}
			style={StyleSheet.absoluteFillObject}
		/>
	);
}