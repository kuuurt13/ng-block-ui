export const template = `
<div class="block-ui-wrapper {{name}} {{className}}" [ngClass]="{ 'active': state.blockCount > 0 }">
  <div class="block-ui-spinner" *ngIf="!templateCmp">
    <div class="loader"></div>
    <div *ngIf="message || defaultMessage" class="message">
      {{ message || defaultMessage }}
    </div>
  </div>
  <ng-template *ngIf="templateCmp" #templateOutlet></ng-template>
</div>
`;
