import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DTO/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { Alert } from 'react-native';
import { CardDetails } from '../components/CardDetails';

type RouteParams = {
	orderId: string;
}

type OrderDetails = OrderProps & {
	description: string;
	solution?: string;
	closed?: string;
}

export function Details() {
	const route = useRoute();
	const { colors } = useTheme();
	const [isLoading, setIsLoading] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const [solution, setSolution] = useState('');
	const { orderId } = route.params as RouteParams;
	const [order, setOrder] = useState<OrderDetails>();

	const navigation = useNavigation();
	function handleFinish() {
		if (!solution) {
			return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação');
		}

		setIsClosing(true);

		firestore()
			.collection<OrderFirestoreDTO>('orders')
			.doc(orderId)
			.update({
				status: 'closed',
				solution,
				closed_at: firestore.FieldValue.serverTimestamp()
			})
			.then(() => {
				Alert.alert('Solicitação', 'Solicitação finalizada!');
				navigation.goBack();
			})
			.catch((error) => {
				console.log(error);
				Alert.alert('Solicitação', 'Erro desconhecido tentando encerrar a solicitação!')
				setIsClosing(false);
			})
	}

	useEffect(() => {
		setIsLoading(true);

		firestore()
			.collection<OrderFirestoreDTO>('orders')
			.doc(orderId)
			.get()
			.then((doc) => {
				const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

				const closed = closed_at ? dateFormat(closed_at) : null;

				setOrder({
					id: doc.id,
					patrimony,
					description,
					status,
					solution,
					when: dateFormat(created_at),
					closed
				});

				setIsLoading(false);
			})

	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<VStack flex={1} bg="gray.700">
			<Header title="Solicitação" />
			<HStack space={3} w="full" bg="gray.500" alignItems="center" justifyContent="center" py={5}>
				{order.status === 'closed' ?
					<>
						<CircleWavyCheck size={22} color={colors.green[300]} />
						<Text color="green.300" fontSize="sm" textTransform="uppercase">
							Finalizado
						</Text>
					</>
					:
					<>
						<Hourglass size={22} color={colors.secondary[700]} />
						<Text color="secondary.700" fontSize="sm" textTransform="uppercase">
							em andamento
						</Text>
					</>
				}
			</HStack>

			<ScrollView flex={1} mx={5} showsVerticalScrollIndicator={false}>

				<CardDetails
					title="Equipamento"
					icon={DesktopTower}
					description={`Patrimônio ${order.patrimony}`}
				/>
				<CardDetails
					title="Descrição do Problema"
					icon={ClipboardText}
					description={order.description}
					footer={`Registrado em ${order.when}`}
				/>
				<CardDetails
					title="Solução"
					icon={CircleWavyCheck}
					description={order.status === 'closed' && order.solution}
					footer={order.status === 'closed' && `Encerrado em ${order.closed}`}
				>
					{order.status === 'open' && <Input mx={-3} textAlignVertical="top" h={32} placeholder="Descrição da solução" multiline onChangeText={setSolution} />}
				</CardDetails>
				{order.status === 'open' &&
					<Button onPress={handleFinish} title="Finalizar" isLoading={isClosing} />}
			</ScrollView>

		</VStack >
	);
}