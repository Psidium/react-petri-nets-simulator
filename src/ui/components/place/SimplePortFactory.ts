import { AbstractPortFactory, PortModel } from 'storm-react-diagrams';

export class SimplePortFactory extends AbstractPortFactory {
    constructor(
        name: string,
        private callback: (config: any) => PortModel
    ) {
        super(name);
    }

    public getNewInstance(initialConfig?: any): PortModel {
        return this.callback(initialConfig);
    }

}
