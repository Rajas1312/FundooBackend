let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../server");
chai.use(chaiHttp);
const userData = require("./note.json");
chai.should();

describe("user", () => {
    it("givenUser_whenGivenProperData_shouldSaveUser", (done) => {
        let userInfo = userData.notes.createNotes;
        let token = userData.notes.properToken
        chai
            .request(server)
            .post("/notes")
            .set('Authorization', token)
            .send(userInfo)
            .end((err, res) => {
                res.body.should.be.a("object");
                done();
            });
    });
    it("givenUser_whenGivenProperData_shouldSaveUser", (done) => {
        let userInfo = userData.notes.notesWithoutTitle;
        let token = userData.notes.properToken
        chai
            .request(server)
            .post("/notes")
            .set('Authorization', token)
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a("object");
                done();
            });
    });


})