import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Esto hará que todas las pantallas sean a pantalla completa */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="seleccion-modo" options={{ headerShown: false }} />
    </Stack>
  );
}