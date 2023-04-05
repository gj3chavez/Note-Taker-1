const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');



// const db = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8'));
// const fs = require('fs');

notes.get('/',(req, res)=> {
    console.info(`${req.method} request received notes`);

    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        } else{
            res.json(JSON.parse(data));
        }
    });
});


notes.post('/', (req,res)=>{
    console.info(`${req.method} request received notes`);

    const {title, text} = req.body;

    const newNote ={
        title,
        text,
        id: uniqid()
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, text)=>{
                if (err) {
                    console.error(err)
                }
            })
            res.json(JSON.parse(data));
        }
    })
});


notes.delete('/:id', (req, res)=> {
    const noteToDelete = req.params.id;

    fs.readFile('./db/db.json', 'utf-8',(err, data)=>{
        if(err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            let result = parsedData.find(obj =>{
                return obj.id === noteToDelete;
            })

            const noteIndex = parsedData.indexOf(result);
            console.log(noteIndex);
            console.log(result);
            if (noteIndex > -1){
                parsedData.splice(noteIndex, 1);
            }

            fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err)=>{
                if (err){
                    console.error(err)
                }
            })
            res.json(JSON.parse(data));
        }
    })
});

module.exports = notes;




// module.exports = function (app){
   
//     app.get('/api/notes', function(req, res){
//         res.JSON(db);
        
//     });

//     app.get('/api/notes/:id', function(req, res){
//         res.json(db[Number(req.params.id)]);
//     });

    
//     app.post('/api/notes', function(req, res){
        
//        let newNote = req.body;

//         let uniqid = (db.length).toString();
//         console.log(uniqid);
        
//         newNote.id = uniqid;
//         db.push(newNote);

//         fs.writeFileSync('./db/db.json', JSON.stringify(db), function (err){
//             if (err) throw err;
//         });
//         res.JSON(db);
//     });


//     app.deletee('/api/notes/:id', function(req, res){
//         let noteId = req.params.id;
//         let newId = 0;
//         console.log(`Deleting note with id ${noteId}`);

//         for (currentNote of db){
//             currentNote.id = newId.toString();
//             newId++;
//             }
       
       
//         fs.writeFileSync('.', JSON.stringify(db));
//         res.json(db);
      
//     });
// }