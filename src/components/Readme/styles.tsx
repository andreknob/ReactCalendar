import styled from "styled-components";

export const Container = styled.section({
  width: "800px",
  margin: "2rem calc((100vw - 800px) / 2)",

  "* + *": {
    marginTop: "1rem",
  },
});
