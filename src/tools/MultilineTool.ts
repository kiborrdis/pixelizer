import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';
import { NPointRecord, isNPointRecord } from '../recorders/NPointRecorder';
import {
    NPressurePointsRecord,
    isNPressurePointsRecord,
} from '../recorders/NPressurePointsRecorder';
import { CanvasParams } from '../interfaces/CanvasParams';

export class MultilineTool extends Tool<NPointRecord | NPressurePointsRecord> {
    public applyToContext(
        context: CanvasRenderingContext2D,
        record: NPointRecord | NPressurePointsRecord,
        params: CanvasParams,
    ) {
        if (isNPressurePointsRecord(record)) {
            this.drawPressureAwareLine(context, record, params);
        }

        if (isNPointRecord(record)) {
            this.drawLineBasedOnArrayOfPoints(context, record);
        }
    }

    private drawPressureAwareLine(
        context: CanvasRenderingContext2D,
        record: NPressurePointsRecord,
        params: CanvasParams,
    ) {
        const baseWidth = params.baseLineWidth || 3;
        const minWidth = baseWidth / 3;
        const maxWidth = baseWidth * 3;
        const { points } = record;

        if (points.length < 1) {
            return;
        }

        context.lineWidth =
            (maxWidth - minWidth) * points[0].pressure + minWidth;
        points.forEach((point, index) => {
            if (index - 1 < 0) {
                return;
            }

            context.lineWidth =
                (maxWidth - minWidth) * point.pressure + minWidth;

            const path = new Path2D();
            path.moveTo(points[index - 1].p.x, points[index - 1].p.y);
            path.lineTo(point.p.x, point.p.y);
            context.stroke(path);
        });
    }

    private drawLineBasedOnArrayOfPoints(
        context: CanvasRenderingContext2D,
        record: NPointRecord,
    ) {
        const path = new Path2D();
        const { points } = record;

        if (points.length < 1) {
            return;
        }

        path.moveTo(points[0].x, points[0].y);

        points.slice(1).forEach((point) => {
            path.lineTo(point.x, point.y);
        });

        context.stroke(path);
    }
}
