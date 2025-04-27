import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InternalStatusType } from '../../internal-status-type-master/entities/internal-status-type-master.entity';


@Entity()
export class InternalStatus {
  @PrimaryGeneratedColumn()
  internalStatusId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => InternalStatusType, (internalStatusType) => internalStatusType.internalStatuses)
  @JoinColumn({ name: 'statusTypeId' })
  internalStatusType: InternalStatusType;
}
