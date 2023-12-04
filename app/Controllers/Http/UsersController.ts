import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { messages } from "App/Utils/messages";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const user = await User.all();

      return response.status(200).json({
        success: true,
        message: messages.success.userListed,
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: messages.error.userListFailed,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.only(["name", "email", "password"]);

      const user = await User.create(body);

      return response.status(200).json({
        success: true,
        messages: messages.success.userCreated,
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: messages.error.postCreationFailed,
      });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("id");

      const user = await User.findOrFail(userId);

      return response.status(200).json({
        success: true,
        message: messages.success.userRetrieved,
        data: user,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: messages.error.userRetrieveFailed,
      });
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("id");
      const body = await request.only(["name", "email", "password"]);

      const user = await User.findOrFail(userId);

      const userUpdate = await user.merge(body).save();

      return response.status(200).json({
        success: true,
        message: messages.success.userUpdated,
        data: userUpdate,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: messages.error.userUpdateFailed,
      });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("id");

      const user = await User.findOrFail(userId);
      await user.delete();
      return response.status(200).json({
        success: true,
        message: messages.success.userDeleted,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: messages.error.userDeleteFailed,
      });
    }
  }
}
