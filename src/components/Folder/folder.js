import React, { useState } from 'react';
import styles from './folder.module.scss';
import File from '../File/file';
import * as constants from '../../utils/constants';

export default function Folder({ name, type, level }) {
  const [isOpen, toggleOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const onClick = async (evt) => {
    if (isOpen) {
      setFolders([]);
      setFiles([]);
      toggleOpen(!isOpen);
      return;
    }
    const folderUrl = `${constants.API}/fs/folders?name=${name}`;
    const folders = await fetch(folderUrl).then((res) => res.json());

    const fileUrl = `${constants.API}/fs/files?name=${name}`;
    const files = await fetch(fileUrl).then((res) => res.json());

    setFolders(folders.folders);
    setFiles(files.files);
    toggleOpen(!isOpen);
  };

  const getChildFolders = () => {
    if (!Array.isArray(folders) || folders.length === 0) {
      return [];
    }

    return folders.map((folder) => (
      <Folder
        name={folder.name}
        type={folder.type}
        level={level + 1}
      />
    ));
  };
  
  const getChildFiles = () => {
    console.log('files === ', files);
    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }

    return files.map((file) => (
      <File
        name={file.name}
        type={file.type}
      />
    ));
  };

  const getChildren = () => {
    console.log('folders == ', typeof folders);
    if (folders.length === 0 && files.length === 0) {
      return [];
    }
    
    const childFolders = getChildFolders();
    const childFiles = getChildFiles();
    console.log("**** ", childFiles);
    return [...childFolders, ...childFiles];
  };

  return (
    <div style={{
      marginLeft: `${level* 10}px`
    }}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.button}
          onClick={onClick}
        >
          {isOpen ? "[-]" : "[+]"}
        </button>
        <span>{name}</span>
      </div>
      {getChildren()}
    </div>
  );
};
