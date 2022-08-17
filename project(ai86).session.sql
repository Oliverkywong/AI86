SELECT * FROM users where email='abc@gmail.com'

SELECT player_id FROM users ORDER BY player_id DESC LIMIT 1
SELECT player_id FROM users ORDER BY player_id LIMIT 1
SELECT player_id FROM users ORDER BY player_id DESC LIMIT 1
SELECT player_id FROM users ORDER BY player_id DESC

INSERT INTO users (player_id, name, email, password) VALUES (1009,'oliver','asf@fsa','0001')

SELECT * FROM users WHERE email = 'abc@gmail.com'

SELECT * FROM leaderboard ORDER BY racetime LIMIT 10

SELECT player_id,map,car_id, min(racetime) as racetime FROM leaderboard GROUP BY player_id, map,car_id ORDER BY min(racetime) LIMIT 10 


SELECT player_id,name,map,car_id, min(racetime) as racetime FROM leaderboard INNER JOIN users ON leaderboard.player_id=users.id GROUP BY player_id,name, map,car_id ORDER BY min(racetime) LIMIT 10 


INSERT INTO leaderboard (player_id,map,car_id,racetime) VALUES (1009,'map1',10,'0m10s63')

SELECT player_id,map,car_id,name, min(racetime) as racetime FROM leaderboard GROUP BY player_id, map,car_id,name ORDER BY min(racetime) LIMIT 10 