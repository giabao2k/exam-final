const fs = require("fs");
const qs = require('qs');
const City = require("../model/city");

class CityController{
    constructor(){
        this.city = new City();
    }

    // show city

    showCity(req,res){
        fs.readFile('views/index.html', 'utf-8', async(err, data)  => {
            if (err) {
                console.log(err);
            }
            else{
                let citys = await this.city.getCity();
                let tbody = '';
                for(let index = 0; index < citys.length; index++) {
                    tbody += `<tr>   
                    <th scope="row">${citys[index].id}</th>
                    <td>${citys[index].cityName}</td>
                    <td>${citys[index].country}</td>
                    <td><a href=/editcity?id=${citys[index].id}>Sửa</a></td>
                    <td><a href="/delete?id=${citys[index].id}">Xoá</a></td>
                    </tr>
                    `
                }
                data = data.replace('{city}', tbody);
                res.writeHead(200,{'Content-Type':'Text/html'});
                res.write(data);
                return res.end();
            }
        })
    }
    // show form create city 
    showFormCreateCity(req, res){
        fs.readFile('views/create_city.html','utf-8',(err, data) => {
            if(err){
                console.log(err);
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end(); 
            }
        });
    }
    // create city
    createCity(req,res){
        let data = '';
        req.on('data', chunk =>{
            data += chunk;
        });
        req.on('end', () =>{
            let city = qs.parse(data);
            this.city.createCity(city);
            res.writeHead(301, {
                location: '/',
            });
            return res.end();
        });
    }
    // show form edit city
    showFormEditCity(req, res, idUpdate){
        fs.readFile('views/edit_city.html','utf-8', async(err, data) => {
            if(err){
                console.log(err);
            }
            else{

                    let city = await this.city.getCityById(idUpdate);
                    data = data.replace('{id}', city[0].id);
                    data = data.replace('{cityName}', city[0].cityName);
                    data = data.replace('{country}', city[0].country);
                    data = data.replace('{country_id}', city[0].country_id);
                    data = data.replace('{area}', city[0].area);
                    data = data.replace('{population}', city[0].population);
                    data = data.replace('{GDP}', city[0].GDP);
                    data = data.replace('{cityDescription}', city[0].cityDescription);
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                return res.end(); 
            }
        });
    }
     //edit city
     editCity(req,res,id){
        let data = '';
        req.on('data', chuck => {
            data += chuck;
        });
        req.on('end', () =>{
            let city = qs.parse(data);
            this.city.updateCity(id, city);
            res.writeHead(301,{
                location: '/',
            });
            return res.end();
        });
    }

    //delete city
    deleteCity(req,res, id){
        this.city.deleteCity(id).then(() => {
            res.writeHead(301,{
                location: '/',
            });
            res.end();
        }, () => {
            res.writeHead(301,{
                location: '/',
            });
            res.end();
        });
        
    }

};
module.exports = CityController;