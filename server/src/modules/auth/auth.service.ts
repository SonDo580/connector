import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../domains/user/schemas/user.schema';
import { RegisterDTO } from './requests/register.request';
import { ErrorCode } from 'src/common/constants/error-code';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async register({ email }: RegisterDTO) {
    let user: UserDocument;

    // Find existed user
    user = await this.UserModel.findOne({ email }).select('email verified');

    // Check if user is already verified
    if (user?.verified) {
      throw new ConflictException(ErrorCode.USER_EXISTED);
    }

    // Create new user if not existed
    if (!user) {
      user = new this.UserModel({ email });
      await user.save();
    }

    // Send verification email
    await this.mailService.sendCompleteRegisterEmail(email);

    return { id: user._id };
  }
}
