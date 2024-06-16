function generateRandomString() {
    return Math.floor(Math.random() * 10000);
}

exports.Data = class Data {
    constructor() {
        this.baseUrl = "http://localhost:3000";
        this.testUser = {email: "admin@example.com", password: "password"};
        this.testPublisher = {name:`name_${generateRandomString()}`, email: `email_${generateRandomString()}@mail.com`, password: "password"}
        this.testProfile = {bio: `bio_${generateRandomString()}`, publisher: this.testPublisher};
    }

}