import { InteractionRecord } from '../InteractionRecord';
import { Tool } from '../Tool';
import { Style } from './Style';

export interface Action {
  tool: Tool;
  record: InteractionRecord;
  style?: Style;
}
