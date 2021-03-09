import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("d01_vaccines_uq", ["uid"], { unique: true })
@Entity("d01_vaccines", { schema: "covid_immunization_1" })
export class D01Vaccines {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "uid", unique: true, length: 50 })
  uid: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("smallint", { name: "duedate", unsigned: true })
  duedate: number;

  @Column("smallint", { name: "defaulterdate", unsigned: true })
  defaulterdate: number;

  @Column("smallint", { name: "zerodose", unsigned: true })
  zerodose: number;

  @Column("varchar", { name: "persian_name", length: 100 })
  persianName: string;

  @Column("int", { name: "dependent_on", nullable: true })
  dependentOn: number | null;
  
  @Column("smallint", { name: "dependent_duedate", nullable: true })
  dependentDuedate: number | null;

  @Column("varchar", { name: "group", length: 15 })
  group: string;

  @Column("int", { name: "country_id" })
  countryId: number;
}
