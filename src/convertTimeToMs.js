function convertTimeToMs(timecode) {
  const splitTimes = timecode.split(/[:;,]/g).reverse();
  const ms = parseInt(splitTimes[0], 10);
  const s = parseInt(splitTimes[1], 10) * 1000;
  const m = parseInt(splitTimes[2], 10) * 60 * 1000;
  const h = parseInt(splitTimes[3], 10) * 60 * 60 * 1000;
  const timeInMs = ms + s + m + h;
  return timeInMs;
}

export default convertTimeToMs;
