import { JSONFileIOStream } from "./JSONFileIOStream";

export interface Model {

}

export class ModelDAO {

  /* tslint:disable:no-unused-variable */
  public static loadModel(): Model {
    const path = "teste.json";
    const streamIO = JSONFileIOStream.getInstance();
    const modelJSON = streamIO.readJSON(path);
    const model = this.populateModel(modelJSON);
    if (!model) {
      throw new Error("Failed to load data.");
    }
    return model;
  }
  
  public static saveModel(model: Model) {
    const streamIO = JSONFileIOStream.getInstance();
    streamIO.saveJSON(model, "");
  }
  
  private static populateModel(modelJSON: any): Model | null {
    return { };
  }
}