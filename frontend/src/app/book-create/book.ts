export class Book {
    public name: string;
    public description: string;
    public id:Number;
    public show:Boolean;
    
  
  
  constructor(name: string, desc: string,num:Number) {
    this.name = name;
    this.description = desc;
    this.id=num;
    this.show=true;
    }
  }