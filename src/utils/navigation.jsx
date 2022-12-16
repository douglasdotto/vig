import { useNavigation } from "@react-navigation/native";

function navigationRoute() {
  const navigation = useNavigation();

  return navigation;
}

export { navigationRoute };
