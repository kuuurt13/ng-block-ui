import { BlockUIActions } from '../constants/block-ui-actions.constant';

export class BlockUIEvent {
    name: string;
    action: BlockUIActions;
    message?: string;
}
