import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { messages } from "App/Utils/messages";

export default class DashboardController {
  public async index({ response }: HttpContextContract) {
    try {
      return response.status(200).json({
        success: true,
        message: messages.success.dashboardListed,
      });
    } catch (error) {
      console.error(error);

      return response.status(401).json({
        success: false,
        message: messages.error.dashboardListFailed,
      });
    }
  }
}
