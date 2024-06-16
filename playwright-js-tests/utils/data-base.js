const mysql = require('mysql2/promise');

export async function query(query) {
    const connectionConfig = {
        host: 'localhost',
        user: 'newuser',      // Новый пользователь
        password: 'newpassword', // Новый пароль
        database: 'adminjs',
        port: 3306
    };

    let connection;

    try {
        connection = await mysql.createConnection(connectionConfig);
        const [rows] = await connection. execute(query);
        return rows;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
