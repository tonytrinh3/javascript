import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem (count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        //test current element id is same as passed in id
        const index = this.items.findIndex(el => el.id === id)



        //[2,4,8] splice(1,1) starting at what index and take out how many-> return 4, original array is now [2,8], mutate the array
        //[2,4,8] slice(1,1) starting at what index and end at what index -> return 4, original array is [2,4,8] - slice() doesn't mutate the array
        //now delete the item
        this.items.splice(index,1)
    }

    updateCount(id, newCount){
        //of the items, find the passed in id that match with id within item, the count of that, and change it to the newCount
        this.items.find(el => el.id === id).count = newCount;
    }






}