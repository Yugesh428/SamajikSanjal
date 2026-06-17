import { Response } from "express";
import { Post } from "../../models/postModel/postModel";
import { Media } from "../../models/mediaModel/mediaModel";
import { IExtendedRequest } from "../../middleware/type";
import { Like } from "../../models/likeModel/likeModel";
import { Comment } from "../../models/commentModel/commentModel";
import { Share } from "../../models/shareModel/shareModel";
``;

export const createPost = async (req: IExtendedRequest, res: Response) => {
  try {
    const { caption } = req.body;
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const post = await Post.create({
      userId,
      caption,
    });

    const files = (req.files as Express.Multer.File[]) || [];

    if (files.length > 0) {
      const mediaData = files.map((file) => ({
        postId: post.id,
        url: `/uploads/${file.filename}`,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      }));

      await Media.bulkCreate(mediaData);
    }

    const fullPost = await Post.findByPk(post.id, {
      include: ["media"],
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: fullPost,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error creating post",
    });
  }
};

export const getAllPosts = async (req: IExtendedRequest, res: Response) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          association: "user",
          attributes: ["id", "name", "username", "avatar"],
        },
        {
          association: "media",
          attributes: ["id", "url", "type"],
        },
        {
          association: "likes",
          attributes: ["id"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
        {
          association: "comments",
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
        {
          association: "shares",
          attributes: ["id", "createdAt"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
};
``;

export const getPostById = async (req: IExtendedRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const post = await Post.findByPk(id, {
      include: [
        {
          association: "user",
          attributes: ["id", "name", "username", "avatar"],
        },
        {
          association: "media",
          attributes: ["id", "url", "type"],
        },
        {
          association: "likes",
          attributes: ["id"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
        {
          association: "comments",
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
        {
          association: "shares",
          attributes: ["id", "createdAt"],
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching post",
    });
  }
};

export const updatePost = async (req: IExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const post = await Post.findByPk(id as string);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ ownership check
    if (post.userId !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ update post
    await post.update({ caption });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post, // ✅ consistent response
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating post",
    });
  }
};
export const deletePost = async (req: IExtendedRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?.id as string;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Media.destroy({ where: { postId: id } });
    await Like.destroy({ where: { postId: id } });
    await Comment.destroy({ where: { postId: id } });
    await Share.destroy({ where: { postId: id } });

    await post.destroy();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting post",
    });
  }
};
