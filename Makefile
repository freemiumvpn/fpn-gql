install:
	npm ci

lint:
	npm run lint

test:
	npm run test

build:
	npm run build

# ----- Protos -----
CONTRACTS_DIR=$(shell pwd)/contracts
GENERATED_BUILD_DIR=$(shell pwd)/src/generated/grpc

protos:
	mkdir -p $(GENERATED_BUILD_DIR)/vpn

	npx grpc_tools_node_protoc \
		--proto_path=$(CONTRACTS_DIR)/fpn-contracts/vpn \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
		--js_out=import_style=commonjs,binary:$(GENERATED_BUILD_DIR)/vpn \
		--ts_out=generate_package_definition:$(GENERATED_BUILD_DIR)/vpn \
		--grpc_out=grpc_js:$(GENERATED_BUILD_DIR)/vpn \
		$(CONTRACTS_DIR)/fpn-contracts/vpn/*.proto

# ----- CI -----

SERVICE=fpn-gql

DOCKER_REGISTRY=freemiumvpn
DOCKER_CONTAINER_NAME=$(SERVICE)
DOCKER_REPOSITORY=$(DOCKER_REGISTRY)/$(DOCKER_CONTAINER_NAME)
SHA8=$(shell echo $(GITHUB_SHA) | cut -c1-8)

docker-image:
	docker build --rm \
		--tag $(DOCKER_REPOSITORY):local \
		.

ci-docker-auth:
	@echo "${DOCKER_PASSWORD}" | docker login --username "${DOCKER_USERNAME}" --password-stdin


ci-docker-build:
	@docker build --rm \
		--tag $(DOCKER_REPOSITORY):$(SHA8) \
		--tag $(DOCKER_REPOSITORY):latest .

ci-docker-push: ci-docker-auth
	docker tag $(DOCKER_REPOSITORY):$(CIRCLE_SHA1) $(DOCKER_REPOSITORY):latest
	docker push $(DOCKER_REPOSITORY)

ci-docker-build-push: ci-docker-build
	@docker push $(DOCKER_REPOSITORY):$(SHA8)
	@docker push $(DOCKER_REPOSITORY):latest
