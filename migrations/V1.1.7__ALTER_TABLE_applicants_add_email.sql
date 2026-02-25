ALTER TABLE applicants
ADD email varchar(255) UNIQUE NOT NULL,
ADD phone varchar(12) NOT NULL
;