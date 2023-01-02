// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');


// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize
  const text = `As the incidents led to protests across the district, including in Rajouri town, and a complete shutdown, Director General of Police Dilbag Singh, who visited the site, said that the IED blast was intended to target senior officers who were about to reach there.

  Terrorists strike twice at same site in J-K within 14 hours; minor siblings among 6 killed in attacks; protests in many areas
  Representative Image.
  
`;

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    // voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    voice: {languageCode: 'en-IN', name: 'en-IN-Wavenet-B', ssmlGender: 'FEMALE'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('outputt.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: outputt.mp3');
}
quickStart();