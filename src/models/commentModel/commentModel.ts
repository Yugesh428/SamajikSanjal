import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "../User";
import { Post } from "../postModel/postModel";

@Table({ tableName: "comments", timestamps: true })
export class Comment extends Model {
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

  // ✅ Self reference (for replies)
  @ForeignKey(() => Comment)
  @Column(DataType.UUID)
  declare parentId: string | null;

  @Column(DataType.TEXT)
  declare content: string;

  // ✅ Relations
  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Post)
  declare post: Post;

  // ✅ Parent comment (reply to)
  @BelongsTo(() => Comment, "parentId")
  declare parent: Comment;

  // ✅ Replies (children)
  @HasMany(() => Comment, "parentId")
  declare replies: Comment[];
}
