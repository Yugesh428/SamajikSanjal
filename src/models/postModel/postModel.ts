import {
  Table,
  Model,
  PrimaryKey,
  Default,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import User from "../User";

// ✅ Import related models
import { Media } from "../mediaModel/mediaModel";
import { Like } from "../likeModel/likeModel";
import { Comment } from "../commentModel/commentModel";
import { Share } from "../shareModel/shareModel";

@Table({ tableName: "posts", timestamps: true })
export class Post extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // ✅ Post owner
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare likeCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare commentCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare shareCount: number;

  @Column(DataType.TEXT)
  declare caption: string;

  // ✅ ───────────── RELATIONS ─────────────

  // ✅ Post belongs to user
  @BelongsTo(() => User)
  declare user: User;

  // ✅ Post → Media (images/videos)
  @HasMany(() => Media)
  declare media: Media[];

  // ✅ Post → Likes
  @HasMany(() => Like)
  declare likes: Like[];

  // ✅ Post → Comments
  @HasMany(() => Comment)
  declare comments: Comment[];

  // ✅ Post → Shares
  @HasMany(() => Share)
  declare shares: Share[];
}
