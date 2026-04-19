// src/api/participants.js

import { apiClient } from './client'

export const joinExchange = (data) =>
  apiClient('/participants/join', {
    method: 'POST',
    body: JSON.stringify(data),
  })
