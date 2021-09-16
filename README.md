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

#### Cài đặt môi trường dev

```bash
yarn install
```
