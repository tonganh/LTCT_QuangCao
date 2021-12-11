import { Entity, Column } from "typeorm";
import { AbstractEntity } from "../../common/entity/abstract.entity";
@Entity({ name: "custormers" })
export class Custormers extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "receive_email" })
  receiveEmail: boolean;
}
