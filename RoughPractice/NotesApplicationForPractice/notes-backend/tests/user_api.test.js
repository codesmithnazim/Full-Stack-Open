import mongoose from 'mongoose'
import {test, after, describe, beforeEach} from 'node:test'
import supertest from 'supertest'
import { app } from '../app.js'
const api= supertest(app)


describe('CRUD operations on users', () => { 
    test('Users creations ',async () => {
      const userObj= {
        name:"johnDoe",
        password:"1232(&^^^%#$#@^38~!232fhgfhf./,.'l'8",
        email:"johnDoe1@gmail.com",
        notes:'6a871f013799ccd479e4e1e7'
      }

      const newUser = await api.post('/api/users').send(userObj).expect(201).expect('Content-Type',/application\/json/)
      
    })
 })

 after(async () => {
    await mongoose.connection.close()
 })