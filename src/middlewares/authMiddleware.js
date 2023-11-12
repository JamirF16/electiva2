require('dotenv').config();
function checkApiKey(req, res, next){
    const apiKey = req.headers['api'];

    if(apiKey === process.env.SECRET){
        next();
    }else{
        next(res.json({error: 'Unauthorized'}));
    }
}

module.exports = {checkApiKey}