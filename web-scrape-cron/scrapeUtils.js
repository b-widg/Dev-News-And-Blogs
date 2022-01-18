// delay exicution by number of milliseconds used so
// we don't overload sites with requests while scraping
module.exports.wait = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// timeStamp can be UNIX or Javascript.  UNIX will have a length of 10 and javascript
// will have a length of 13.  Convert UNIX to Javascript by multiplying by 1000
module.exports.getLocalTime = (timeStamp) => {
  const stampLength = timeStamp.toString().length;
  if (stampLength === 10) timeStamp *= 1000;
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleString('en-US');
  return formattedDate;
};
