import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    sendVerificationEmail(to: string, otp: string): Promise<void>;
    sendForgotPasswordEmail(to: string, otp: string): Promise<void>;
}
