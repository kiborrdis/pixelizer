import { Action } from './interfaces/Action';
import { Mutation } from './interfaces/Mutation';
export declare class History {
    private actions;
    private checkpoints;
    constructor(checkpoint: ImageData);
    add(action: Action): Mutation;
    back(): Mutation;
    addNewCheckpoint(checkpoint: ImageData): void;
    private getCurrentActionId;
    private isActionAndCheckpointOnTopMatch;
    private replaceCheckpointOnTop;
}
