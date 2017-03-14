export const template = `
<div class="block-ui-wrapper" [class]="'block-ui-wrapper ' + name" *ngIf="active">
  <div class="block-ui-spinner">
    <div class="loader"></div>
    <div *ngIf="message || defaultMessage" class="message">
      {{ message || defaultMessage }}
    </div>
  </div>
</div>
`;
