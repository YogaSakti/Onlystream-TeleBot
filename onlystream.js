const fetch = require('node-fetch');
const ApiKey = process.env.ApiKey;


const RemoteUpload = (dirurl) =>
    new Promise((resolve, reject) => {
        const url = `https://onlystream.tv/api/upload/url?key=${ApiKey}&url=${dirurl}`;

        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    });

    const FileInfo = (FCode) =>
    new Promise((resolve, reject) => {
        const url = `https://onlystream.tv/api/file/info?key=${ApiKey}&file_code=${FCode}`;

        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    });


module.exports = {
    RemoteUpload,
    FileInfo,
}