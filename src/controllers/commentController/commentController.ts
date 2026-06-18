import { Response } from "express";
import { Comment } from "../../models/commentModel/commentModel";
import { Post } from "../../models/postModel/postModel";
import { IExtendedRequest } from "../../middleware/type";

export const createComment = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { postId } = req.params;
    const { content, parentId } = req.body;

    // ✅ auth check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    // ✅ check post
    const post = await Post.findByPk(postId as string);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        data: null,
      });
    }

    // ✅ create comment
    const comment = await Comment.create({
      userId,
      postId,
      content,
      parentId: parentId || null, // ✅ for reply
    });

    // ✅ increment count
    await post.increment("commentCount");

    return res.status(201).json({
      success: true,
      message: "Comment added",
      data: comment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error creating comment",
      data: null,
    });
  }
};

export const getCommentsByPost = async (
  req: IExtendedRequest,
  res: Response,
) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId, parentId: null }, // ✅ only root comments
      include: [
        {
          association: "user",
          attributes: ["id", "name", "username", "avatar"],
        },
        {
          association: "replies",
          include: [
            {
              association: "user",
              attributes: ["id", "name", "username", "avatar"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching comments",
      data: null,
    });
  }
};

export const deleteComment = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { id } = req.params;

    const comment = await Comment.findByPk(id as string);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
        data: null,
      });
    }

    // ✅ only owner can delete
    if (comment.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    await comment.destroy();

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
      data: null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting comment",
      data: null,
    });
  }
};

export const updateComment = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { id } = req.params;
    const { content } = req.body;

    // ✅ auth check
    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        error: "USER_NOT_AUTHENTICATED",
        data: null,
      });
    }

    // ✅ find comment
    const comment = await Comment.findByPk(id as string);

    if (!comment) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Comment not found",
        error: "COMMENT_NOT_FOUND",
        data: null,
      });
    }

    // ✅ owner check
    if (comment.userId !== userId) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Unauthorized",
        error: "NOT_COMMENT_OWNER",
        data: null,
      });
    }

    // ✅ update
    await comment.update({ content });

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error updating comment",
      data: null,
    });
  }
};
``;
