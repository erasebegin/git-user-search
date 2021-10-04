import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(userName) {
  const [data, setData] = useState({});
  const [repoData, setRepoData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // first call this function to get profile data
  async function getUserData() {
    await axios
      .get(`https://api.github.com/users/${userName}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err)
        setError(err);
        setLoading(false);
      });
  }

  // when useEffect detects change in data, this function then fires and combines the response from 
  // this FETCH with the first one
  async function getUserRepos() {
    await axios
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((res) => {
        setRepoData({ ...data, repos: res.data });
      })
      .catch((err) => {
        console.error(err)
        setError(err);
        setLoading(false);
      });
  }


  // this will trigger once on mount and then every time a new userName is passed to the component
  useEffect(() => {
    if (!userName) return;
    setLoading(true);
    setData({})
    setError('')
    getUserData();
  }, [userName]);

  // this exists as a way to wait for the first lot of data to arrive before firing the second 
  // function: getUserRepos()
  useEffect(() => {
    if (!userName) return;
    getUserRepos();
  }, [data]);

  // finally once the repo data arrives and is updated in state, loading is set to false
  useEffect(() => {
    setLoading(false);
  }, [repoData]);

  return { userData: repoData, loading, error };
}
