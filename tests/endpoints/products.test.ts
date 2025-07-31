import { test, expect } from '@playwright/test';

test('Should get all products', async({request}) => {
    const response = await request.get('/products');
    expect (response.status()).toBe(200);
    const body = await response.json();
    console.log(body[1]);
    expect(body[1].id).toBeGreaterThan(0);
    expect(body[1].category).toContain('meat-seafood');
    expect(body[1].inStock).toBe(true);
})