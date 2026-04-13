export const ADMIN_EMAILS = ['galaxiegameri@gmail.com', 'admin@bergsites.com'];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}
