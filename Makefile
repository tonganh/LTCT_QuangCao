IMAGE=git.hisoft.com.vn:5050/anhtn/ltct


all: build push

build:
	docker build -t $(IMAGE) .
push:
	docker push $(IMAGE)
