import { BlockUIActions } from '../constants';

export class BlockUIEvent {
    name: string;
    action: BlockUIActions;
    message?: string;
}
