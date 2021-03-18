let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../server");
chai.use(chaiHttp);
const userData = require("./user.json");
chai.should();

describe("user", () => {
    it("givenUser_whenGivenProperData_shouldSaveUser", (done) => {
        let userInfo = userData.user.createUser;
        console.log("userInfo: " + userInfo);
        chai
            .request(server)
            .post("/user")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("givenUser_whenGivenDuplicateData_shouldNotSaveUser", (done) => {
        let userInfo = userData.user.createUser;
        chai
            .request(server)
            .post("/user")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

})

describe("Login", () => {
    it("givenUser_whenGivenProperData_shouldRespondsWithJson", (done) => {
        let userInfo = userData.user.loginUser;
        chai
            .request(server)
            .post("/login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("givenUser_whenGivenImProperData_shouldRespondsWithJson", (done) => {
        let userInfo = userData.user.loginImproperUser;
        chai
            .request(server)
            .post("/login")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
})

describe("ForgotPassword", () => {
    it("givenUser_whenGivenProperData_shouldRespondsWithemail", (done) => {
        let userInfo = userData.user.forgotPasswordProperData;
        chai
            .request(server)
            .post("/forgotpassword")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("givenUser_whenGivenImproperData_shouldNotRespondsWithLink", (done) => {
        let userInfo = userData.user.forgotPasswordImproperEmail;
        chai
            .request(server)
            .post("/forgotpassword")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    })
});

describe("Resetpassword", () => {
    it("givenUser_whenGivenPropertoken_shouldResetPassword", (done) => {
        let userInfo = userData.user.resetPasswordProperToken;
        chai
            .request(server)
            .post("/resetpassword")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("givenUser_whenGivenPropertoken_shouldResetPassword", (done) => {
        let userInfo = userData.user.resetPasswordImProperToken;
        chai
            .request(server)
            .post("/resetpassword")
            .send(userInfo)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

})