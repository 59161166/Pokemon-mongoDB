const request = require('supertest')
const chai = require('chai')

const app = require('../app')
chai.should()
//https://www.chaijs.com/
describe('Pokemon API', () => {
    describe('GET /', () => {
        it('should return 200 ok with "Hello world"', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, res) => {
                    res.body.should.deep.equal({
                        Message: 'Hello world'
                    })
                    done()
                })
        })
    })
    describe('GET /pokemon/:id', () => {
        it('should return 200 ok with pokemon object', (done) => {
            request(app).get('/pokemon/1')
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.an('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('primaryType')
                    res.body.should.have.property('secondaryType')
                    done()
                })
        })
        it('should return 400 Bad Request', (done) => {
            request(app).get('/pokemon/99')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.deep.equal('Pokemon is not found')
                    done()
                })
        })
    })
    describe('POST /pokemon', () => {
        it('should return 201 Created and have new pokemon', (done) => {
            request(app).post('/pokemon')
                .type('form')
                .send({
                    'name': 'Jimmy',
                    'primaryType': 'Grass'
                })
                .expect(201, done)
        })
        it('should return 400 Bad Request and when missed required field', (done) => {
            request(app).post('/pokemon')
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.deep.equal('Insufficient parameters : name and primaryType are required parameter')
                    done()
                })
        })
    })
    describe('PUT /pokemon', () => {
        it('should return 200 OK and pokemon have secondaryType', (done) => {
            request(app).put('/pokemon/1')
                .type('form')
                .send({
                    'secondaryType': 'Grass'
                })
                .expect(200, done)
        })
        it('should return 400 Bad Request when try to update not existed pokemon', (done) => {
            request(app).put('/pokemon/99')
                .type('form')
                .send({
                    'secondaryType': 'Grass'
                })
                .expect(400)
                .end((err, res) => {
                    res.body.error.should.deep.equal('Pokemon is not found')
                    done()
                })
        })
    })
})

describe('Integration test',()=>{
    it('GET /pokemons should return list of pokemons',(done)=>{
        request('http://localhost:3000')
        .get('/pokemons')
        .expect(200)
        .end((err, res) => {
            res.body.should.be.an('array')
            done()
        })
    })
})