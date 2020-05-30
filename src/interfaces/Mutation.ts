import { Action } from './Action';

export interface Mutation {
    actions: Action[];
    checkpoint?: ImageData;
}
