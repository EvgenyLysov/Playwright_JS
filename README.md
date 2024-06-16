Unfortunately, I had to resort to extra steps to get the database to work. Specifically, I performed the following algorithm to get into the database via docker exec:
1. Open and edit /etc/my.cnf
2. Add skip-grant-tables
3. Restart MySQL container
4. Log in to MySQL using the command mysql -u root -p
5. Run mysql> flush privileges;
6. ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword';
7. Go back to /etc/my.cnf and remove skip-grant-tables
8. Restart MySQL
9. Login with the new password mysql -u root -p

This was not enough to use my container with the mysql2 library, so I created a new user with super rights with the following commands:
1. use mysql
2. CREATE USER 'newuser'@'%' IDENTIFIED BY 'newpassword';
3. GRANT ALL PRIVILEGES ON adminjs.* TO 'newuser'@'%';
4. FLUSH PRIVILEGES;

=======================================================================

**If I had more time, I would:**
1. Create a test object generator based on name arrays and email domains with a 5 digit postfix
2. Add a logger with different logging levels
3. Put timeouts and other values in the configuration
4. use Playwright-specific locators
5. Do CI-agnostic reporting using ReportPortal
6. Cover the test cases described below
7. Add suits for tests
8. Move all credentials to env variables


**Possible Tests**

**Suite: Publisher**
1) Create publisher
2) Delete publisher
3) Delete publisher with existing profile
4) Create publisher without any data entered

**Suite: Profile**
1) Create profile
2) Create profile without publisher
3) Delete profile with existing post
4) Create profile without any data entered

**Suite: Post**
1) Create post in `ACTIVE/REMOVED` status
2) Create post `with/without` attached json
3) Create post without publisher
4) Delete post
5) Create post without any data entered

**Other**
1) Check filter functionality
2) Breadcrumbs navigation
3) Localization testing
4) Log Out
5) Sign In

