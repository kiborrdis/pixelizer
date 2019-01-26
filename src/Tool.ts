
import { InteractionRecord } from './InteractionRecord';

export abstract class Tool {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord): void {
    throw new Error(`passed record type is not supported`);
  }
}
