import { readFileSync, writeFileSync } from 'fs';
import { writeCSVData } from './util';
import fetch from 'node-fetch';
(async ()=>{
  (await Promise.all(readFileSync('.queue', 'utf-8').split('\n').map(async v=>(await fetch(v)).json()))).forEach(({key, data})=>writeCSVData([key, data]));
})()