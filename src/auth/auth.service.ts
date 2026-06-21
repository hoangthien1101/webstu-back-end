import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { employeeCode: dto.employeeCode },
        ],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoặc Mã nhân viên đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Auto-promote the first user to ADMIN
    const usersCount = await this.prisma.user.count();
    const role: Role = usersCount === 0 ? Role.ADMIN : Role.USER;

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
        employeeCode: dto.employeeCode,
        avatarUrl: dto.avatar || null, // map old avatar field if passed
        role: role,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc Mật khẩu không chính xác');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc Mật khẩu không chính xác');
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

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, dto: { fullName: string; employeeCode: string }) {
    const existing = await this.prisma.user.findFirst({
      where: {
        employeeCode: dto.employeeCode,
        NOT: { id: userId },
      },
    });

    if (existing) {
      throw new BadRequestException('Mã nhân viên này đã thuộc về người dùng khác');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        employeeCode: dto.employeeCode,
      },
    });

    const { password, ...result } = updated;
    return result;
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn ảnh đại diện để tải lên');
    }

    const uploadResult = await this.cloudinaryService.uploadFile(file);
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: uploadResult.secure_url,
      },
    });

    return {
      avatarUrl: updated.avatarUrl,
    };
  }
}
