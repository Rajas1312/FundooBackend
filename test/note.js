let chai = require("chai");
let chaiHttp = require("chai-http");
const user = require("../app/models/user");

let server = require("../server");
chai.use(chaiHttp);
const userData = require("./note.json");
chai.should();

describe("POSTnotes", () => {
    it("givenNOtes_whenGivenProperData_shouldSaveNotes", (done) => {
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
    it("givenNotes_whenGivenProperData_shouldSaveNotes", (done) => {
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

describe("GET /notes", () => {
    // test the GET API when points are proper
    it("givennotes_WhenGivenProperEndPoints_ShouldReturnObject", (done) => {
        console.log("getting all data .");
        const token = userData.notes.properToken
        chai
            .request(server)
            .get("/notes")
            .set("Authorization", token)
            .end((err, res) => {
                res.should.be.a("Object")
                done();
            });
    });

    // test the GET API when points are not proper
    it("givennotes_WhenNotGivenProperEndPoints_ShouldNotReturnObject", (done) => {
        const token = userData.notes.properToken;
        chai
            .request(server)
            .get("/notes")
            .set("Authorization", token)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});

/**
    * @description Test the PUT API using Id
    */
describe("/PUT  /notes/:noteId", () => {
    // test the PUT API when provided proper Id
    it("givennotes_WhenGivenProperId_ShouldUpdateNote", (done) => {
        const noteId = userData.notes.noteToUpdate.noteId;
        const note = userData.notes.noteToUpdate;
        const token = userData.notes.properToken
        chai
            .request(server)
            .put("/notes/:noteId" + noteId)
            .set("Authorization", token)
            .send(note)

            .end((err, res) => {
                res.body.should.be.a("Object");
                done();
            });
    });
    // test the PUT API when provided improper Id
    it("givennotes_WhenGivenImropertitle_ShouldNotUpdateNote", (done) => {
        const noteId = userData.notes.notesWithoutTitle.noteId;
        const note = userData.notes.notesWithoutTitle;
        const token = userData.notes.properToken
        chai
            .request(server)
            .put("/notes/:noteId" + noteId)
            .set("Authorization", token)
            .send(note)

            .end((err, res) => {
                res.should.have.status(401);

                done();
            });
    });

    describe("DELETE /notes/deleteforever/noteID", function () {
        it("givennotes_WhenGivenProperId_ShouldDelete_note", (done) => {
            const noteID = userData.notes.noteToDelete.noteId;
            const token = userData.notes.properToken
            chai
                .request(server)
                .delete("/notes/" + noteID)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.be.a("Object");
                    done();
                });
        });

        it("givennotes_WhenNotGivenProperId_ShouldNotDelete_note", (done) => {
            const noteID = 144;
            const token = userData.notes.properToken
            chai
                .request(server)
                .delete("/notes/" + noteID)
                .set("Authorization", token)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

})

