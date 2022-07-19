import { useRoute } from '@react-navigation/native';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native';
import { useState } from 'react';
import { Line } from 'react-native-svg';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { OrderProps } from '../components/Order';

type RouteParams = {
	orderId: string;
}

export function Details() {
	const route = useRoute();
	const { colors } = useTheme();
	const { orderId } = route.params as RouteParams;
	const [order, setOrder] = useState<OrderProps & { problem: string }>({
		id: '123',
		patrimony: '1389813',
		when: '18/07/2022 às 13:00',
		status: 'open',
		problem: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
	});

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

			<VStack flex={1} py={5} px={6} space={5}>
				<VStack bg="gray.600">
					<VStack p={6}>
						<HStack space={2} >
							<DesktopTower size={20} color={colors.primary[700]} />
							<Text textTransform="uppercase" color="gray.300" fontSize="sm">
								Equipamento
							</Text>
						</HStack>
						<Text mt={2} color="gray.100" fontSize="md">
							Patrimônio {order.patrimony}
						</Text>
					</VStack>
				</VStack>
				<VStack bg="gray.600">
					<VStack p={6}>
						<HStack space={2} >
							<ClipboardText size={20} color={colors.primary[700]} />
							<Text textTransform="uppercase" color="gray.300" fontSize="sm">
								Descrição do Problema
							</Text>
						</HStack>
						<Text mt={2} color="gray.100" fontSize="md">
							{order.problem}
						</Text>
						<Text mt={3} pt={3} borderTopWidth={1} borderTopColor="gray.500" color="gray.300">
							Registrado em {order.when}
						</Text>
					</VStack>
				</VStack>
				<VStack flex={order.status === 'open' ? 1 : 0} bg="gray.600">
					<VStack flex={order.status === 'open' ? 1 : 0} p={6}>
						<HStack space={2} >
							<CircleWavyCheck size={20} color={colors.primary[700]} />
							<Text textTransform="uppercase" color="gray.300" fontSize="sm">
								Solução
							</Text>
						</HStack>
						{order.status === 'open'
							?
							<Input mt={6} mx={-3} flex={1} bg="gray.600" textAlignVertical="top" placeholder="Descrição da solução" multiline />
							:
							<>
								<Text mt={2} color="gray.100" fontSize="md">
									{order.problem}
								</Text>
								<Text mt={3} pt={3} borderTopWidth={1} borderTopColor="gray.500" color="gray.300">
									Registrado em {order.when}
								</Text>
							</>
						}
					</VStack>
				</VStack>
				{order.status === 'open' &&
					<Button title="Finalizar" />}
			</VStack>

		</VStack>
	);
}