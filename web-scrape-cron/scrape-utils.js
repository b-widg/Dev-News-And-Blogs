// delay exicution by numer of milliseconds
// used to not overload sites with requests while scraping
module.exports.wait = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// timeStamp can be UNIX or Javascript Int. UNIX will have a length of 10
// and javascript will have a lengthe of 13
module.exports.getLocalTime = (timeStamp) => {
  const stampLength = timeStamp.toString().length;
  if (stampLength === 10) timeStamp *= 1000;
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleString('en-US');
  return formattedDate;
};
