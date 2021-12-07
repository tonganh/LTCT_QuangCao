import { Entity, Column } from "typeorm";
import { AbstractEntity } from "../../common/entity/abstract.entity";
@Entity({ name: "advertisement" })
export class Advertisement extends AbstractEntity {
  @Column({ name: "title", type: "varchar", nullable: true, default: null })
  title: string;

  @Column({ name: "content", type: "varchar", nullable: true, default: null })
  content: string;

  @Column({
    name: "advertisment_url",
    type: "varchar",
    nullable: true,
    default: null,
  })
  advertismentUrl: string;

  @Column({ name: "image_url", type: "varchar", nullable: true, default: null })
  imageUrl: string;

  //   Thể loại: Sản phẩm / khuyến mãi / …
  @Column({ name: "type", type: "varchar", nullable: true, default: null })
  type: string;

  @Column({
    name: "advertising_display_type",
    type: "varchar",
    nullable: true,
    default: null,
  })
  advertisingDisplayType: string;

  @Column({
    name: "advertisement_position",
    type: "varchar",
    nullable: true,
    default: null,
  })
  advertisementPosition: string;

  @Column({
    name: "status",
    type: "varchar",
    nullable: true,
    default: null,
  })
  status: string;

  @Column({ name: "access_number", default: 0, type: "integer" })
  accessNumber: number;

  @Column({ name: "start_at", type: "timestamp" })
  startAt: Date;

  @Column({ name: "end_at", type: "timestamp" })
  endAt: Date;
}
