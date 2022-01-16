/*
 Navicat Premium Data Transfer

 Source Server         : ltct-net
 Source Server Type    : PostgreSQL
 Source Server Version : 130004
 Source Host           : 125.212.235.135:5434
 Source Catalog        : ltct
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130004
 File Encoding         : 65001

 Date: 16/01/2022 22:12:17
*/


-- ----------------------------
-- Sequence structure for advertisement_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."advertisement_id_seq";
CREATE SEQUENCE "public"."advertisement_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for custormers_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."custormers_id_seq";
CREATE SEQUENCE "public"."custormers_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for advertisement
-- ----------------------------
DROP TABLE IF EXISTS "public"."advertisement";
CREATE TABLE "public"."advertisement" (
  "id" int4 NOT NULL DEFAULT nextval('advertisement_id_seq'::regclass),
  "title" varchar COLLATE "pg_catalog"."default",
  "content" varchar COLLATE "pg_catalog"."default",
  "advertisment_url" varchar COLLATE "pg_catalog"."default",
  "image_url" varchar COLLATE "pg_catalog"."default",
  "type" varchar COLLATE "pg_catalog"."default",
  "advertising_display_type" varchar COLLATE "pg_catalog"."default",
  "status" varchar COLLATE "pg_catalog"."default",
  "advertisement_position" varchar COLLATE "pg_catalog"."default",
  "access_number" int4 NOT NULL DEFAULT 0,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "start_at" timestamp(6) NOT NULL,
  "end_at" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of advertisement
-- ----------------------------
INSERT INTO "public"."advertisement" VALUES (7, 'Quảng cáo sale 20-10', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 7, '2021-12-19 08:23:12.105299', '2021-12-19 08:23:26.278233', '2021-12-09 00:00:00', '2021-12-25 23:59:59');
INSERT INTO "public"."advertisement" VALUES (9, 'Quảng cáo sale 20-10', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 9, '2021-12-19 08:23:12.105299', '2021-12-19 08:23:26.278233', '2021-12-09 00:00:00', '2021-12-25 23:59:59');
INSERT INTO "public"."advertisement" VALUES (10, 'Quảng cáo sale Black Friday', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 10, '2021-12-19 15:59:55.047449', '2021-12-19 15:59:55.047449', '2021-12-08 00:00:00', '2021-12-30 23:59:59');
INSERT INTO "public"."advertisement" VALUES (8, 'Quảng cáo sale Black Friday', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 9, '2021-12-19 15:59:55.047449', '2021-12-27 07:55:40.743926', '2021-12-08 00:00:00', '2021-12-30 23:59:59');
INSERT INTO "public"."advertisement" VALUES (11, 'xin chao toi den tu trai dat', 'hahahasdhhasdf', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 2, '2022-01-10 10:23:43.181753', '2022-01-10 10:25:07.511238', '2022-01-01 00:00:00', '2022-01-11 23:59:59');
INSERT INTO "public"."advertisement" VALUES (13, 'xin chao toi den tu trai dat', 'hahahasdhhasdf', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 0, '2022-01-16 14:35:26.542865', '2022-01-16 14:35:26.542865', '2021-12-08 00:00:00', '2021-12-08 23:59:59');
INSERT INTO "public"."advertisement" VALUES (6, 'Quảng cáo sale Black Friday', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 6, '2021-12-19 15:59:55.047449', '2021-12-19 15:59:55.047449', '2021-12-08 00:00:00', '2021-12-30 23:59:59');
INSERT INTO "public"."advertisement" VALUES (1, 'Sale chúc mừng Vi', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 1, '2021-12-19 08:21:57.92783', '2021-12-19 08:21:57.92783', '2021-12-08 00:00:00', '2021-12-09 23:59:59');
INSERT INTO "public"."advertisement" VALUES (2, 'Sale chúc mừng sinh nhật', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 2, '2021-12-19 08:22:06.826481', '2021-12-19 08:22:06.826481', '2021-12-09 00:00:00', '2021-12-10 23:59:59');
INSERT INTO "public"."advertisement" VALUES (3, 'Quảng cáo sale 20-10', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 3, '2021-12-19 08:23:12.105299', '2021-12-19 08:23:26.278233', '2021-12-09 00:00:00', '2021-12-25 23:59:59');
INSERT INTO "public"."advertisement" VALUES (4, 'Quảng cáo sale Black Friday', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 4, '2021-12-19 15:59:55.047449', '2021-12-19 15:59:55.047449', '2021-12-08 00:00:00', '2021-12-30 23:59:59');
INSERT INTO "public"."advertisement" VALUES (5, 'Quảng cáo sale 20-10', 'Sale sốc', 'https://www.facebook.com/chemistryismylove/', 'https://minio.hisoft.com.vn/qr-scan/214341604_2237957043012540_977929668598209155_n.jpg', 'quang_cao', 'mock_up', 'activated', 'header', 5, '2021-12-19 08:23:12.105299', '2021-12-19 08:23:26.278233', '2021-12-09 00:00:00', '2021-12-25 23:59:59');

-- ----------------------------
-- Table structure for custormers
-- ----------------------------
DROP TABLE IF EXISTS "public"."custormers";
CREATE TABLE "public"."custormers" (
  "id" int4 NOT NULL DEFAULT nextval('custormers_id_seq'::regclass),
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "receive_email" bool NOT NULL
)
;

-- ----------------------------
-- Records of custormers
-- ----------------------------
INSERT INTO "public"."custormers" VALUES (1, '2021-12-26 02:25:59.618065', '2021-12-26 02:25:59.618065', 'tongngocanh', 'anh.tndev40@gmail.com', 't');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "timestamp" int8 NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO "public"."migrations" VALUES (1, 1631777491696, 'Roles1631777491696');
INSERT INTO "public"."migrations" VALUES (2, 1632194572797, 'User1632194572797');
INSERT INTO "public"."migrations" VALUES (3, 1637929205334, 'Advertisement1637929205334');
INSERT INTO "public"."migrations" VALUES (4, 1637931728165, 'Advertisement1637931728165');
INSERT INTO "public"."migrations" VALUES (5, 1638893939827, 'Advertisement1638893939827');
INSERT INTO "public"."migrations" VALUES (6, 1638894852413, 'Advertisement1638894852413');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "key" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL DEFAULT now(),
  "updated_at" timestamptz(6) NOT NULL DEFAULT now()
)
;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES ('ADMIN', 'ADMIN', '2021-11-26 12:47:34.623462+00', '2021-11-26 12:47:34.623462+00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "deleted_by" int4,
  "full_name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "role_key" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "salt" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "is_blocked" bool NOT NULL DEFAULT false,
  "blocked_at" timestamptz(6),
  "blocked_by" int4,
  "created_at" timestamp(6) NOT NULL DEFAULT now(),
  "updated_at" timestamp(6) NOT NULL DEFAULT now(),
  "deleted_at" timestamp(6)
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, NULL, 'Tong Ngoc Anh', 'anh.tndev40@gmail.com', 'anhtn', '$2a$10$XlE3AQ/6QhSsY5iR9.D7AuWesG/oTHrI1TdBU/cc/J/Jzvdgxr4XW', 'ADMIN', '$2a$10$XlE3AQ/6QhSsY5iR9.D7Au', 'f', NULL, NULL, '2021-12-08 03:41:10.752321', '2021-12-08 03:41:10.752321', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."advertisement_id_seq"
OWNED BY "public"."advertisement"."id";
SELECT setval('"public"."advertisement_id_seq"', 14, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."custormers_id_seq"
OWNED BY "public"."custormers"."id";
SELECT setval('"public"."custormers_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 2, false);

-- ----------------------------
-- Primary Key structure for table advertisement
-- ----------------------------
ALTER TABLE "public"."advertisement" ADD CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table custormers
-- ----------------------------
ALTER TABLE "public"."custormers" ADD CONSTRAINT "PK_15ff28e7878a20c81e19e4857f1" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "PK_a87cf0659c3ac379b339acf36a2" PRIMARY KEY ("key");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "FK_de5e5fef3da71109fe3186c7f1a" FOREIGN KEY ("blocked_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
