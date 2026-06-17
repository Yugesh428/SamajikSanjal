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

@Table({ tableName: "shares", timestamps: true })
export class Share extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // ✅ who shared
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  // ✅ which post is shared
  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  declare postId: string;

  // ✅ optional caption (like FB "added text")
  @Column(DataType.TEXT)
  declare caption: string;

  // ✅ relations
  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Post)
  declare post: Post;
}


export default Share;   