/**
 * A BlockUI instance
 */
export interface NgBlockUI {
    [key: string]: any;

    /**
     * BlockUI instance name
     */
    name: string;

    /**
     * Is BlockUI instance active
     */
    isActive: boolean;

    /**
     * Number of start method calls for instance
     */
    blockCount: number;

    /**
     * Starts blocking for BlockUI instance
     */
    start(message?: any): void;

    /**
     * Update blocking message for BlockUI instance
     */
    update(message: any): void;

    /**
     * Stops blocking for BlockUI instance
     */
    stop(): void;

    /**
     * Resets blocking for BlockUI instances regardless of how many times start was called
     */
    reset(): void;

    /**
     * Resets blocking for all BlockUI instances
     */
    resetGlobal(): void;

    /**
    * Unsubscribes BlockUI instance
    */
    unsubscribe(): void;
}
