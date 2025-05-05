import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

  @ManyToOne(() => User,(user)=>user.userId)
  sender: User;

  @ManyToOne(() => User,(user)=>user.userId)
  receiver: User;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

   @Column({type:'text',nullable:true})
    message: string;
}
