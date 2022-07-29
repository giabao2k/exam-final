const http = require('http');
const fs = require('fs');
const url = require('url')
const qs = require('qs');
const CityController = require('./controller/city-controller');

let server = http.createServer((req, res) => {
    let cityController = new CityController()
    let urlParse = url.parse(req.url);
    let urlPart = urlParse.pathname;
    let method = req.method;

    switch (urlPart){
        case '/':
                cityController.showCity(req, res);
            break;

        case '/createcity':{
            if(method == 'GET'){
                cityController.showFormCreateCity(req, res);
            }else{
                cityController.createCity(req, res);
            }
            break;
        }

        case '/editcity':{
            let query = qs.parse(urlParse.query);
            let idUpdate = query.id;
            if(method == 'GET'){
                cityController.showFormEditCity(req, res, idUpdate);
            }
            else{
                cityController.editCity(req, res, idUpdate);
            }
            break;
        }
        case '/delete':{
                let query = qs.parse(urlParse.query);
                let idDelete = query.id;
                cityController.deleteCity(req, res, idDelete);
            break;
    }
            
    }
    
});

server.listen(3000, () =>{
    console.log('Server running is localhost:3000');
})