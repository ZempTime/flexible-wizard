/* eslint-disable import/extensions */
import { html } from 'lit-html';
import { withKnobs, withWebComponentsKnobs, text } from '@open-wc/demoing-storybook';

import '../flexible-wizard.js';

export default {
  title: 'FlexibleWizard|Playground',
  component: 'flexible-wizard',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};

export const singleComponent = () => html`
  <flexible-wizard></flexible-wizard>
`;

export const manualContent = () => html`
  <flexible-wizard>
    <p>${text('Content', 'Some text', 'Properties')}</p>
  </flexible-wizard>
`;
