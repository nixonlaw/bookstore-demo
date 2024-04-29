import request from 'supertest'
import server from '../src/index'
import { IBook } from '../interface/book';

let cookies: string[] = [];

describe('GET /book/list', () => {
  it('should return 200 & array', async () => {
    const response = await request(server).post(`/book/list`);
    expect(response.body.message.every((book: IBook)=>Array.isArray(book.authors) && Array.isArray(book.categories))).toBe(true);
  })
});

describe('GET /user', () => {
  it('should return 401 (before login)', async () => {
    const response = await request(server).get(`/user`);
    expect(response.status).toBe(401);
  })
})

describe('POST /login', () => {
  it('should 200', async () => {
    const response = await request(server).post(`/user/login`).send({username: 'buyer1', password: '1234'});
    cookies = <string[]><unknown>response.headers['set-cookie'];
    console.log(cookies)
    expect(response.status).toBe(200);
  })
})

describe('GET /user', () => {
  it('should return 200 (after login with session-cookies)', async () => {
    const response = await request(server).get(`/user`).set('Cookie', cookies);
    expect(response.status).toBe(200);
  })
})