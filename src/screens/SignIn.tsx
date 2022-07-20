import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import auth from '@react-native-firebase/auth';

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function SignIn() {
	const { colors } = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	function handleSignIn() {
		if (!email || !password) {
			return Alert.alert("Entrar", "Usuário e senha obrigatórios")
		}

		setIsLoading(true);

		auth()
			.signInWithEmailAndPassword(email, password)
			.catch((error) => {
				setIsLoading(false);

				if (error.code === 'auth/invalid-email') {
					return Alert.alert('Entrar', 'E-mail inválido.');
				}
				if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
					return Alert.alert('Entrar', 'E-mail ou senha inválida.');
				}
				console.log(error);
				return Alert.alert('Entrar', 'Erro desconhecido tentando acessar')
			});

	}

	return (
		<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
			<Logo />

			<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
				Acesse sua conta
			</Heading>
			<Input
				mb={4}
				placeholder="E-mail"
				InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} />} />}
				onChangeText={setEmail}
			/>
			<Input
				mb={8}
				placeholder="Senha"
				InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
				secureTextEntry
				onChangeText={setPassword}
			/>
			<Button title="Entrar" w="full" onPress={handleSignIn} isLoading={isLoading} isDisabled={!email || !password} />
		</VStack>
	)
}