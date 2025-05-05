import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserConnection } from "../../user-connections/entities/user-connection.entity";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  name: string;


  @Column({type:'varchar',length:50,nullable:true})
  status: string;

  @Column({type:'varchar',length:100,nullable:true})
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


@OneToMany(() => UserConnection, (userConnection) => userConnection.connectedUser)
connections: UserConnection[];

}
