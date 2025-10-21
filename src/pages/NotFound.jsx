import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleDiv = styled.div`
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  border: 1px dashed #ddd;
  border-radius: 10px;
   max-width: 600px;
  margin: 40px auto;

  h2 {
   color: #777;
  }

  button {
    font-size: 1.2rem;

    &:hover {
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      background-color: #9e7565;
    }
  }
`;

function NotFound() {
  return (
    <StyleDiv>
      <h2>Page Not Found</h2>
      <Link to="/">
        <button>Go back to Home</button>
      </Link>
    </StyleDiv>
  );
}

export default NotFound;
