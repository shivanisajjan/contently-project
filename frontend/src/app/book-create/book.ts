export class Book {
    public name: String;
    // public description: string;
    // public id:Number;
    // public show:Boolean;
    public sha: String;
    public content: String;


  constructor(name: String, sha: String, content: String){
    this.name = name;
    this.sha = sha;
    this.content = content;
  }
  }
