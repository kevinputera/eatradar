const fs = require("fs");
const readline = require("readline");

const inputStream = fs.createReadStream("eating-establishments-geojson.geojson", { encoding: "utf-8" });
const outputStream = fs.createWriteStream("output.txt");

const reader = readline.createInterface({
  input: inputStream,
  output: outputStream,
  terminal: false
});

// start of output json list
outputStream.write("[");

let started = false; // to keep track of comma addition in forming json list

reader.on("line", line => {
  // add comma to the end of the json to form a list
  if (!started) {
    started = true;
  }
  else {
    outputStream.write(",\n");
  }

  let data = line;
  if (line.charAt(line.length - 1) === ',') {
    data = line.slice(0, -1);
  }
  const json = JSON.parse(data);

  const id = json.properties.Name;
  const desc = json.properties.Description;

  const rgx = new RegExp(
    /^.+?LIC_NAME.+?<td>(.+?)</i.source +     // get license name
    /.+?BLK_HOUSE.+?<td>(.+?)</i.source +     // get block number
    /.+?STR_NAME.+?<td>(.+?)</i.source +      // get street name
    /.+?UNIT_NO.+?<td>(.+?)</i.source +       // get unit number
    /.+?POSTCODE.+?<td>(.+?)</i.source +      // get postcode 
    /.+?BUSINESS_NAME.+?<td>(.+?)</i.source + // get store name
    /.+?LEVEL_NO.+?<td>(.+?)</i.source        // get level
  );
  const matched = desc.match(rgx);

  const license = matched[1];
  const block = matched[2];
  const street = matched[3];
  const unit = matched[4];
  const postcode = matched[5];
  const name = matched[6];
  const level = matched[7];

  outputStream.write(JSON.stringify({
    id: id, 
    name: name, 
    block: block, 
    street: street, 
    unit: unit, 
    postcode: postcode, 
    level: level, 
    license: license
  }));
});

reader.on("close", () => {
  // end of output json list
  outputStream.write("]");

  console.log("parse done.");
});