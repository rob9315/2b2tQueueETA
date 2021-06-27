import { opendirSync } from 'fs';
import { ColumnTuple, CSVdataFromColumnTuples, readJSONqueueData, writeCSVData } from './util';

const dir = opendirSync('data');
let dirEntry;
const dirData: ColumnTuple[] = [];
while (dirEntry = dir.readSync()) {
  if (!dirEntry.isFile()) continue;
  dirData.push(readJSONqueueData(`data/${dirEntry.name}`));
}
// let data = readCSVdata('');
// addColumnsToCSVdata(data, ...dirData);
writeCSVData(CSVdataFromColumnTuples(...dirData));