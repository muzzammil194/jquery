import { Column, Entity, Index } from "typeorm";

@Index("idx_vaccinated_on", ["vaccinatedOn"], {})
@Index("idx_added_by", ["addedBy"], {})
@Entity("co01_vaccination", { schema: "covid_immunization_1" })
export class Co01Vaccination {
  @Column("varchar", { primary: true, name: "member_id", length: 128 })
  memberId: string;

  @Column("varchar", { primary: true, name: "vaccine_id", length: 128 })
  vaccineId: string;

  @Column("varchar", { name: "record_data", length: 100 })
  recordData: string;

  @Column("varchar", { name: "type", length: 10 })
  type: string;

  @Column("date", { name: "due_date", nullable: true })
  dueDate: string | null;

  @Column("date", { name: "vaccinated_on", nullable: true })
  vaccinatedOn: string | null;

  @Column("text", { name: "image_location", nullable: true })
  imageLocation: string | null;

  @Column("longtext", { name: "metadata" })
  metadata: string;

  @Column("int", {
    name: "defaulter",
    nullable: true,
    comment:
      " (case when isnull((to_days(`vaccinated_on`) - to_days(`due_date`))) then 1 else 0 end)",
  })
  defaulter: number | null;

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
