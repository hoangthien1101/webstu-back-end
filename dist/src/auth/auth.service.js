"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    cloudinaryService;
    mailService;
    constructor(prisma, jwtService, cloudinaryService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.cloudinaryService = cloudinaryService;
        this.mailService = mailService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: dto.email }, { employeeCode: dto.employeeCode }],
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email hoặc Mã nhân viên đã tồn tại');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const usersCount = await this.prisma.user.count();
        const role = usersCount === 0 ? client_1.Role.ADMIN : client_1.Role.USER;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);
        const user = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                password: hashedPassword,
                employeeCode: dto.employeeCode,
                avatarUrl: dto.avatar || null,
                role: role,
                isActive: false,
                verificationToken: otp,
                tokenExpiresAt: tokenExpires,
            },
        });
        await this.mailService.sendVerificationEmail(user.email, otp);
        const { password, ...result } = user;
        return result;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Email hoặc Mật khẩu không chính xác');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email hoặc Mật khẩu không chính xác');
        }
        if (!user.isActive) {
            if (!user.verificationToken) {
                throw new common_1.ForbiddenException('Tài khoản của bạn đã bị khóa hoặc vô hiệu hóa. Vui lòng liên hệ Admin.');
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { verificationToken: otp, tokenExpiresAt: tokenExpires },
            });
            await this.mailService.sendVerificationEmail(user.email, otp);
            throw new common_1.ForbiddenException({
                statusCode: 403,
                requiresActivation: true,
                email: user.email,
                message: 'Tài khoản của bạn chưa được kích hoạt. Mã OTP xác thực đã được gửi về Email.',
            });
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                employeeCode: user.employeeCode,
                avatarUrl: user.avatarUrl,
            },
        };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('Người dùng không tồn tại');
        }
        const { password, ...result } = user;
        return result;
    }
    async updateProfile(userId, dto) {
        const existing = await this.prisma.user.findFirst({
            where: { employeeCode: dto.employeeCode, NOT: { id: userId } },
        });
        if (existing) {
            throw new common_1.BadRequestException('Mã nhân viên này đã thuộc về người dùng khác');
        }
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { fullName: dto.fullName, employeeCode: dto.employeeCode },
        });
        const { password, ...result } = updated;
        return result;
    }
    async uploadAvatar(userId, file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn ảnh đại diện để tải lên');
        }
        const uploadResult = await this.cloudinaryService.uploadFile(file);
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { avatarUrl: uploadResult.secure_url },
        });
        return { avatarUrl: updated.avatarUrl };
    }
    async verify(email, otp) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Người dùng không tồn tại');
        }
        if (user.verificationToken !== otp) {
            throw new common_1.BadRequestException('Mã OTP không hợp lệ');
        }
        if (user.tokenExpiresAt && user.tokenExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Mã OTP đã hết hạn');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { isActive: true, verificationToken: null, tokenExpiresAt: null },
        });
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const { password, ...result } = user;
        return { accessToken, user: result };
    }
    async resendOtp(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Người dùng không tồn tại');
        }
        if (user.isActive) {
            throw new common_1.BadRequestException('Tài khoản đã kích hoạt, không cần gửi OTP');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken: otp, tokenExpiresAt: tokenExpires },
        });
        await this.mailService.sendVerificationEmail(user.email, otp);
        return { message: 'OTP đã được gửi lại' };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !user.isActive) {
            throw new common_1.BadRequestException('Email không tồn tại hoặc chưa kích hoạt');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpires = new Date(Date.now() + 15 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken: otp, tokenExpiresAt: tokenExpires },
        });
        await this.mailService.sendForgotPasswordEmail(user.email, otp);
        return { message: 'Đã gửi mã OTP đặt lại mật khẩu về email của bạn.' };
    }
    async resetPassword(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw new common_1.BadRequestException('Người dùng không tồn tại');
        }
        if (user.verificationToken !== dto.otp) {
            throw new common_1.BadRequestException('Mã OTP không hợp lệ');
        }
        if (user.tokenExpiresAt && user.tokenExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Mã OTP đã hết hạn');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                verificationToken: null,
                tokenExpiresAt: null,
            },
        });
        const payload = { sub: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
        const accessToken = this.jwtService.sign(payload);
        return {
            message: 'Đặt lại mật khẩu thành công!',
            accessToken,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                fullName: updatedUser.fullName,
                role: updatedUser.role,
                employeeCode: updatedUser.employeeCode,
                avatarUrl: updatedUser.avatarUrl,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        cloudinary_service_1.CloudinaryService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map