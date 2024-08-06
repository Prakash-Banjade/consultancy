import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CookieOptions, Request, Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/setPublicRoute.decorator';
import { TransactionInterceptor } from 'src/core/interceptors/transaction.interceptor';
import { FormDataRequest } from 'nestjs-form-data';
import { PasswordChangeRequestDto } from './dto/password-change-req.dto';
import { Throttle } from '@nestjs/throttler';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Action, AuthUser } from 'src/core/types/global.types';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { VerifyResetTokenDto } from './dto/verify-reset-token.dto';
import { ChekcAbilities } from 'src/core/decorators/abilities.decorator';
require('dotenv').config();

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    refresshCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
    }

    private readonly ACCESS_TOKEN_KEY = 'access_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiConsumes('multipart/form-data')
    @FormDataRequest()
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const { access_token, new_refresh_token } = await this.authService.signIn(signInDto, req, res, this.refresshCookieOptions);

        res.cookie(this.REFRESH_TOKEN_KEY, new_refresh_token, this.refresshCookieOptions);

        return { access_token, refreshToken: new_refresh_token };
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(TransactionInterceptor)
    @UseGuards(RefreshTokenGuard)
    @FormDataRequest()
    async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refresh_token = req.cookies?.refresh_token;
        if (!refresh_token) throw new UnauthorizedException();

        res.clearCookie(this.REFRESH_TOKEN_KEY, this.refresshCookieOptions); // CLEAR COOKIE, BCZ A NEW ONE IS TO BE GENERATED

        const { new_access_token, new_refresh_token } = await this.authService.refresh(refresh_token);

        res.cookie(this.REFRESH_TOKEN_KEY, new_refresh_token, this.refresshCookieOptions);

        return { access_token: new_access_token, refresh_token: new_refresh_token };
    }

    @Post('register')
    @UseInterceptors(TransactionInterceptor)
    @ChekcAbilities({ subject: 'all', action: Action.CREATE })
    async register(@Body() registerDto: RegisterDto, @CurrentUser() currentUser: AuthUser) {
        return await this.authService.register(registerDto, currentUser);
    }

    @Public()
    @Post('verifyEmail')
    @ApiConsumes('multipart/form-data')
    @FormDataRequest()
    @UseInterceptors(TransactionInterceptor)
    async verifyEmail(@Body() emailVerificationDto: EmailVerificationDto) {
        return await this.authService.verifyEmail(emailVerificationDto);
    }

    @ApiBearerAuth()
    @Post('logout')
    @UseInterceptors(TransactionInterceptor)
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // on client also delete the access_token

        const refresh_token = req.cookies?.refresh_token;
        if (!refresh_token) return res.sendStatus(204)

        await this.authService.logout(refresh_token);

        res.clearCookie(this.REFRESH_TOKEN_KEY, this.refresshCookieOptions);
        return;
    }

    @ApiBearerAuth()
    @Post('changePassword')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransactionInterceptor)
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() currentUser: AuthUser) {
        return await this.authService.changePassword(changePasswordDto, currentUser);
    }

    @Public()
    @Post('forgetPassword')
    @HttpCode(HttpStatus.OK)
    // @Throttle({ default: { limit: 1, ttl: 5000 } }) // override the default rate limit for password reset
    forgetPassword(@Body() { email }: PasswordChangeRequestDto) {
        return this.authService.forgetPassword(email)
    }

    @Public()
    @Post('verifyResetToken')
    @HttpCode(HttpStatus.OK)
    // @Throttle({ default: { limit: 1, ttl: 5000 } }) // override the default rate limit for password reset
    verifyResetToken(@Body() { token }: VerifyResetTokenDto) {
        return this.authService.verifyResetToken(token)
    }

    @Public()
    @Post('resetPassword')
    @HttpCode(HttpStatus.OK)
    // @Throttle({ default: { limit: 1, ttl: 5000 } }) // override the default rate limit for password reset
    resetPassword(@Body() { password, token }: ResetPasswordDto) {
        return this.authService.resetPassword(password, token);
    }
}
