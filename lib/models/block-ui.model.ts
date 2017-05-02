/**
 * A BlockUI instance
 */
export interface NgBlockUI {
    /**
     * Starts blocking for BlockUI instance
     */
    start(message?: string): void;

    /**
     * Update blocking message for BlockUI instance
     */
    update(message: string): void;

    /**
     * Stops blocking for BlockUI instance
     */
    stop(): void;

    /**
     * Stops blocking for all current BlockUI instances
     */
    reset(): void;

    /**
    * Unsubscribes BlockUI instance
    */
    unsubscribe(): void;
}
