import React from "react";

import { Container, TextButton } from "./styles";

function Button({ title, ...rest }) {
  return (
    <Container {...rest}>
      <TextButton>{title}</TextButton>
    </Container>
  );
}

export { Button };
