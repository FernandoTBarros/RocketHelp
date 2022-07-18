import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
	const { colors } = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
			<Logo />

			<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
				Acesse sua conta
			</Heading>
			<Input
				mb={4}
				placeholder="E-mail"
				InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]}/>} />}
				onChangeText={setEmail}
				/>
			<Input
				mb={8}
				placeholder="Senha"
				InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]}/>} />}
				secureTextEntry
				onChangeText={setPassword}
			/>
			<Button title="Entrar" w="full"/>
		</VStack>
	)
}