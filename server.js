const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs');
app.use(express.static("public"));
app.use(formidable());

app.post('/create-post', function (req, res) {
    let data = req.fields;
    let time = Date.now();
    addPost(data, time, res);
    //res.sendFile(__dirname + '/data/posts.json');
});

app.get('/get-posts', function (req,res){
    res.sendFile(__dirname + '/data/posts.json');
});
function addPost(data, time, res) {
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        if (error) {
            console.log(error);
            return;
        }
        else {
            const parsedFile = JSON.parse(file);
            parsedFile[time] = data.blogpost;
            res.send(data);
            const jsonToWrite = JSON.stringify(parsedFile);
            fs.writeFile(__dirname + '/data/posts.json', jsonToWrite, (err, data) => {//Zapisz plik
                if (err) {
                    console.log('Błąd zapisu pliku', err);
                }

            });
        }
    });
}



app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});