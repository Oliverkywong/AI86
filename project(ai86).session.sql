SELECT * FROM users where email='abc@gmail.com'

SELECT player_id FROM users ORDER BY player_id DESC LIMIT 1
SELECT player_id FROM users ORDER BY player_id LIMIT 1
SELECT player_id FROM users ORDER BY player_id DESC LIMIT 1
SELECT player_id FROM users ORDER BY player_id DESC

INSERT INTO users (player_id, name, email, password) VALUES (1009,'oliver','asf@fsa','0001')

SELECT * FROM users WHERE email = 'abc@gmail.com'

SELECT * FROM leaderboard ORDER BY racetime LIMIT 10

SELECT player_id, min(racetime) FROM leaderboard GROUP BY player_id ORDER BY min(racetime) LIMIT 10 
