import { InteractionRecord } from '../InteractionRecord';
import { Tool } from '../tools/Tool';
import { Style } from './Style';

export interface Action {
  tool: Tool;
  record: InteractionRecord;
  style?: Style;
}
