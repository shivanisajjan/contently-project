export class Commit{
  public message: String = 'Custom commit msg';
  public committer: any = {
    name: String,
    email: String
  };
  sha: String;
  content: String;

  constructor(message: String,
              committerName: String,
              committerEmail: String,
              sha: String,
              content: String){
    this.message = message;
    this.committer = {
      name: committerName,
      email: committerEmail
    };
    this.sha = sha;
    this.content = content;
  }

}
