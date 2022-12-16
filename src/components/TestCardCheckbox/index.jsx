import React from "react";

import { Container, LabelCard, Title } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../theme";

function TestCardCheckbox({ data, checked, funcCheck, ...rest }) {
  return (
    <Container {...rest} onPress={() => funcCheck(data.sintomasId)} >
      {checked ? <MaterialIcons name="check" size={38} color={colors.green} /> : <MaterialIcons name="close" size={38} color={colors.body_light} />}
      <LabelCard>{data.descricao}</LabelCard>
    </Container>
  );
}

export { TestCardCheckbox };
