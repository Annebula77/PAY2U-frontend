// transform.js
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  root.find(j.ImportDeclaration).forEach(path => {
    if (path.node.source.value.startsWith('../../')) {
      path.node.source.value = path.node.source.value.replace('../..', 'src');
    }
  });

  return root.toSource();
};
