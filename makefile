
clean:
	docker system prune -af --volumes

dev:
	docker compose -f compose.dev.yaml up -d --build

skibidi:
	git add . && git commit -m "Meh." && git push

