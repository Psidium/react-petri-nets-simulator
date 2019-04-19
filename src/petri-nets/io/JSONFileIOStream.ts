
export class JSONFileIOStream {
  // private path = require('path');
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new JSONFileIOStream();
  }
  
  private static instance: JSONFileIOStream;
  private fs = require('fs');

  public saveJSON(data: any, path: string) {
    this.createDirIfNeeded(path);
    const JSONModel = JSON.stringify(data);
    try {
      this.fs.writeFileSync(path, JSONModel);
    } catch(e) {
      throw new Error("Failed to save JSON File.");
    }
  }

  public readJSON(path: string): any {
    try {
      const data = this.fs.readFileSync(path);
      return JSON.parse(data);
    } catch(e) {
      throw new Error("Failed to read JSON File.");
    }
  }

  private createDirIfNeeded(dirPath: string) {
    if (!this.fs.existsSync(dirPath)){
        this.fs.mkdirSync(dirPath);
    }
  }
}