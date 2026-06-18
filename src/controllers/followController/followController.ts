import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import { Follow } from "../../models/followModel/followModel";
import User from "../../models/User";

export const toggleFollow = async (req: IExtendedRequest, res: Response) => {
  try {
    const followerId = req.user?.id as string;
    const { id: followingId } = req.params;

    // ✅ Auth check
    if (!followerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    }

    // ✅ Cannot follow yourself
    if (followerId === followingId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
        data: null,
      });
    }

    // ✅ Check user exists
    const user = await User.findByPk(followingId as string);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // ✅ Check existing follow
    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });

    // ✅ UNFOLLOW
    if (existingFollow) {
      await existingFollow.destroy();

      return res.status(200).json({
        success: true,
        message: "Unfollowed successfully",
        data: {
          following: false,
        },
      });
    }

    // ✅ FOLLOW
    await Follow.create({ followerId, followingId });

    return res.status(201).json({
      success: true,
      message: "Followed successfully",
      data: {
        following: true,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error toggling follow",
      data: null,
    });
  }
};

export const getFollowers = async (req: IExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const followers = await Follow.findAll({
      where: { followingId: id },
      include: [
        {
          association: "follower",
          attributes: ["id", "name", "username", "avatar"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: followers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching followers",
      data: null,
    });
  }
};

export const getFollowing = async (req: IExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const following = await Follow.findAll({
      where: { followerId: id },
      include: [
        {
          association: "following",
          attributes: ["id", "name", "username", "avatar"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: following,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching following",
      data: null,
    });
  }
};
