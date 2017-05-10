export const template = `
<div class="block-ui-wrapper {{name}} {{className}}" [ngClass]="{ 'active': active }">
  <div class="block-ui-spinner" *ngIf="!templateCmp">
    <div class="loader"></div>
    <div *ngIf="message || defaultMessage" class="message">
      {{ message || defaultMessage }}
    </div>
  </div>
  <template *ngIf="templateCmp" #templateOutlet></template>
</div>
`;
