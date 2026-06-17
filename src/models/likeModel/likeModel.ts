import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "../User";
import { Post } from "../postModel/postModel";

@Table({ tableName: "likes", timestamps: true })
export class Like extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  declare postId: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Post)
  declare post: Post;
}
``;
