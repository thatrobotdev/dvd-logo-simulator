import styled from "styled-components";

const P = styled.p`
  margin-top: 2rem;
`;

const Author = () => {
  return (
    <P>
      Project by{" "}
      <a
        href="https://www.stephenbradshaw.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stephen Bradshaw
      </a>
    </P>
  );
};

export default Author;
