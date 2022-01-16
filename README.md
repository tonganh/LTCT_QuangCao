# BASE-NESTJS

Hướng dẫn cài đặt base-nestjs

## Installation

#### Tạo Folder Config:

```bash
cp -R config-example/ config/
```

```
Bạn cần có 1 số lưu ý sau khi cài đặt môi trường:
file default.yml: chỉnh sửa 1 số thông tin như type - loại DB b dùng, recommend sdung postgresql. port kết nối với db, tên db b muốn sdung.
file development.yml: chỉnh sửa các thông tin như db_host blablal ....
phần MinIO vì b không cần sdung chức năng upload ảnh nên không cần phải quan tâm.

Import data trong file ltct.sql vào CSDL -> sdung. Vì nếu không sẽ kbiet cách đăng nhập admin + sdung.
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

#### Để chạy ứng dụng:

```bash
yarn start:dev
Hoặc:
yarn start
Ứng dụng mặc định chạy ở http://localhost:3000
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
