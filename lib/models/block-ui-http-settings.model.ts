export interface HttpSettings {
  requestFilters?: (RegExp | { method: string, url: RegExp } | Function)[];
  blockAllRequestsInProgress?: boolean;
}
