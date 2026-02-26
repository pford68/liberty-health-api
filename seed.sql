INSERT INTO users
    (
     user_name,
     email,
     date_created,
     password
    )
VALUES
    (
     "paford",
     "paford@libertycare.health",
     NOW(),
     "$2b$12$UVz/nYuq6rEvrq1Q1EuvyuhJICsU4ZsKqJzLUKrY.cmOTxbQDtp5."
    )
;

INSERT INTO users
(
    user_name,
    email,
    date_created,
    password
)
VALUES
    (
        "afeh",
        "afeh@libertycare.health",
        NOW(),
        "$2b$12$LpgNjQmr4Hz88u5u8Gq34e6Bit8mIEbh0Y.5EUIoRFfP2jyUCvteO"
    )
;


INSERT INTO status
(value)
VALUES
    ("Open"),
    ("Closed"),
    ("Rejected"),
    ("Canceled"),
    ("Completed")
;

INSERT INTO license_types
(value)
VALUES
    ("RN"),
    ("CNA"),
    ("CMT")
;

INSERT INTO positions
(title, abbrev, status_id)
VALUES
    ("Director of Nursing", "DON",2),
    ("Registered Nurse", "RN",1),
    ("Certified Nursing Assistant", "CNA", 1),
    ("Coordinator", null, 1),
    ("Office Manager", "HR", 1)
;


INSERT INTO applicants
(
    first_name,
    last_name,
    position_id,
    status_id,
    email,
    phone
)
VALUES
    (
        "Luka",
        "Doncic",
        2,
        1,
         "ldoncic@gmail.com",
        "469-444-9012"
    )
;

UPDATE users SET admin = 1 WHERE user_id = 1;