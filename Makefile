init:
	cd backend && npm i && cd ../frontend && rm -f ./frontend/node_modudels && npm i && cd .. && docker compose build && docker compose up

build:
	cd backend && npm i && cd ../frontend && npm i && cd .. && docker compose build

start:
	docker compose up

stop:
	docker compose stop

down:
	docker compose down

migration:
	docker compose exec server node migrate.js

migration-force:
	docker compose exec server node migrate-force.js