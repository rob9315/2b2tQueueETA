import { existsSync, readFileSync, writeFileSync } from 'fs';
const linear = require('everpolate').linear;

export type CSVdata = [titlerow: string[], ...datarows: number[][]];
export type QueueData = [position: number[], seconds: number[]];
export type ExponentData = [length: number[], exponent: number[]];
export type ColumnTuple = [title: string, data: QueueData];
export const currentExponentData: ExponentData = [
  [93, 207, 231, 257, 412, 418, 486, 506, 550, 586, 666, 758, 789, 826],
  [0.9998618838664679, 0.9999220416881794, 0.9999234240704379, 0.9999291667668093, 0.9999410569845172, 0.9999168965649361, 0.9999440195022513, 0.9999262577896301, 0.9999462301738332, 0.999938895110192, 0.9999219189483673, 0.9999473463335498, 0.9999337457796981, 0.9999279556964097],
];
export const c = 150;

export const readCSVdata = (path = 'data.csv') => (path === '' ? '' : existsSync(path) ? readFileSync(path).toString() : '').split('\n').map((v, i) => v.split(',').map((v) => (i === 0 ? v : Number(v)))) as CSVdata;
export const readJSONqueueData = (path: string): ColumnTuple => [path.match(/(?<=data\/).*(?=\.json)|.*(?=\.json)|.*/)?.[0] as string, JSON.parse(readFileSync(path).toString())];
export const CSVdataFromColumnTuples = (...columnTuples: ColumnTuple[]) => [columnTuples.map((v) => v[0]), ...[...new Array(Math.max(...columnTuples.map((v) => v[1][0].reduce((a, b) => Math.max(a, b)) + 1)))].map((v, i) => columnTuples.map((v) => v[1][1][v[1][0].findIndex((v) => v === i)]))] as CSVdata;
export const CSVstringify = (CSVdata: CSVdata) => CSVdata.map((v) => v.join(',')).join('\n');
export const writeCSVData = (CSVdata: CSVdata, path = 'data.csv') => writeFileSync(path, CSVstringify(CSVdata));
export const QueueDataFromExponentData = (length: number, exponentData?: ExponentData) => [[...new Array(length)].map((v, i) => i), [...new Array(length)].fill(linear(length, ...(exponentData ?? currentExponentData))[0] as number).map((staticExponent, position) => Math.log((position + c) / (length + c)) / Math.log(staticExponent))] as QueueData;
export const writeQueueData = (queueData: QueueData, path: string) => writeFileSync(path, JSON.stringify(queueData));
export const writeColumnTuple = (columnTuple: ColumnTuple, folderPath = 'data/') => writeQueueData(columnTuple[1], `${folderPath}${columnTuple[0]}.json`);

// export const addColumnsToCSVdata = (CSVdata: CSVdata, ...newDataArr: ColumnTuple[])=>newDataArr.forEach(newData=>newData.forEach((v,i)=>i===0?CSVdata[0].push(v as string):(v as [number[], number[]])[0].forEach((pos, index)=>(CSVdata[pos+1]=CSVdata[pos+1]??[])&&(CSVdata[pos+1][CSVdata[0].length-1]=(v as QueueData)[1][index]))))
