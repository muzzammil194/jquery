import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Co01Vaccination } from "./Co01Vaccination";

@Index("uid_UNIQUE", ["uid"], { unique: true })
@Index("f02_family_id", ["familyId"], {})
@Index("f02_added_by", ["addedBy"], {})
@Index("f02_nic_number", ["nicNumber"], {})
@Index("f02_phone_number", ["phoneNumber"], {})
@Index("f02_qrcode", ["qrCode"], {})
@Index("f02_dob", ["dob"], {})
@Index("f02_members_gender", ["gender"], {})
@Entity("f02_members", { schema: "covid_immunization_1" })
export class F02Members {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "uid", unique: true, length: 128 })
  uid: string;

  @Column("varchar", { name: "manual_id", length: 50 })
  manualId: string;

  @Column("varchar", { name: "family_id", length: 128 })
  familyId: string;

  @Column("varchar", { name: "qr_code", nullable: true, length: 256 })
  qrCode: string | null;

  @Column("text", { name: "bio_code", nullable: true })
  bioCode: string | null;

  @Column("varchar", { name: "full_name", length: 100 })
  fullName: string;

  @Column("varchar", { name: "nic_number", length: 50 })
  nicNumber: string;

  @Column("varchar", { name: "phone_number", length: 50 })
  phoneNumber: string;

  @Column("tinyint", { name: "invalid_number", nullable: true })
  invalidNumber: number | null;

  @Column("tinyint", { name: "valid_number", nullable: true })
  validNumber: number | null;

  @Column("longtext", { name: "data" })
  data: string;

  @Column("tinyint", { name: "gender", width: 1 })
  gender: boolean;

  @Column("date", { name: "dob" })
  dob: string;

  @Column("int", { name: "added_by", unsigned: true })
  addedBy: number;

  @Column("bigint", { name: "added_on", unsigned: true })
  addedOn: string;

  @Column("timestamp", {
    name: "added_in_db",
    default: () => "CURRENT_TIMESTAMP",
  })
  addedInDb: Date;

  @Column("tinyint", { name: "approved", width: 1, default: () => "'0'" })
  approved: boolean;

  @Column("int", { name: "approved_by", nullable: true, unsigned: true })
  approvedBy: number | null;

  @Column("timestamp", { name: "approved_on", nullable: true })
  approvedOn: Date | null;

}
