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

INSERT INTO status
    (value)
VALUES
    ("Open"),
    ("Closed"),
    ("Rejected"),
    ("Canceled"),
    ("Completed")
;

INSERT INTO positions
    (title, abbrev, status_id)
VALUES
    ("Director of Nursing", "DON",2),
    ("Part-time Registered Nurse", "PRN",1),
    ("Certified Nursing Assistant", "CNA", 1)
;

UPDATE users SET admin = 1 WHERE user_id = 1;