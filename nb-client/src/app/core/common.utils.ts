import * as moment from 'moment';

export function formatPostDate(val: number): string {
  let posted = "Posted ";
  if(moment(val) > moment()) posted = "Will have been posted "
  if(moment().valueOf() == val) return posted + 'today';
  return posted + moment(val).fromNow();
}

export function generateRandomPlaceholderImage(): string {
  return `/assets/plc${ Math.ceil(Math.random() * 10)}.png`;
}

export function userLoggedIn(user: any): boolean {
  return !!(user && user.token);
}

export function userHasRole(user: any, role: string): boolean {
  return !!(user && Array.isArray(user.roles) && user.roles.find(r => r == role));
}
