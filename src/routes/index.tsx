import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export function Routes() {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User>();

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(response => {
			setUser(response);
			setIsLoading(false);
		})

		return subscriber;
	}, [])

	if (isLoading) {
		return (<Loading />)
	}

	return (
		<NavigationContainer>
			{user ? <AppRoutes /> : <SignIn />}
		</NavigationContainer>
	)
}