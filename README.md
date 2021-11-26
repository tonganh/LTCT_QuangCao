# BASE-NESTJS

Hướng dẫn cài đặt base-nestjs

## Installation

#### Tạo Folder Config:

```bash
cp -R config-example/ config/
```

#### Tạo TypeORM Config:

File dùng để chạy Migration qua TypeORM CLI

```bash
cp ormconfig.json ormconfig.json
```

_Đối với MacOS: host của Postgres nếu chạy ở network bridge mặc định sẽ là_ **host.docker.internal**

\_Đổi tên image build trong Makefile và Dockercompose là ok.

#### Cài đặt môi trường dev

```bash
yarn install
```

### build image:

```bash
make build
```

### push image:

```bash
make push
```

### after build auto push to hub:

```bash
make all
```

```
Quy trình chạy project:
Setup DB postgres, cài môi trường NODEJS
Thực hiện các thay đổi ghi phía trên. Sau đó RUN
Vì lq 1 số vấn đề bảo mâpj nên k update all biến môi trường.
Thanks
```
