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
     * Stops blocking for all current BlockUI instances
     */
    reset(): void;

    /**
    * Unsubscribes BlockUI instance
    */
    unsubscribe(): void;
}
