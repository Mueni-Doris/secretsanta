// src/api/participants.js

import { apiClient } from './client'

export const joinExchange = (data) =>
  apiClient('/match', {
    method: 'POST',
    body: JSON.stringify(data),
  })
