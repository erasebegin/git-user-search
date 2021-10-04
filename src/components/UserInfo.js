import React from 'react';
import styled from 'styled-components';

export default function UserInfo({ data, error }) {

  // destructuring incoming data and providing a fallback
  const { avatar_url, login, name, followers, following, company, location } =
    data ?? {};

  if (!data.login || error) return <div></div>;

  return (
    <StyledContainer>
      <img src={avatar_url} />
      <h2>{login}</h2>
      <h3>{name}</h3>
      <div className="row">
        <p>
          Followers: <span>{followers}</span>
        </p>
        <p>
          Following: <span>{following}</span>
        </p>
      </div>
      <div className="row">
        <p>
          Company: <span>{company}</span>
        </p>
        <p>
          Location: <span>{location}</span>
        </p>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 0px 10px #bbbbbb44;
  min-width: 500px;
  padding: 2rem;
  padding-top: 4rem;
  margin-top: -2rem;
  background: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 700px) {
    min-width: 100%;
  }

  img {
    border-radius: 50%;
    max-height: 200px;
    border: 1px solid #ebebeb;
  }

  .row {
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 700px) {
      align-items: center;
      flex-direction: column;
    }
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;

    span {
      font-weight: bold;
    }
  }
`;
