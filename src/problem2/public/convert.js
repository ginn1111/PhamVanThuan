import fs from "node:fs"

const fileNames = []
fs.readdirSync('./tokens').map(fileName => {
  fileNames.push(fileName.split('.')[0])
})

fs.writeFileSync('./result.txt', JSON.stringify(fileNames))
