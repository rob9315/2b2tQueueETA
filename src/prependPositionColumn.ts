import { readCSVdata, writeCSVData } from "./util";

let data = readCSVdata();
data.forEach((v,i)=>`${v[0]}`.match(/[0-9]+/)?v.unshift(i-1 as never):v.unshift('position' as never));
writeCSVData(data);