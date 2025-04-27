import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { InternalStatus } from '../../internal-status-master/entities/internal-status-master.entity';
import { User } from '../../user/entities/user.entity';


@Entity()
export class ConnectionRequest {
  @PrimaryGeneratedColumn()
  requestId: number;

  @ManyToOne(() => User,(user)=>user.userId)
  sender: User;

  @ManyToOne(() => User,(user)=>user.userId)
  receiver: User;


  @ManyToOne(() => InternalStatus,(internalStatus)=>internalStatus.internalStatusId)
  @JoinColumn({ name: 'requestStatusId' }) 
  requestStatus: InternalStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
