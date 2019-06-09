const fs = require("fs");
const readline = require("readline");

const inputStream = fs.createReadStream("eating-establishments-geojson.geojson", { encoding: "utf-8" });
const outputStream = fs.createWriteStream("foodEstablishmentsParsed.txt");

const reader = readline.createInterface({
  input: inputStream,
  output: outputStream,
  terminal: false
});

// start of output json list
outputStream.write("[");

reader.on("line", line => {
  let data = line;
  if (line.charAt(line.length - 1) === ',') {
    data = line.slice(0, -1);
  }
  const json = JSON.parse(data);

  const id = json.properties.Name;
  const desc = json.properties.Description;
  const geom = json.geometry;

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

  let license = matched[1];
  let block = matched[2];
  let street = matched[3];
  let unit = matched[4];
  let postcode = matched[5];
  let name = matched[6];
  let level = matched[7];

  // some '(single quot) is in `(backtick)
  license = license.replace('`', '\'');
  name = name.replace('`', '\'');

  // clean up stray ?, e.g.: STARBRIGHT BARREL CLUB PTE LTD?
  license = license.replace('?', '');
  name = name.replace('?', '');

  // validate
  const valid = /^[a-z0-9().,*&#\-'@\/ ]+$/i;
  if (!valid.test(license) || license === '-') {
    console.log(`invalid license: ${license}`);
    license = "";
  }
  if (!valid.test(block) || block === '-') {
    console.log(`invalid block: ${block}`);
    block = "";
  }
  if (!valid.test(street) || street === '-') {
    console.log(`invalid street: ${street}`);
    street = "";
  }
  if (!valid.test(unit) || unit === '-') {
    console.log(`invalid unit: ${unit}`);
    unit = "";
  }
  if (!valid.test(postcode) || postcode === '-') {
    console.log(`invalid postcode: ${postcode}`);
    postcode = "";
  }
  if (!valid.test(name) || name === '-') {
    console.log(`invalid name: ${name}`);
    name = "";
  }
  if (!valid.test(level) || level === '-') {
    console.log(`invalid level: ${level}`);
    level = "";
  }

  if (name !== '') {
    outputStream.write(JSON.stringify({
      id: id, 
      name: name, 
      block: block, 
      street: street, 
      unit: unit, 
      postcode: postcode, 
      level: level, 
      license: license,
      geometry: geom
    }));

    outputStream.write(",\n");
  }
});

reader.on("close", () => {
  // end of output json list
  outputStream.write("]");

  console.log("parse done.");
});