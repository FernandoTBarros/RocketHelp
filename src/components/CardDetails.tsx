import { HStack, Text, useTheme, VStack } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import { ReactNode } from 'react';

type Props = {
	title: string;
	icon: React.ElementType<IconProps>;
	description?: string;
	children?: ReactNode;
	footer?: string;
}

export function CardDetails({
	title,
	description,
	icon: Icon,
	footer,
	children
}: Props) {

	const { colors } = useTheme();

	return (
		<VStack bg="gray.600" p={6} mt={5} rounded="sm">
			<HStack space={2} mb={2}  >
				<Icon size={20} color={colors.primary[700]} />
				<Text textTransform="uppercase" color="gray.300" fontSize="sm">
					{title}
				</Text>
			</HStack>
			{description &&
				<Text color="gray.100" fontSize="md">
					{description}
				</Text>
			}
			{children && children}
			{footer &&
				<Text mt={3} pt={3} borderTopWidth={1} borderTopColor="gray.500" color="gray.300" fontSize="sm">
					{footer}
				</Text>
			}
		</VStack>
	);
}