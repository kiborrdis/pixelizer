import { Action } from './interfaces/Action';
import { Mutation } from './interfaces/Mutation';

interface ActionRecord {
  action: Action;
  id: number;
}

interface Checkpoint {
  data: ImageData;
  actionId?: number;
}

export class History {
  private actions: ActionRecord[] = [];
  private checkpoints: Checkpoint[] = [];

  constructor(checkpoint: ImageData) {
    this.checkpoints.push({
      data: checkpoint,
    });
  }

  public add(action: Action): Mutation {
    this.actions.push({
      action: { ...action },
      id: this.actions.length,
    });

    return {
      actions: [ action ],
    };
  }

  public back(): Mutation {
    if (this.isActionAndCheckpointOnTopMatch()) {
      this.checkpoints.pop();
    }

    this.actions.pop();

    const diffActions = [];
    const topCheckpoint = this.checkpoints[this.checkpoints.length - 1];

    for (
      let i = this.actions.length - 1;
      i >= 0 && topCheckpoint.actionId !== this.actions[i].id;
      i -= 1
    ) {
      diffActions.push(this.actions[i].action);
    }

    return {
      actions: diffActions.reverse(),
      checkpoint: topCheckpoint.data,
    };
  }

  public addNewCheckpoint(checkpoint: ImageData) {
    if (this.isActionAndCheckpointOnTopMatch()) {
      this.replaceCheckpointOnTop(checkpoint);
    } else {
      this.checkpoints.push({
        data: checkpoint,
        actionId: this.getCurrentActionId(),
      });
    }
  }

  private getCurrentActionId() {
    return this.actions[this.actions.length - 1].id;
  }

  private isActionAndCheckpointOnTopMatch() {
    return this.checkpoints[this.checkpoints.length - 1].actionId === this.getCurrentActionId();
  }

  private replaceCheckpointOnTop(checkpoint: ImageData) {
    const currentActionId = this.actions[this.actions.length - 1].id;

    this.checkpoints.pop();

    this.checkpoints.push({
      data: checkpoint,
      actionId: currentActionId,
    });
  }
}
