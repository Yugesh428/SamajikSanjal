import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// ✅ Import related models
import {Post} from "./postModel/postModel";
import {Like} from "./likeModel/likeModel";
import {Comment} from "./commentModel/commentModel";
import Follow from "./followModel/followModel";
import { Share } from "./shareModel/shareModel";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @Unique
  @AllowNull(true)
  @Column(DataType.STRING)
  declare username: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare password: string | null;

  @Default(UserRole.USER)
  @Column(DataType.ENUM(...Object.values(UserRole)))
  declare role: UserRole;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isVerified: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare isBanned: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare avatar: string | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare bio: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare googleId: string | null;

  // ✅ ───────────── RELATIONS ─────────────

  // ✅ User → Posts
  @HasMany(() => Post)
  declare posts: Post[];

  // ✅ User → Likes
  @HasMany(() => Like)
  declare likes: Like[];

  // ✅ User → Comments
  @HasMany(() => Comment)
  declare comments: Comment[];

  // ✅ User → Shares
  @HasMany(() => Share)
  declare shares: Share[];

  // ✅ Following (user follows others)
  @HasMany(() => Follow, "followerId")
  declare following: Follow[];

  // ✅ Followers (others follow user)
  @HasMany(() => Follow, "followingId")
  declare followers: Follow[];

  // ✅ ───────────── HOOKS ─────────────

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.changed("password") && instance.password) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  async comparePassword(plain: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(plain, this.password);
  }
}

export default User;
