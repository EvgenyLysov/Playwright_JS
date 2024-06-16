
const SQL_QUERIES = {
    CREATE_PUBLISHERS: (publisher)=> `insert into Publisher (email, name) values ('${publisher.email}', '${publisher.name}')`,
    GET_PUBLISHER_ID: (publisher) => `select id from Publisher where email='${publisher.email}'`,
    DELETE_PROFILE: 'delete from Profile',
    DELETE_PUBLISHER: 'delete from Publisher',
    CREATE_PROFILE: (profile, publisherID) => `insert into Profile (bio, publisherId) values ('${profile.bio}', '${publisherID}')`,
    CREATE_POST: (post) => `insert into Post (updatedAt, title, content, status, published, publisherId) values(CURDATE(), ${post.title}, ${post.content}, ${post.status}, ${post.isPublished}, ${post.publisher.id});`
};

module.exports = SQL_QUERIES;