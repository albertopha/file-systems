const router = require('express').Router();
const sampleFS = require('./sampleFileStructure.json');
// const path = require('path');
// const getRootDir = () => path.parse(process.cwd()).root;

/**
 * GET the root
 */
router.get('/root', (req, res, next) => {
  const root = sampleFS;
  res.status(200).json({
    type: root.type,
    name: root.name
  });
});

/**
 * GET files of given target
 */
router.get('/files', (req, res, next) => {
  const targetName = req.query.name;
  if (!targetName) {
    res.status(400).send('Malformed folder name.');
    return;
  }

  const root = sampleFS;
  const targetNode = bfs(root, targetName);
  let files = [];

  if (targetNode && Array.isArray(targetNode.files)) {
    files = targetNode.files;
  }

  res.status(200).json({
    files
  });
});

/**
 * GET folders of given target
 */
router.get('/folders', (req, res, next) => {
  const targetName = req.query.name;
  if (!targetName) {
    res.status(400).send('Malformed folder name.');
    return;
  }

  const root = sampleFS;
  const targetNode = bfs(root, targetName);
  let folders = [];

  if (targetNode && Array.isArray(targetNode.folders)) {
    folders = targetNode.folders;
  }

  res.status(200).json({
    folders
  });
});

function bfs(root, targetName) {
  if (!root) {
    return null;
  }

  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    const { type, name } = current;

    if (name === targetName) {
      return current;
    }

    if (type === "folder") {
      queue.push(...current.folders);
    }
  }
}

module.exports = router;
