"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = MailService_1 = class MailService {
    mailerService;
    logger = new common_1.Logger(MailService_1.name);
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendVerificationEmail(to, otp) {
        const subject = 'Mã xác thực tài khoản LHUMedia';
        const html = `
      <div style="font-family:Arial,sans-serif; background:#f9f9f9; padding:20px; border-radius:8px; max-width:600px; margin:auto;">
        <h2 style="color:#222;">Xác thực tài khoản LHUMedia</h2>
        <p>Chào bạn,</p>
        <p>Mã OTP xác thực tài khoản của bạn là: <b style="color:#d9534f; font-size:1.2em;">${otp}</b>. Mã này có hiệu lực trong <b>15 phút</b>.</p>
        <p style="font-size:0.9em; color:#555;">Nếu bạn không yêu cầu đăng ký, vui lòng bỏ qua email này.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>
        <p style="font-size:0.8em; color:#999;">LHUMedia – Hệ thống quản lý studio</p>
      </div>`;
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html,
            });
            this.logger.log(`Verification email sent to ${to}`);
        }
        catch (error) {
            this.logger.error('Failed to send verification email', error);
            throw error;
        }
    }
    async sendForgotPasswordEmail(to, otp) {
        const subject = 'Đặt lại mật khẩu LHUMedia';
        const html = `
      <div style="font-family:Arial,sans-serif; background:#f9f9f9; padding:20px; border-radius:8px; max-width:600px; margin:auto;">
        <h2 style="color:#222;">Yêu cầu đặt lại mật khẩu LHUMedia</h2>
        <p>Chào bạn,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản LHUMedia của mình.</p>
        <p>Mã OTP xác thực đặt lại mật khẩu của bạn là: <b style="color:#2b6cb0; font-size:1.2em;">${otp}</b>. Mã này có hiệu lực trong <b>15 phút</b>.</p>
        <p style="font-size:0.9em; color:#555;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này để bảo mật tài khoản.</p>
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;"/>
        <p style="font-size:0.8em; color:#999;">LHUMedia – Hệ thống quản lý studio</p>
      </div>`;
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html,
            });
            this.logger.log(`Forgot password email sent to ${to}`);
        }
        catch (error) {
            this.logger.error('Failed to send forgot password email', error);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map