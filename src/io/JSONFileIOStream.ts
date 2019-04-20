


export class JSONFileIOStream {
  // private path = require('path');
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new JSONFileIOStream();
  }
  
  private static instance: JSONFileIOStream;

  public mountJSONFileURL(data: any) {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], {type: "application/json"});
    return URL.createObjectURL(blob);
  }


  public async readJSON(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader  = new FileReader();
      reader.onload = () => {
        const parsedJSON = this.parseJSON(reader.result);
        return resolve(parsedJSON);
      };
      reader.onerror = reject;
      reader.readAsText(file);  
    });
  }

  private parseJSON(json: any) {
    let data;
    try {
      data = JSON.parse(json);
      return data;
    } catch (e) {
      throw e;
    }
  }
}