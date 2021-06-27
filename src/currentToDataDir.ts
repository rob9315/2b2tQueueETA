import { QueueDataFromExponentData, writeColumnTuple } from './util';

if (!process.argv[process.argv.length-1].match(/^[0-9]+$/)) process.exit(console.log('wrong input') as never);

writeColumnTuple([process.argv[process.argv.length -1], QueueDataFromExponentData(Number(process.argv[process.argv.length-1]))]);