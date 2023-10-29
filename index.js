const {parse} = require('node-html-parser')
const {authorize} = require('./authorize.js');
const {getDecodedMessage} = require('./helpers/listMessages.js');




async function printMessage(){
    const auth = await authorize()
    const undecoded = await getDecodedMessage(auth);
    console.log(undecoded);
    if(undecoded==""){
        console.log ("No messages from sweList");
    }
    const decoded = Buffer.from(undecoded, 'base64').toString('utf-8');
    const root = parse(decoded);
    const links = root.querySelectorAll('.internship').map((ele)=>
        ({
            company: ele.firstChild.text.split(':')[0],
            link: ele.lastChild.getAttribute('href')
        })
    )
    console.log(links);
}

printMessage();

