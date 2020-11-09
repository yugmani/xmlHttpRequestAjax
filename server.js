const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const {Pool, Pool} = require('pg');
const connectionString = `postgres://mywebappuser:123452localhost/mywebapp`;
const pool = new Pool({connectionString:connectionString});

app.use(express.static(path.join(__dirname, 'public')));

router.get('/api/bowlers', functon(req, res){
    pool.query(
        `SELECT * FROM bowlers`,
        [],
        function(err, result){
            if(err){
                console.error(err);
            }
            result.rows.forEach(function(bowler){
                bowler.overallAvg = Math.round((bowler.accuracy + bowler.power + bowler.consistency) /3);
                bowler.fullName = `${bowler.first_name}${bowler.last_name}`;               
            });
            result.rows = result.rows.sort(function(a, b){
                return a.overallAvg < b.overallAvg;
            });
            res.status(200).json(result.rows);
            }
        );
})

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/', router);
let server = app.listen(3000, function(){
    console.log("App server via Express is running on port 3000");
    console.log("To end, press Ctrl+C");
});