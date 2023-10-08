[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Node.js - Food</h3>
  <p align="center">Project created for <strong>Start2Impact</strong> course: <em>Node.js project</em></p>
</div>

### Built With

* [Node.js](https://nodejs.org/en)
* [MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/) (or get the following italian only [guide](https://www.html.it/guide/guida-mysql/))
* or alternatively follow [this](https://www.html.it/pag/52749/impostare-un-ambiente-php-su-linux/) guide (italian only)
* [REST API](https://www.html.it/guide/rest-api-e-database-la-guida/) (italian only); the project follows the REST API convention 

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo

```sh
git clone git@github.com:matteorazzanelli/food-nodejs.git
```

2. Project setup: if you have both *mysql* and *lampp* environment installed, this may cause conflict; to resolve this just type 
```
service mysql stop
```
```
sudo /opt/lampp/lampp restart
```

3. Nodejs environment setup [here](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm)


4. Rename *example.env* in *.env* and modify the following parameters with yours
```
DB_HOST=<YOUR_HOST>
DB_USER=<YOUR_USER>
DB_PSSWORD=<YOUR_PASSWORD>
DB_NAME=<YOUR_DATABASE_NAME>
```

5. Go to [phpMyAdmin](http://localhost/phpmyadmin/index.php) (eventually follow [thish](ttps://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-20-04) guide); go to the *Import* section, choose the *migrations.sql* file that is present in this folder and click on the *Import* button at the bottom. 

6. Go to work directory
```
cd food-nodejs
```

7. Install dependencies
```
npm install
```

8. Run
```
npm start
```

<!-- USAGE -->
## Usage

For trying the software you can download [Postman](https://www.postman.com/)
- The API in /products allows the insertion, modification and deletion of a sold product that has one characteristic: name.
- The /users APIs allow the insertion, modification and deletion, of a user's record that will have the following characteristics: first name, last name, email.
- The /orders API allows the insertion, modification and deletion, of a sales order that will have the following characteristics: the products of that order, the users that are part of that order.
- In /orders you will also be able to view all orders and filter by order entry date and/or the products in it.
- It is possible to do this via REST-type HTTP requests using the GET,POST,PUT,DELETE methods.

The response is always of type
```
{
  "success": true/false,
  "content": [
    {
      
    }
  ]
}
```
where _success_ can be true or false and content can be an array of object (if success is true) or an error message otherwise.

## REST API

The term REST is used to describe any type of interface capable of transmitting data by means of the HTTP protocol.

We can say that REST is the way HTTP should be used.

The client will be responsible for requesting a service from the server, which will instead be responsible for providing it. 

Suppose we have to develop a web application capable of processing the four CRUD (Create, Read, Update, Delete) operations. Our application, which will be nothing more than a Node application, will have the task of calling, via a web API, an external service that will perform one of the CRUD operations.

Essentiually, the REST interface is all but the mapping function between HTTP and CRUD methods.

In this project the REST API are the methods of the Controllers' classes. Thus, the REST interface is represented by the set of all the methods defined in these classes.

<!-- CONTACT -->
## Link & Contact

Matteo Razzanelli - matteo.razzanelli89@gmail.it

Start2impact personal page - https://talent.start2impact.it/profile/matteo-razzanelli

Project Repository: [Node.js App](https://github.com/matteorazzanelli/food-nodejs)

<!-- MARKDOWN LINKS & IMAGES -->
[issues-shield]: https://img.shields.io/github/issues/matteorazzanelli/food-nodejs/repo.svg?style=for-the-badge
[issues-url]: https://github.com/matteorazzanelli/food-nodejs/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/matteo-razzanelli/