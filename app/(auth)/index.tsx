import { Redirect } from 'expo-router';

export default function AuthIndex() {
  // Redirect to the sign-in screen by default
  return <Redirect href="/(auth)/sign-in" />;
}
