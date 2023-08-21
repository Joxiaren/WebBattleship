export default class IDManager{
    static IDIndex = {};
    static getID(object){
        let objectType = object.constructor.name;
        
        if(objectType in this.IDIndex){
            this.IDIndex[objectType] += 1;
        }
        else{
            this.IDIndex[objectType] = 0;
        }
        return objectType + `${this.IDIndex[objectType]}`;
    }
}