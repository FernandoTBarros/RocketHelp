import { IconButton, useTheme, VStack } from 'native-base';
import { Barcode, Camera } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { BarCodeReader } from '../components/BarCodeReader';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

export function Register() {
	const { colors } = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const [showBarCode, setShowBarCode] = useState(false);
	const [patrimony, setPatrimony] = useState('');
	const [description, setDescription] = useState('');

	const navigation = useNavigation();

	function handleCamera() {
		setShowBarCode(true);
	}

	const handleBarCodeScanned = ({ data }) => {
		setShowBarCode(false);
		setPatrimony(data);
	};

	function handleNewOrderRegister() {
		if (!patrimony || !description) {
			return Alert.alert('Registrar', 'Preencha todos os campos.');
		}

		setIsLoading(true);

		firestore()
			.collection('orders')
			.add({
				patrimony,
				description,
				status: 'open',
				created_at: firestore.FieldValue.serverTimestamp()
			})
			.then(() => {
				Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
				navigation.goBack();
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				return Alert.alert('Solicitação', 'Erro desconhecido tentando registrar a solicitação.');
			})
	}

	return (
		<VStack flex={1} bg="gray.600">
			<Header title="Nova solicitação" />

			<VStack flex={1} p={6} bg="gray.600">
				<Input value={patrimony} onChangeText={setPatrimony} placeholder="Número do patrimônio" rightElement={
					<IconButton onPress={handleCamera} icon={<Barcode size={24} color={colors.primary[700]} />} mr={2} />
				} />

				<Input value={description} onChangeText={setDescription} placeholder="Descrição do problema" mt={5} flex={1} multiline textAlignVertical="top" />
				<Button title="Cadastrar" mt={5} isLoading={isLoading} onPress={handleNewOrderRegister} />
			</VStack>

			{showBarCode &&
				<BarCodeReader onBarCodeScanned={handleBarCodeScanned} />}
		</VStack>
	);
}