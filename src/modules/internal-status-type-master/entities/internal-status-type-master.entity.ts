import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InternalStatus } from '../../internal-status-master/entities/internal-status-master.entity';

@Entity()
export class InternalStatusType {
  @PrimaryGeneratedColumn()
  internalStatusTypeId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => InternalStatus, (internalStatus) => internalStatus.internalStatusType)
  internalStatuses: InternalStatus[];
}
