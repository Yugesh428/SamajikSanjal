import { IExtendedRequest } from "src/middleware/type";
import { Response } from "express";

import { Like } from "../../models/likeModel/likeModel";
import { Post } from "../../models/postModel/postModel";

export const toggleLike = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const { id: postId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
        error: "User_Not_Authenticated",
        data: null,
      });
    }

    const post = await Post.findByPk(postId as string);
    if (!post) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Post not found",
        error: "POST_NOT_FOUND",
        data: null,
      });
    }

    const existingLike = await Like.findOne({
      where: { userId, postId },
    });

    // ✅ UNLIKE
    if (existingLike) {
      await existingLike.destroy();
      await post.decrement("likeCount");

      return res.status(200).json({
        success: true,
        message: "Post unliked",
        data: { liked: false },
      });
    }

    await Like.create({ userId, postId });
    await post.increment("likeCount");

    return res.status(201).json({
      success: true,
      message: "Post liked",
      data: { liked: true },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      sucess: false,
      message: "Error Togllinh like",
    });
  }
};
