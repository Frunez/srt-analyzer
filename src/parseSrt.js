import convertTimeToMs from "./convertTimeToMs";

function parseSrt(srt) {
  const srtCaptions = srt
    .split("\n\n")
    .map(caption => {
      const parseCaption = caption.split("\n");
      const subtitleNumber = parseCaption.shift();
      const subtitleTimcodes = parseCaption.shift();
      if (!subtitleTimcodes) return null;

      const startMs = convertTimeToMs(subtitleTimcodes.split(" ")[0]);
      const endMs = convertTimeToMs(subtitleTimcodes.split(" ")[2]);

      const subtitleText = parseCaption.join();

      return {
        number: subtitleNumber,
        start: startMs,
        end: endMs,
        timecode: subtitleTimcodes,
        text: subtitleText
      };
    })
    .filter(x => x);

  return srtCaptions;
}

export default parseSrt;
