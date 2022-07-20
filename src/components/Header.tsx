import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

type Props = StyledProps & {
	title: string;
}

export function Header({ title, ...rest }: Props) {
	const navigation = useNavigation();

	const { colors } = useTheme();

	function handleGoBack() {
		navigation.goBack();
	}
	return (
		<HStack
			w="full"
			justifyContent="space-between"
			alignItems="center"
			bg="gray.600"
			pb={6}
			pt={12}
			{...rest}
		>
			<IconButton zIndex={1} onPress={handleGoBack} icon={<CaretLeft size={24} color={colors.gray[200]} />} />

			<Heading color="gray.100" textAlign="center" flex={1} fontSize="lg" ml={-6}>
				{title}
			</Heading>


		</HStack>
	);
}