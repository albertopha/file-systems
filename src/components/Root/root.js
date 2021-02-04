import React, { useState, useEffect } from 'react';
import Folder from '../Folder/folder';

export default function Root(props) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    async function fetchRoot() {
      const url = "http://localhost:8080/api/fs/root";
      const rootDir = await fetch(url).then((res) => res.json());
      setRoot(rootDir);
    }
    fetchRoot();
  }, []);

  if (!root) {
    return (<div>Loading</div>)
  }

  return (
    <Folder
      name={root.name}
      type={root.type}
      level={0}
    />
  );
};
