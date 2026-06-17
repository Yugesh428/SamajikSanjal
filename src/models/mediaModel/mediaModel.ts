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
import { Post } from "../postModel/postModel";

@Table({ tableName: "media", timestamps: true })
export class Media extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  // ✅ Which post this media belongs to
  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  declare postId: string;

  // ✅ File URL (image/video path)
  @Column(DataType.STRING)
  declare url: string;

  // ✅ Type of media
  @Column({
    type: DataType.ENUM("image", "video"),
    allowNull: false,
  })
  declare type: "image" | "video";

  // ✅ Relation
  @BelongsTo(() => Post)
  declare post: Post;
}
``;
