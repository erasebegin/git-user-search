import React, { useState } from 'react';
import styled from 'styled-components';
import { ImBook } from 'react-icons/im';

export default function UserRepos({ repos, error }) {

  const [open, setOpen] = useState(false);

  if (!repos || error) return <div></div>;

  return (
    <StyledContainer>
      <ul className="repo-list">
        {/* 
            ensure that repo data is available before mapping, then 
            ensure that open has been triggered with the button 
        */}
        {repos &&
          open &&
          repos.map((repo) => {
            return (
              <li>
                <a
                  href={repo.html_url}
                  key={repo.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            );
          })}
      </ul>
      <button onClick={() => setOpen(!open)}>
        {`${open ? 'Hide' : 'View'} Repositories`} <ImBook />
      </button>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 0px 10px #bbbbbb88;
  min-width: 500px;
  padding: 2rem;
  margin-top: -2rem;
  background: white;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 700px) {
    min-width: 100%;
  }

  .repo-list {
    text-align: center;
    padding-left: 0;

    li {
      list-style: none;
      margin-bottom: 0.75rem;

      a {
        color: #446dd6;
      }
    }
  }

  button {
    cursor: pointer;
    background: #2c974b;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;

    &:hover {
      opacity: 0.9;
    }

    svg {
      margin-bottom: -0.1rem;
      margin-left: 0.375rem;
    }
  }
`;
