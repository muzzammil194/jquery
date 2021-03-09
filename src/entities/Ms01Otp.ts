import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id_UNIQUE", ["id"], { unique: true })
@Entity("ms01_otp", { schema: "covid_immunization_gen" })
export class Ms01Otp {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "generate_time" })
  generateTime: Date;

  @Column("datetime", { name: "consume_time", nullable: true })
  consumeTime: Date | null;

  @Column("varchar", { name: "consume_request", nullable: true, length: 128 })
  consumeRequest: string | null;

  @Column("tinyint", { name: "transaction_id", nullable: true })
  transactionId: number | null;

  @Column("datetime", { name: "expire_time" })
  expireTime: Date;

  @Column("int", { name: "no_of_tries", default: () => "'5'" })
  noOfTries: number;

  @Column("varchar", { name: "memeber_id", length: 128 })
  memeberId: string;
}
