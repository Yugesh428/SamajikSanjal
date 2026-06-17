import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "../User";

@Table({ tableName: "follows", timestamps: true })
export class Follow extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // ✅ User who follows
  @Unique("unique_follow")
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare followerId: string;

  // ✅ User being followed
  @Unique("unique_follow")
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare followingId: string;

  // ✅ Relations (important for include queries)
  @BelongsTo(() => User, "followerId")
  declare follower: User;

  @BelongsTo(() => User, "followingId")
  declare following: User;
}

export default Follow;