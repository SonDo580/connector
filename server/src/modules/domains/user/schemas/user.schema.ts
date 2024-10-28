import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthType, Gender, MODEL_NAME, Role } from 'src/common/constants';
import { USER_INFO_CONSTRAINT } from 'src/common/constants/constraints';
import {
  FamilyRelationship,
  RelationshipStatus,
} from 'src/common/constants/relationships';
import { ObjectId } from 'src/common/types';

export type UserDocument = HydratedDocument<User>;

type Friend = {
  user: User;
  since: Date;
};

type FamilyMember = {
  user: User;
  relationship: FamilyRelationship;
};

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ default: false })
  verified: boolean;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ enum: AuthType, default: AuthType.EMAIL })
  authType: AuthType;

  // Identity information
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, sparse: true })
  username?: string;

  @Prop()
  password?: string;

  // Basic information
  @Prop({ maxlength: USER_INFO_CONSTRAINT.NAME_MAX_LENGTH })
  firstName?: string;

  @Prop({ maxlength: USER_INFO_CONSTRAINT.NAME_MAX_LENGTH })
  lastName?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ enum: Gender })
  gender?: Gender;

  // Photos
  @Prop()
  profilePicture?: string;

  @Prop()
  coverPhoto?: string;

  // Relationships
  @Prop([{ type: ObjectId, ref: MODEL_NAME.USER }])
  followers: User[];

  @Prop([{ type: ObjectId, ref: MODEL_NAME.USER }])
  following: User[];

  @Prop([
    {
      user: { type: ObjectId, ref: MODEL_NAME.USER },
      since: { type: Date, default: new Date() },
    },
  ])
  friends: Friend[];

  @Prop([{ type: ObjectId, ref: MODEL_NAME.USER }])
  friendRequestsIn: User[];

  @Prop([{ type: ObjectId, ref: MODEL_NAME.USER }])
  friendRequestsOut: User[];

  @Prop([
    {
      user: { type: ObjectId, ref: MODEL_NAME.USER },
      relationship: { enum: Object.values(FamilyRelationship) },
    },
  ])
  familyMembers: FamilyMember[];

  // Additional details
  @Prop({ maxlength: USER_INFO_CONSTRAINT.BIO_MAX_LENGTH })
  bio?: string;

  @Prop({ enum: RelationshipStatus })
  relationshipStatus?: RelationshipStatus;

  // phoneNumber
  // otherNames
  // currentCity
  // hometown
  // workplaces
  // highSchools
  // colleges
  // websites
  // languages
  // favoriteQuotes
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function () {
  if (this.firstName || this.lastName) {
    return `${this.firstName} ${this.lastName}`.trim();
  }
  return 'Anonymous User';
});
