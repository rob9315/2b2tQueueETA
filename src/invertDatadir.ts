import { opendirSync, writeFile, writeFileSync } from "fs";
import { ColumnTuple, readJSONqueueData } from "./util";

const dir = opendirSync('data');
let dirEntry;
const dirData: ColumnTuple[] = [];
while (dirEntry = dir.readSync()) {
  if (!dirEntry.isFile() || dirEntry.name.match(/-inverted/)) continue;
  dirData.push(readJSONqueueData(`data/${dirEntry.name}`));
}

dirData.forEach(v=>v[1][1]=v[1][1].map((v,i,a)=>a[a.length-1]-v));
dirData.forEach(v=>writeFileSync(`${v[0]}-inverted.json`, JSON.stringify(v[1])));
