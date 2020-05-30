import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
import { TwoPointRecord } from '../recorders/TwoPointRecorder';
import { CanvasParams } from '../interfaces/CanvasParams';

export class FillTool extends Tool<InteractionRecord> {
    public serialize() {
        return { type: 'fill' };
    }

    public applyToContext(
        context: CanvasRenderingContext2D,
        record: InteractionRecord,
        params: CanvasParams,
    ) {
        const path = new Path2D();

        path.rect(0, 0, params.width, params.height);

        context.fill(path);
    }
}
