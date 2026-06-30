import test from 'node:test';
import assert from 'node:assert/strict';
import { handleClerkWebhookEvent } from '../Controllers/clerkWebhooks.js';

test('creates a user from a Clerk user.created webhook event', async () => {
  const calls = [];
  const fakeUserModel = {
    create: async (payload) => {
      calls.push(['create', payload]);
      return payload;
    },
    findByIdAndUpdate: async () => ({ ok: true }),
    findByIdAndDelete: async () => ({ ok: true }),
  };

  const payload = {
    id: 'user_123',
    email_addresses: [{ email_address: 'jane@example.com' }],
    first_name: 'Jane',
    last_name: 'Doe',
    image_url: 'https://example.com/avatar.png',
  };

  await handleClerkWebhookEvent('user.created', payload, fakeUserModel);

  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][1], {
    _id: 'user_123',
    email: 'jane@example.com',
    username: 'Jane Doe',
    image: 'https://example.com/avatar.png',
  });
});
