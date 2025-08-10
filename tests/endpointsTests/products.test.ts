import { test, expect } from '@playwright/test';

let response;
let body;
const pathEndpoint = '/products'

test('Should get all products', async({request}) => {
    response = await request.get(pathEndpoint);
    expect (response.status()).toBe(200);
    body = await response.json();
    expect(body[1].id).toBeGreaterThan(0);
    expect(body[1].category).toContain('meat-seafood');
    expect(body[1].inStock).toBe(true);
});

test('Should get products by category', async({request}) => {
    const queryParams = new URLSearchParams({ category: 'bread-bakery' });
    const paramsAsString = queryParams.toString();
    response = await request.get(`${pathEndpoint}?${paramsAsString}`);
    expect (response.status()).toBe(200);
    body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[1].id).toBeGreaterThan(0);
    expect(body[0].name).not.toBe('');
});

test('Should get products by status available = true', async({request}) => {
const queryParams = new URLSearchParams({ available: 'true' });
    const paramsAsString = queryParams.toString();
    response = await request.get(`${pathEndpoint}?${paramsAsString}`);
    expect (response.status()).toBe(200);
    body = await response.json();
    console.log(body);
    expect(body.length).toBeGreaterThan(0);
    expect(body[1].id).toBeGreaterThan(0);   
});

test('Should get products by status available = false', async({request}) => {
const queryParams = new URLSearchParams({ available: 'false' });
    const paramsAsString = queryParams.toString();
    response = await request.get(`${pathEndpoint}?${paramsAsString}`);
    expect (response.status()).toBe(200);
    body = await response.json();
    console.log(body);
    expect(body.length).toBeGreaterThan(0);
    expect(body[1].id).toBeGreaterThan(0);  
    expect(body[1].name).toBe('Flour Tortillas')
});

test('Should throw an error when passing invalid product category', async({request}) => {
    const queryParams = new URLSearchParams({ category: 'ice-cream' });
    const paramsAsString = queryParams.toString();
    response = await request.get(`${pathEndpoint}?${paramsAsString}`);
    expect (response.status()).toBe(400);
    body = await response.json();
   const errorMessage = body.error; 
    expect(errorMessage).not.toBe('');
    // expect(body[1].id).toBeGreaterThan(0);
    // expect(body[0].name).not.toBe('');
})

