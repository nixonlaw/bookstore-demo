const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;


describe('Test /health', () => {
    before('before', ()=>{

    });

    after('after', ()=>{

    })
    
    describe('Should login as Buyer1', () => {
        it('should return "Hello, World!"', (done) => {
            chai
            .request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Hello, World!');
                done();
            });
        }); 
    });
});