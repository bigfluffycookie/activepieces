import { createCustomApiCallAction } from '@activepieces/pieces-common';
import { PieceAuth, createPiece } from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';
import { todoistCreateTaskAction } from './lib/actions/create-task-action';
import { todoistTaskCompletedTrigger } from './lib/triggers/task-completed-trigger';

export const todoistAuth = PieceAuth.OAuth2({
  required: true,
  authUrl: 'https://todoist.com/oauth/authorize',
  tokenUrl: 'https://todoist.com/oauth/access_token',
  scope: ['data:read_write'],
});

export const todoist = createPiece({
  displayName: 'Todoist',
  minimumSupportedRelease: '0.5.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/todoist.png',
  authors: ['khaledmashaly'],
  categories: [PieceCategory.PRODUCTIVITY],
  auth: todoistAuth,
  actions: [
    todoistCreateTaskAction,
    createCustomApiCallAction({
      baseUrl: () => 'https://api.todoist.com/rest/v2',
      auth: todoistAuth,
      authMapping: (auth) => ({
        Authorization: `Bearer ${auth}`,
      }),
    }),
  ],
  triggers: [todoistTaskCompletedTrigger],
});
