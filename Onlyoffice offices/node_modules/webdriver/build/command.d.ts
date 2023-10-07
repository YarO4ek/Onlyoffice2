/// <reference types="node" />
import type { ChildProcess } from 'node:child_process';
import type { CommandEndpoint, BidiResponse } from '@wdio/protocols';
import type { BidiHandler } from './bidi/handler.js';
import type { WebDriverResponse } from './request/index.js';
import type { BaseClient } from './types.js';
interface BaseClientWithEventHandler extends BaseClient {
    eventMiddleware: BidiHandler;
    _driverProcess?: ChildProcess;
}
export default function (method: string, endpointUri: string, commandInfo: CommandEndpoint, doubleEncodeVariables?: boolean): (this: BaseClientWithEventHandler, ...args: any[]) => Promise<WebDriverResponse | BidiResponse | void>;
export {};
//# sourceMappingURL=command.d.ts.map