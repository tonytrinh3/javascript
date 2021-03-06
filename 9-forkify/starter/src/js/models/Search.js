import axios from 'axios';
//you need curly braces when import const...
import {key, proxy} from '../config';

export default class Search {
    //class is a es6 feature
    //you make class in order to duplicate object 

    //same as es5 function 
    constructor(query){
        this.query = query;
    }

    async getResults(){
        try{
            //axios used in this case is same as fetch except axios can be used in all browsers unlike fetch and axios catch errors better 
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            //change from a const to this. allows you to save recipes into the object when you use it 
            this.result = res.data.recipes;
            
        } catch (error){
            alert(error);
        }
    
    }
    
    
}
