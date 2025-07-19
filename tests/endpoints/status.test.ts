import {test, expect} from '@playwright/test';

test('Should verify the status of the app', async({request}) => {
    const response = await request.get('/status');
    expect (response.status()).toBe(200);
    const body = await response.json();
    expect (body.status).toBe('UP');
});