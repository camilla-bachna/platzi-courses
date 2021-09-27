"use strict";
//Type: object
var user;
user = {}; //Object
user = {
    id: 1,
    username: "paparazzi",
    fistName: "pablo",
    isPro: true
};
console.log("user", user); // user { id: 1, username: 'paparazzi', fistName: 'pablo', isPro: true } 
//console.log("username", user.username) //Error Property 'username' does not exist on type 'object'.
//Cannot access the properties of the object; 
//Object (class JS: instance of class Object) vs object (type TS for non-primitive values)
var myObj = {
    id: 1,
    username: "paparazzi",
    fistName: "pablo",
    isPro: true
};
/* const myObj: {
    id: number;
    username: string;
    fistName: string;
    isPro: boolean;
} */
var isInstance = myObj instanceof Object; //will give boolean value => class Object JS
console.log("isInstance", isInstance); //isInstance true
console.log("username", myObj.username); //username paparazzi, its possible to access property
