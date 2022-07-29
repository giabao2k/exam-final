const Connection = require("./connection");

class City{
    constructor(){
       this.connection = Connection.createConnection();
       this.connection.connect((err) => {
        if(err){
            console.log(err);
        } else {
            console.log('Connect success!');
        }
       }); 
    }

    getCity(){
        return new Promise((resolve, rejects) => {
            this.connection.query('SELECT * FROM city;;', (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getCityById(idUpdate){
        return new Promise((resolve, rejects) => {
            this.connection.query(`select * from city where id = ${idUpdate};`, (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    createCity(city){
        let insertQuery = `insert into city (cityName,country,country_id,area,population,GDP,cityDescription) values('${city.cityName}', '${city.country}','${city.country_id}','${city.area}','${city.population}','${city.GDP}','${city.cityDescription}')`;
        this.connection.query(insertQuery, (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log('Insert Success!');
            }
        });        
    }

    getCityById(id){
        return new Promise((resolve, rejects) => {
            let query = `select * from city where id=${id}`;
            this.connection.query(query, (err, data) =>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    getCityByType(type){
        return new Promise((resolve, rejects) => {
            let query = `select * from city where type=${type}`;
            this.connection.query(query, (err, data) =>{
                if(err){
                    rejects(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    updateCity(id, city){
        let query = `update city set cityName = '${city.cityName}',country = '${city.country}', country_id = ${city.country_id}, area = ${city.area}, population = ${city.population},gdp = ${city.GDP}, cityDescription = '${city.cityDescription}' where id=${id};`
        this.connection.query(query, (err, data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Update success');
            }
        })
    }

    deleteCity(id){
        return new Promise((rejects, resolve) => {
            // console.log(id);
            // let deleteQuery = `delete from city where id=${id}`
            // this.connection.query(deleteQuery, (err, data) => {
            //     if(err){
            //         rejects(err);
            //     } else {
            //         resolve('Delete success!');
            //     }
            // })
            let deleteQuery = `delete from city where id=${id}`
            this.connection.query(deleteQuery, (err, data) => {
                if(err){
                    rejects(err);
                } else {
                    resolve('Delete success!');
                }
            })
        })
    }

};

module.exports = City;