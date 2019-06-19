.PHONY: build run destroy restart logs help
.DEFAULT_GOAL := help
default: help

##@ Development
build: ## Build development environment
	@docker-compose build

run: ## Run development environment
	@docker-compose up -d

destroy: ## Stop development environment
	@docker-compose down

restart: ## Restart development environment
	@docker-compose restart

logs: ## Get development logs
	@docker-compose logs -f --tail=20

##@ Help
help: ## Available commands
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m[target]\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
