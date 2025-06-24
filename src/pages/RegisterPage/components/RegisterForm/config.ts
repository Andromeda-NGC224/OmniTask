export enum RegisterFields {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  NAME = 'name',
  SURNAME = 'surname',
  BIRTHDAY = 'birthday',
  AVATAR = 'avatar',
}

export const step1Fields = [
  RegisterFields.EMAIL,
  RegisterFields.PASSWORD,
  RegisterFields.CONFIRM_PASSWORD,
];

export const step2Fields = [
  RegisterFields.NAME,
  RegisterFields.SURNAME,
  RegisterFields.BIRTHDAY,
  RegisterFields.AVATAR,
];
