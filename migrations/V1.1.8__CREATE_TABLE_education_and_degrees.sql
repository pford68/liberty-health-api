CREATE TABLE degrees (
    degree_id INT NOT NULL AUTO_INCREMENT,
    value VARCHAR(255) NOT NULL,
    PRIMARY KEY (degree_id)
);

CREATE TABLE education (
    school_id INT NOT NULL AUTO_INCREMENT,
    applicant_id INT NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    city varchar(255),
    state varchar(255),
    country varchar(255),
    degree_id INT NOT NULL,
    PRIMARY KEY (school_id),
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id),
    FOREIGN KEY (degree_id) REFERENCES degrees(degree_id)
)