IMAGE=git.hisoft.com.vn:5050/haso/core-api


all: build push

build:
	docker build -t $(IMAGE) .
push:
	docker push $(IMAGE)
