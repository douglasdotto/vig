import React from "react";

import { Container, TextButton } from "./styles";

function ButtonPrimary({ title, ...rest }) {
  return (
    <Container {...rest}>
      <TextButton>{title}</TextButton>
    </Container>
  );
}

export { ButtonPrimary };
