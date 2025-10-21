import styled from 'styled-components';
const StyleDiv = styled.div`
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  border: 1px dashed #ddd;
  border-radius: 10px;
  color: #555;
  max-width: 600px;
  margin: 40px auto;
  line-height: 1.6;

  h2 {
    color: #b48a78;
    margin-bottom: 5px;
  }

  h3 {
    color: #888;
    font-weight: 400;
    font-size: 1em;
    margin-top: 0;
    margin-bottom: 25px;
  }

  p {
    margin-bottom: 15px; /* Ensures space between the new short paragraphs */
    padding: 0 10px; /* Gives a little horizontal padding inside the block */
  }
`;

function About() {
  return (
    <StyleDiv>
      <h2>My GoodBuy </h2>
      <h3>created by Yongting Shi</h3>
      <p>It is a tool designed to help manage and remember good products that purchased from stores.</p>
      <p>Users can add, edit and delete their products, and all data is securely stored and instantly synchronized using Google Firebase/Firestore.</p>
    </StyleDiv>
  );
}

export default About;
