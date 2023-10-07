/// <reference types="node" />
import { EventEmitter } from 'node:events';
import WebSocket from 'ws';
import type { CommandData } from './remoteTypes.js';
import type { CommandResponse } from './localTypes.js';
export declare class BidiCore extends EventEmitter {
    #private;
    private _webSocketUrl;
    constructor(_webSocketUrl: string);
    connect(): Promise<void>;
    get socket(): WebSocket;
    get isConnected(): boolean;
    send(params: CommandData): Promise<CommandResponse>;
    sendAsync(params: CommandData): number;
}
//# sourceMappingURL=core.d.ts.map