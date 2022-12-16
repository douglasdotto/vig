import React from "react";

import { Container, LabelCard, Title } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../theme";

function TestCardPrimary({ data, ...rest }) {
  return (
    <>
      <Title>{data.subtitle}</Title>
      <Container {...rest}>
        <MaterialIcons name="align-horizontal-left" size={38} color={colors.green} />
        <LabelCard>{data.title}</LabelCard>
      </Container>
    </>
  );
}

export { TestCardPrimary };
