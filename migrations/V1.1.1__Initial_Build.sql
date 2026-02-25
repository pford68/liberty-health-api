CREATE TABLE positions (
    position_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY (position_id)
);

CREATE TABLE status (
     status_id INT NOT NULL AUTO_INCREMENT,
     value VARCHAR(20) NOT NULL,
     PRIMARY KEY (status_id)
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    date_created DATE NOT NULL,
    last_login DATE NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT CHK_Email CHECK (email LIKE '%@libertycare.health')
);

CREATE TABLE applicants (
    applicant_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position_id INT NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY (applicant_id),
    FOREIGN KEY (position_id) REFERENCES positions (position_id),
    FOREIGN KEY (status_id) REFERENCES status (status_id)
);

CREATE TABLE job_references (
    ref_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    applicant_id INT NOT NULL,
    PRIMARY KEY (ref_id),
    FOREIGN KEY (applicant_id) REFERENCES applicants (applicant_id)
);

CREATE TABLE job_history (
    job_id INT NOT NULL AUTO_INCREMENT,
    applicant_id INT,
    title VARCHAR(50) NOT NULL,
    company VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    reason_ended VARCHAR(255) NOT NULL,
    supervisor VARCHAR(255),
    phone VARCHAR(12) NOT NULL,
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    PRIMARY KEY (job_id),
    FOREIGN KEY (applicant_id) REFERENCES applicants (applicant_id)
);

