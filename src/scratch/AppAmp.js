import React, { useState, useEffect } from 'react';
import Amplify, { Auth, Analytics, Storage } from 'aws-amplify';
import {
  withAuthenticator, S3Album, S3Image, PhotoPicker,
} from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const Photos = ({ list, theme }) => (
  <div className="album" style={theme.album}>
    {list.map(({ key }) => <S3Image theme={theme} style={theme.photoStyle} key={key} imgKey={key} />)}
  </div>
);

function App(props) {
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);

  const getFiles = () => {
    Storage.list('')
      .then((result) => {
        console.log('@result', result);
        setList(result);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    Analytics.record('Amplify_CLI');
    getFiles();
  }, []);

  const logout = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const uploadFile = ({ name, file }) => {
    Storage
      .put(name, file)
      .then(() => {
        setFile(name);
      });
  };

  const theme = {
    album: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '600px',
    },
    photoStyle: {
      width: '200px',
      height: '200px',
    },
    photoImg: {
      width: '100%',
      height: 'auto',
    },
    pickerPreview: {
      width: '400px',
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <p> Pick a file</p>
          <PhotoPicker preview onPick={uploadFile} theme={theme} />
          <Photos key={file} list={list} theme={theme} />
        </div>
        <button type="button" onClick={() => logout()}>
          Sign Out
        </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
