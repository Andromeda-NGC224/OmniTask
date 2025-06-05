export enum RegisterFields {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  NAME = 'name',
  SURNAME = 'surname',
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
  RegisterFields.AVATAR,
];
