import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useFetchUserData from './hooks/useFetchUserData';
import UserInfo from './components/UserInfo';
import UserRepos from './components/UserRepos';
import styled from 'styled-components';
import logo from './gh_logo.png';
import HashLoader from 'react-spinners/HashLoader';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const { userData, loading, error } = useFetchUserData(query);

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(inputValue);
    setInputValue('');
  }

  return (
    <StyledContainer className="App">
      <img src={logo} className="logo" alt="logo" />
      <div className="inner-container">
        <h1>Github User Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div className="loading-container">
          <HashLoader size={30} loading={loading} />
        </div>
        {error && (
          <p className="error-message">Aw jeez, there's nothing here</p>
        )}
      </div>
      <UserInfo error={error} data={userData} />
      <UserRepos error={error} repos={userData.repos} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  .logo {
    margin-bottom: -2rem;
    max-height: 200px;
  }

  .inner-container {
    padding: 2rem;
    border-radius: 2rem;
    box-shadow: 0px 0px 10px #bbbbbb44;
    background: white;
    z-index: 2;

    h1 {
      margin-top: 0;
      margin-bottom: 2rem;
      text-align: center;
    }

    form {
      display: flex;
      min-width: 500px;

      @media (max-width: 700px) {
        min-width: 100%;
      }

      input {
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        width: 100%;

        &::placeholder {
          color: #bbb;
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        &:focus {
          outline: none;
        }
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;

        svg {
          height: 25px;
          width: 25px;
        }
      }
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
    }

    .error-message {
      text-align: center;
      font-weight: bold;
      color: #DB5855;
    }
  }
`;

export default App;
