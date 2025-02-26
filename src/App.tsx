import { Assets as NavigationAssets } from '@react-navigation/elements';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import * as React from 'react';
import { HomeScreen } from './navigation/screens/Home';
import  AltaScreen  from './navigation/screens/Alta';
import { PublicacionScreen } from './navigation/screens/Publicacion';
import { createStaticNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Alta: AltaScreen,
    Publicaciones: PublicacionScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <Navigation />
    </GluestackUIProvider>
  );
}
