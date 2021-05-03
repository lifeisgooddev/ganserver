const request = require('request-promise')
const save_results = require('./save_results.js')
const secrets = require('./secrets.js')
const fs = require('fs');

async function main() {
    const size = 1028
    const [ imgs ] = await request({
        url: secrets.ganurl256+'/random',
        method: 'POST',
        json: true,
        form: { num: '1' }
    })
    for (let i = 0; i < imgs.length; i++) {
        const buf = new Buffer(imgs[i].replace(/^data:image\/\w+;base64,/, ""),'base64')
        fs.writeFileSync("public/img/a.jpeg", buf);
    }
    console.log(imgs);
    // await save_results({ imgs, vectors, labels, size })
    console.log('all done')
}

main().catch(e => {
    console.log(e)
    process.exit()
}).then(process.exit)
