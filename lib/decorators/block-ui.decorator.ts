import { BlockUIServiceInstance } from '../block-ui.module';
import { BlockUIDecoratorSettings } from '../models/block-ui-decorator-settings.model';

export let blockInstanceGuid = 1;

export function BlockUI(blockName?: string, settings: BlockUIDecoratorSettings = {}) {
  if (!settings.scopeToInstance) {
    return function (target?: any, propertyKey?: string) {
      target[propertyKey] = BlockUIServiceInstance.decorate(blockName);
    };
  }


  return function (target?: any, key?: string) {
    const secret = `_${key}-block-ui`;

    Object.defineProperty(target, key, {
      get: function () {
        if (this[secret]) {
          return this[secret];
        }

        const instanceName = `${blockName}-${blockInstanceGuid++}`;
        this[secret] = BlockUIServiceInstance.decorate(instanceName);

        return this[secret];
      },
      set: function (value: any) {
        this[secret] = value;
      },
    });
  };
}
