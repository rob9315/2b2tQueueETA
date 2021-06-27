import { readFileSync } from 'fs';
import { ColumnTuple, CSVdataFromColumnTuples, writeCSVData } from './util';
import fetch from 'node-fetch';
(async ()=>{
  writeCSVData(CSVdataFromColumnTuples(...(await Promise.all(readFileSync('.queue', 'utf-8').split('\n').map(async v=>(await fetch(v)).json()))).map(v=>[v.key, v.data]) as ColumnTuple[]))
})()