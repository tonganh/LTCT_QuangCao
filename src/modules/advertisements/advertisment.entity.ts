import { Entity, Column } from "typeorm";
import { AbstractEntity } from "../../common/entity/abstract.entity";
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: "advertisement" })
export class Advertisement extends AbstractEntity {
  @Column({ name: "title", type: "varchar", nullable: true, default: null })
  @ApiProperty({ description: "Tiêu đề của quảng cáo", default: "Quảng cáo về TNA" })
  title: string;

  @Column({ name: "content", type: "varchar", nullable: true, default: null })
  @ApiProperty({ description: "Nội dung của quảng cáo", default: "học LTCT thật fun:)" })
  content: string;

  @Column({
    name: "advertisment_url",
    type: "varchar",
    nullable: true,
    default: null,
  })
  @ApiProperty({ description: "Đường link muốn trích dẫn vào quảng cáo" })
  advertismentUrl: string;

  @Column({ name: "image_url", type: "varchar", nullable: true, default: null })
  @ApiProperty({ description: "Ảnh của quảng cáo" })
  imageUrl: string;

  //   Thể loại: Sản phẩm / khuyến mãi / …
  @Column({ name: "type", type: "varchar", nullable: true, default: null })
  @ApiProperty({ description: "Loại quảng cáo mong muốn" })
  type: string;

  @Column({
    name: "advertising_display_type",
    type: "varchar",
    nullable: true,
    default: null,
  })
  @ApiProperty({ description: "Loại quảng cáo hiển thị, mockup balbal" })
  advertisingDisplayType: string;

  @Column({
    name: "advertisement_position",
    type: "varchar",
    nullable: true,
    default: null,
  })
  @ApiProperty({ description: "Vị trí muốn setup quảng cáo" })
  advertisementPosition: string;

  @Column({
    name: "status",
    type: "varchar",
    nullable: true,
    default: null,
  })
  @ApiProperty({ description: "Trạng thái của quảng cáo" })
  status: string;

  @Column({ name: "access_number", default: 0, type: "integer" })
  @ApiProperty({ description: "Số lượt truy cập vào quảng cáo" })
  accessNumber: number;

  @Column({ name: "start_at", type: "timestamp" })
  @ApiProperty({ description: "Ngày bắt đầu chạy quảng cáo" })
  startAt: Date;

  @Column({ name: "end_at", type: "timestamp" })
  @ApiProperty({ description: "Ngày bắt đầu chạy quảng cáo" })
  endAt: Date;
}
