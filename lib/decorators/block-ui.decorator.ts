import { BlockUIServiceInstance } from '../block-ui.module';


export function BlockUI(value?: string) {
    return function (target?: any, propertyKey?: string, descriptor?: any) {
        target[propertyKey] = BlockUIServiceInstance.decorate(value);
    }
}
