module.exports.info = logPayload => {
  console.log(makeLogEntry(logPayload, 'INFO'));
};

module.exports.error = logPayload => {
  console.error(makeLogEntry(logPayload, 'ERROR'));
};

module.exports.success = logPayload => {
  console.log(makeLogEntry(logPayload, 'SUCCESS'));
};

module.exports.basic = payload => {
  console.log(
    '\n<=======Basic Log Begin=========>\n',
    `${payload.method} ::`,
    payload.data,
    '\n<=======Basic Log End=========>\n'
  );
};

function makeLogEntry({method, path}, type) {
  return `\n[${type}] :: REQUEST-API | Method: ${method} | Route : ${path} :: [${new Date().toISOString()}]\n`;
}
