install:
	npm ci

lint:
	npm run lint

test:
	npm run test

build:
	npm run build

SERVICE=fpn-gql

DOCKER_REGISTRY=freemiumvpn
DOCKER_CONTAINER_NAME=$(SERVICE)
DOCKER_REPOSITORY=$(DOCKER_REGISTRY)/$(DOCKER_CONTAINER_NAME)
SHA8=$(shell echo $(GITHUB_SHA) | cut -c1-8)

docker-image:
	docker build --rm \
		--build-arg SERVICE=$(SERVICE) \
		--tag $(DOCKER_REPOSITORY):local \
		.

ci-docker-auth:
	@echo "${DOCKER_PASSWORD}" | docker login --username "${DOCKER_USERNAME}" --password-stdin


ci-docker-build:
	@docker build --rm \
		--build-arg SERVICE=$(SERVICE) \
		--tag $(DOCKER_REPOSITORY):$(SHA8) \
		--tag $(DOCKER_REPOSITORY):latest .

ci-docker-push: ci-docker-auth
	docker tag $(DOCKER_REPOSITORY):$(CIRCLE_SHA1) $(DOCKER_REPOSITORY):latest
	docker push $(DOCKER_REPOSITORY)

ci-docker-build-push: ci-docker-build
	@docker push $(DOCKER_REPOSITORY):$(SHA8)
	@docker push $(DOCKER_REPOSITORY):latest
