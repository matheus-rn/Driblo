build:
	docker-compose build

run:
	docker-compose up

run-d:
	docker-compose up -d

down:
	docker-compose down

fix:
	docker-compose exec driblo yarn eslint --fix src --ext .js
