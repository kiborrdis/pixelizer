import { InteractionRecord } from '../recorders/InteractionRecord';
import { Tool } from '../tools/Tool';
import { Style } from './Style';
export interface Action<R extends InteractionRecord = InteractionRecord> {
    tool: Tool<R>;
    record: R;
    style?: Style;
}
