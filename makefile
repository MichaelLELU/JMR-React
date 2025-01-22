
clean:
	docker system prune -af --volumes

dev:
	docker compose -f compose.dev.yaml up -d --build
