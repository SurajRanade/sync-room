import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class UserConnection {
  @PrimaryGeneratedColumn()
  connectionId: number;

  @ManyToOne(() => User,(user)=>user.userId)
   @JoinColumn({ name: 'userId' }) 
  user: User;

  @ManyToOne(() => User,(user)=>user.connections)
  @JoinColumn({ name: 'connectedUserId' }) 
  connectedUser: User;

  @CreateDateColumn()
  createdAt: Date;
}
